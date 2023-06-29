import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import tippy from "tippy.js";
import SseMsg from "../../common/SseMsg";
import SseBottomBar from "../../common/SseBottomBar";
import SseClassChooser from "../../common/SseClassChooser";
import SseConfirmationDialog from "../../common/SseConfirmationDialog";
import SseSnackbar from "../../common/SsePopup";
import SseSetOfClasses from "../../common/SseSetOfClasses";
import SseTheme from "../../common/SseTheme";
import SseEditor3d from "./SseEditor3d";
import SseToolbar3d from "./widgets/SseToolbar3d";
import { message } from 'antd';
import { getClassesSets } from '../3d/metaData/classesSet';
import i18n from "../../lib/i18n/index";
import semantic from '../../../utils/semantic';
import factory from '../../../../public/global/request'
import { ConsoleNetwork } from 'mdi-material-ui';


export default class SseApp3d extends React.Component {

    constructor(props) {
        super();
        SseMsg.register(this);
        this.state = {
            taskConfirmation: true,
            classesSets: [],
            allTags: [],
            auditComment: [],
            mapImageVisiable: false,
            duration: 0,
            imageList: []
        };
        this.parameters = JSON.parse(window.sessionStorage.getItem("splitData"));
    }

    setupTooltips() {
        setTimeout(() => tippy('[title]', {
            theme: 'sse',
            arrow: true,
            delay: [800, 0]
        }), 2000);
    }

    componentDidUpdate() {
        this.setupTooltips();
    }

    ininTask() {
        let cacheTaskId = parseInt(localStorage.getItem("taskId"));
        let taskId = null;

        let labelPageInfoData = factory.queryCustomPage(false, {id: this.parameters.labelPageId})
        
        this.setState({
            classesSets: labelPageInfoData.data.labelSet[0].classesSets.map(cset => new SseSetOfClasses(cset)),
            allTags: labelPageInfoData.data.labelSet[1].allTags 
        })
        
        if ((this.parameters.taskConfirmation == true || cacheTaskId) && this.parameters.taskCategory === 'acceptance') {
            // from taskList
            taskId = cacheTaskId ? cacheTaskId : this.parameters.taskId;
            let acceptanceTaskInfo = factory.getAcOneTask(false, {id: taskId});
            
            if (acceptanceTaskInfo && acceptanceTaskInfo.data){
                this.initImageInfoState(acceptanceTaskInfo.data, "acceptance").then(() => {
                    this.setState({
                        classesReady: true
                    })
                });
            }
        }

        else if (this.parameters.taskCategory === 'acceptance') {
            let startAcTaskMission = factory.getAcTasks(false, {batchId: this.parameters.batchId});

            if (startAcTaskMission && startAcTaskMission.data){
                this.initImageInfoState(startAcTaskMission.data, "acceptance").then(() => {
                    this.setState({
                        classesReady: true
                    })
                });
            }
        }

        else if ((this.parameters.taskConfirmation == true || cacheTaskId) && this.parameters.taskCategory === 'audit') {
            // from taskList set taskId
            taskId = cacheTaskId ? cacheTaskId : this.parameters.taskId;

            let startOneTaskInfo = factory.getOneLaTask(false, this.urlType, {id: taskId, level: this.parameters.level });

            if (startOneTaskInfo && startOneTaskInfo.data){
                this.initImageInfoState(startOneTaskInfo.data).then(() => {
                    this.setState({
                        classesReady: true
                    });
                });
            };
        } 

        else if (this.parameters.taskCategory === 'audit') {
            let beginAuditInfo = factory.getAuTasks(false, this.urlType, {
                batchId: this.parameters.batchId,
                level: this.parameters.level,
            });

            if (beginAuditInfo && beginAuditInfo.data){
                this.initImageInfoState(beginAuditInfo.data).then(() => {
                    this.setState({
                        classesReady: true
                    });
                });
            };
        }

        else if (this.parameters.taskConfirmation == true || cacheTaskId) {
            taskId = cacheTaskId ? cacheTaskId : this.parameters.taskId;

            let onlyRead = String(this.parameters.onlyView) == "true" ? true : false;
            let startOneTaskInfo = factory.getOneAuTask(false, this.urlType, {
                id: taskId, 
                level: 0, 
                onlyRead: onlyRead
            });

            if (startOneTaskInfo && startOneTaskInfo.data){
                this.initImageInfoState(startOneTaskInfo.data).then(() => {
                    this.setState({
                        classesReady: true
                    });
                });
            };
        } 
 
        else {

            let startTaskInfo = factory.getLaTasks(false, this.urlType, {
                batchId: this.parameters.batchId
            });

            if (startTaskInfo && startTaskInfo.data){
                this.initImageInfoState(startTaskInfo.data).then(() => {
                    this.setState({
                        classesReady: true
                    })
                });
            }
        }

        this.setState({
            classesReady: true
        });
    }

    initImageInfoState(data, taskCategory){
        const newPrm = new Promise((res,rej)=>{
            if (localStorage.getItem("taskId") != data.id) {
                localStorage.setItem("taskId", data.id);
            }

            let duration = 0;
            let level = this.parameters.level;

            let imageList = (data.taskDetails || []).map((item, index) => {
                return item.filePath
            })

            if (this.parameters.taskCategory == 'label'){
                duration = data.duration;
            }else if (this.parameters.taskCategory == "audit"){
                let key = semantic.numberToEn(level) + "LevelAuditDuration"; 
                duration = data[key];
            }

            localStorage.setItem("duration", duration);

            this.setState({ 
                isAbnormalTask: data.abnormalTask,
                imageUrl: data.filePath + "?token=" + window.sessionStorage.token,
                fileName: data.fileName,
                taskId: data.id,
                batchId: taskCategory == "acceptance" ? data.acceptanceBatchId : 
                  this.urlType == "traid-and-bid-task" ? data.batchUnionId : data.batchId,
                cloudData: data.data && data.data[0],
                auditComment: data.auditComment,
                imageList: imageList
            });
    
            res();
        })

        return newPrm;
    }

    initClassesSets(labelPageDto) {
        let classesSets = [];

        if (this.parameters.templateId){
            classesSets =  getClassesSets().classesSets;

        } else {
            if (labelPageDto) {
                classesSets = labelPageDto.labelSet[0].classesSets;

            } else {
                if (!this.parameters.labelPageId){
                    classesSets =  [
                        {
                            "name": "Cityscapes",
                            "objects": [
                                {
                                    "label": i18n.gettext("VOID"),
                                    "color": "#CFCFCF",
                                    "classIndex": 0,
                                    "mute": false,
                                    "solo": false,
                                    "visible": true,
                                },
                            ]
                        }
                    ];
                    
                }else {
                    let labelPageInfoData = factory.queryCustomPage(false, {id: this.parameters.labelPageId});
                    classesSets = labelPageInfoData.data.labelSet[0].classesSets;
                };
            };
        };
        
        return classesSets;
    }

    initTags(labelPageDto) {
        let tags = [];

        if (this.parameters.templateId){
            tags = ["模板展示"];

        } else {
            if (labelPageDto) {
                tags = labelPageDto.labelSet[1].allTags;

            } else {
                if (!this.parameters.labelPageId){
                    tags = [];

                }else {
                    let labelPageInfo = factory.queryCustomPage(false, {id: this.parameters.labelPageId})

                    this.setState({
                        allTags: labelPageInfo.data.labelSet[1].allTags
                    });
                };
            };
        };
        
        return tags;
    }
    
    initTemplateTask() {
        let classesSets =  this.initClassesSets();
        let tags = this.initTags();

        this.setState({
            classesSets: classesSets.map(cset => new SseSetOfClasses(cset)),
            cloudData: [],
            fileName: "000019.pcd",
            allTags: tags,
            imageUrl: "https://www.shumidata.cn/static/000019.pcd",
            classesReady: true
        });
    }

    componentDidMount() {
        let urlType = "tagging-task";

        if (this.parameters.batchType == "试标批次" || this.parameters.batchType == "竞标批次") {
            urlType = "traid-and-bid-task";
        }

        this.urlType = urlType;

        this.parameters.templateId ? this.initTemplateTask() : this.ininTask();
        this.setupTooltips();
    }

    getNextOneTask = () => {
        const prom = new Promise((resolve, rej)=> {
            let onlyView = String(this.parameters.onlyView);

            let integrated = JSON.parse(sessionStorage.getItem("integrated"));
            let taskIds = JSON.parse(sessionStorage.getItem("splitData")).taskList;

            if (onlyView == "true"){
                let nextTaskOneInfo = factory.examineNextTask(false, this.urlType, {
                    taskId: this.state.taskId
                });

                resolve();
                if (nextTaskOneInfo && nextTaskOneInfo.data){
                    this.initImageInfoState(nextTaskOneInfo.data);
                }else if (nextTaskOneInfo.code == 1) {
                    message.error(nextTaskOneInfo.msg);
                };

            } else {
                if (this.parameters.taskCategory == 'audit'){

                    let parseData = {
                        level: this.parameters.level,
                        taskId: this.state.taskId,
                        abnormalTask: !!this.parameters.abnormalTask,
                        taskIds: taskIds,
                        integrated: integrated 
                    };
                    let auditNextOneInfo = factory.auNextTask(false, this.urlType, parseData);
                    resolve();

                    if (auditNextOneInfo && auditNextOneInfo.data){
                        this.initImageInfoState(auditNextOneInfo.data).then(() => {
                            this.setState({
                                classesReady: true
                            });
                        });
                    }else if (auditNextOneInfo.code == 1){
                        message.error(auditNextOneInfo.msg);
                    };

                }else if (this.parameters.taskCategory == 'label'){
                    let parseData = {
                        taskId: this.state.taskId,
                        abnormalTask: this.parameters.abnormalTask,
                        taskIds: taskIds,
                        integrated: integrated 
                    };

                    let nextLabelTaskInfo = factory.laNextTask(false, this.urlType, parseData);

                    resolve();
                    if (nextLabelTaskInfo && nextLabelTaskInfo.data){
                        this.initImageInfoState(nextLabelTaskInfo.data);
                    }else if (nextLabelTaskInfo.code == 1){
                        message.error(nextLabelTaskInfo.msg);
                    };

                }else if (this.parameters.taskCategory == 'acceptance'){
                    let aNextAcceptanceInfo = factory.acNextTask(false, {
                        taskId: this.state.taskId
                    });

                    resolve();
                    if (aNextAcceptanceInfo && aNextAcceptanceInfo.data){
                        this.initImageInfoState(aNextAcceptanceInfo.data, "acceptance").then(() => {
                            this.setState({
                                classesReady: true
                            });
                        });
                    }else if (aNextAcceptanceInfo.code == 1){
                        message.error(aNextAcceptanceInfo.msg);
                    };
                };
            };
        });

        return prom;
    }

    getLastOneTask = () => {
        const prom = new Promise((resolve, rej)=> {
            let onlyView = String(this.parameters.onlyView);

            if (onlyView == "true"){
                let preTaskOneInfo = factory.examinePretTask(false, this.urlType, {
                    taskId: this.state.taskId
                });

                resolve();
                if (preTaskOneInfo && preTaskOneInfo.data){
                    this.initImageInfoState(preTaskOneInfo.data);
                }else if (preTaskOneInfo.code == 1) {
                    message.error(preTaskOneInfo.msg);
                };
            }else {
                let integrated = JSON.parse(sessionStorage.getItem("integrated"));
                let taskIds = JSON.parse(sessionStorage.getItem("splitData")).taskList;
                
                let parseData = {
                    taskId: this.state.taskId,
                    abnormalTask: this.parameters.abnormalTask,
                    taskIds: taskIds,
                    integrated: integrated 
                };

                let lastLabelTaskInfo = factory.laPreTask(false, this.urlType, parseData);

                resolve();
                if (lastLabelTaskInfo && lastLabelTaskInfo.data){
                    this.initImageInfoState(lastLabelTaskInfo.data);
                }else if (lastLabelTaskInfo.code == 1) {
                    message.error(lastLabelTaskInfo.msg);
                };
            }
        });

        return prom;
    }

    doSkipItem = () => {
        const prom = new Promise((res, rej)=> {
            let level = this.parameters.level;

            if (this.parameters.taskCategory == 'label'){
                level = 0;
            }else if(this.parameters.taskCategory == 'acceptance'){
                level = 6;
            }

            let skipItemInfo = factory.skipTemporarily(false, {
                taskId: this.state.taskId, 
                level: level
            });

            message.success(i18n.gettext("Skip For Now Success"));
            this.getNextOneTask();

            res();
        });

        return prom;
    }

    updateNormalStatus = () => {
        this.setState({
            isAbnormalTask: !this.state.isAbnormalTask
        })
    }

    updateDuration = (duration) => {
        this.setState({
            duration: duration + 1
        })
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextState.imageUrl != this.state.imageUrl) {
        //     this.refreshComponent().then(res => {
        //         this.setState({
        //             classesReady: true
        //         })
        //     })
        // }
    }

    componentWillUnmount() {
        localStorage.setItem("taskId", null);
    }

    refreshEditor() {
        const newPrm = new Promise((res,rej)=>{
            this.setState({
                refresh: "d"
            });
            res();
        })

        return newPrm;
    }

    refreshComponent() {
        const newPrm = new Promise((res,rej)=>{
            this.setState({
                classesReady: false
            });
            res();
        })

        return newPrm;
    }

    toogleMapImage = () => {
        this.setState({
            mapImageVisiable: !this.state.mapImageVisiable
        })
    }

    forUpdateAuditComment = (auditComment) => {
        this.setState({
            auditComment: auditComment
        })
    }

    forCustomPage = (labelPageDto) => {
        const prom = new Promise((res, rej)=> {
            let customPageInfo = factory.customPage(false, labelPageDto);

            if (customPageInfo.code === 0) {
                message.success(i18n.gettext("Set Template Success"));

                res(customPageInfo);

                this.setState({
                    classesSets: this.initClassesSets(labelPageDto).map(cset => new SseSetOfClasses(cset)),
                    allTags: this.initTags(labelPageDto)
                })

                this.refreshComponent().then(res => {
                    this.setState({
                        classesReady: true
                    })
                })
            }else {
                res(customPageInfo);
            }
        })

        return prom;
    }

    render() {
        if (!this.state.classesReady || !this.state.imageUrl || this.state.classesSets.length == 0 || !this.parameters)
            return null;

        let auditorFilter = {
            taggerBy: this.parameters.taggerBy, 
            endTime: this.parameters.endTime, 
            startTime: this.parameters.startTime, 
            abnormalTask: this.parameters.abnormalTask,
        }

        let editorProps = {
            isAbnormalTask: this.state.isAbnormalTask,
            imageUrl: this.state.imageUrl,
            fileName: this.state.fileName,
            refresh: this.state.refresh,
            duration: this.state.duration,
            auditorFilter: auditorFilter,
            taskId: this.state.taskId,
            onlyView: String(this.parameters.onlyView),
            batchId: this.parameters.batchId,
            classesSets: this.state.classesSets,
            taskCategory: this.parameters.taskCategory,
            templateId: this.parameters.templateId,
            level: this.parameters.level,
            labelPageId: this.parameters.labelPageId,
            urlType: this.urlType,
            sample: this.state.sample || {},
            allTags: this.state.allTags || [],
            cloudData: this.state.cloudData,
            auditComment: this.state.auditComment,
            taskConfirmation: this.state.taskConfirmation,
            template: this.parameters.templateId ? true : false,
            doSkipItem: this.doSkipItem,
            updateNormalStatus: this.updateNormalStatus,
            getNextOneTask: this.getNextOneTask,
            getLastOneTask: this.getLastOneTask,
            customPage: this.forCustomPage,
            forUpdateAuditComment: this.forUpdateAuditComment,
            toogleMapImage: this.toogleMapImage,
            imageList: this.state.imageList,
            mapImageVisiable: this.state.mapImageVisiable
        }

        return (
            <div className="w100 h100">
                <MuiThemeProvider
                    theme={new SseTheme().theme}>
                    <div className="w100 h100 editor">
                        <div className="vflex w100 h100 box1">
                            <SseToolbar3d 
                                fileName={this.state.fileName} 
                                urlType={this.urlType}
                                onlyView={String(this.parameters.onlyView)}
                                isAbnormalTask={this.state.isAbnormalTask}
                                duration={this.state.duration}
                                taskCategory={this.parameters.taskCategory}
                                isTemplate={this.parameters.templateId ? true : false}/>
                            <div className="hflex grow box2 h0">
                                <SseClassChooser
                                    mode="3d"
                                    classesSets={this.state.classesSets}
                                />
                                <SseEditor3d {...editorProps}/>
                            </div>
                            <SseBottomBar allTags={this.state.allTags || []}/>
                        </div>
                        <SseSnackbar />
                        <SseConfirmationDialog
                            startMessage="reset-start"
                            endMessage="reset-end"
                            title="Segmentation Reset"
                            text="This will remove all existing polygons and tags, are you sure?">
                        </SseConfirmationDialog>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}