import React from 'react';
import { Drawer, Button, Divider, message, Form, Input, Icon, Select, Tag, Card } from 'antd';
import SseMsg from "../../../common/SseMsg";
import i18n from "../../../lib/i18n/index";
import Mousetrap from 'mousetrap';
import ClipboardJS from "clipboard";

import  "../styles/operationDrawer.scss";


class OperationDrawer extends React.Component {
    constructor(props) {
        super();
        SseMsg.register(this);
        this.state = {
            labelName: null,
            type: null,
            feature: null,
            auditComment: props.auditComment || [],
            featureLength: 0,
            skipSubmitting: false,
            passSubmitting: false,
            rejectSubmitting: false,
            passAllSubmitting: false,
            rejectAllSubmitting: false,
            usUalSubmitting: false,
            saveSubmitting: false,
            commitSubmitting: false,
            lastSubmitting: false,
            nextSubmitting: false
        }

        this.btnGroup = React.createRef();
    }

    handleChangeErrorType = (value) => {
        this.handleChange(value, "type");
    }

    handleChangeTag = (labelName, checked) => {
        let value = checked ? labelName : "";

        this.handleChange(value, "labelName");
        
        this.handleChange(null, "feature");
        this.handleChange(null, "type");

        this.props.form.setFieldsValue({labelName: value, feature: null, type: null});
    }

    handleChangeFeature(value) {
        this.handleChange(value, "feature");
        this.setState({
            featureLength: value.length
        })
    }

    handleChange = (value, type) => {
        let stateDic = {};
        stateDic[type] = value;
        this.setState(stateDic);
    };

    checkLabelName = (rule, value, callback) => {
        if(this.state.type != "missMark"){
            if (value && !this.props.hasSelectedLabel.find(socObj => socObj.label == value)){
                callback(i18n.gettext("Please input value filter labelName list"));
                return false;
            }
            callback();
        }else{
            callback();
            return true;
        }
    }

    deleteSetItem = (key, comment) => {
        let auditComment = this.props.auditComment;

        auditComment = (auditComment || []).filter((item) => {
            return item.id != comment.id
        })

        this.props.forUpdateAuditComment(auditComment);
    }

    closeOperationForm() {
        this.handleChange(null, "labelName");
        
        this.handleChange(null, "feature");
        this.handleChange(null, "type");

        this.props.form.setFieldsValue({labelName: null, feature: null, type: null});

        this.props.toggleOperationDraVisible();
    }

    addAuditComment = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err){
                let auditCommentObj = {
                    id: Number(Math.random().toString().substr(3, length) + Date.now()).toString(36),
                    labelName: this.state.labelName,
                    type: this.state.type,
                    feature: this.state.feature
                };

                let auditComment = this.props.auditComment || [];
                auditComment.push(auditCommentObj); 

                this.props.forUpdateAuditComment(auditComment);
            }
        });
    }

    updateBtnDomStatus = () => {
        
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.visible == true) {

            if (!nextProps.template) {

                if (this.props.onlyView != "true"){
                    
                    if (nextProps.taskCategory == "label") {
                        Mousetrap.bind("a",  () => {
                            this.setState({
                                lastSubmitting: true,
                            });

                            nextProps.getLastOneTask().then(() => {
                                this.setState({
                                    lastSubmitting: false,
                                });
                            });
                        });
                        Mousetrap.bind("alt+s",  () => {
                            this.setState({
                                commitSubmitting: true
                            });

                            this.props.operationCommitDto("commit", null, this.props.auditComment).then(() => {
                                this.setState({
                                    commitSubmitting: false
                                }); 
                            });
                        });
                        
                    }else {
                        Mousetrap.bind("alt+s",  () => {
                            this.setState({
                                passSubmitting: true,
                            });

                            this.props.operationCommitDto("auditCommit", true, this.props.auditComment).then(() => {
                                this.setState({
                                    passSubmitting: false,
                                });
                            });
                        });
                    }
                    
                    Mousetrap.bind("s",  () =>
                    { 
                        this.setState({
                            saveSubmitting: true
                        });

                        this.props.operationCommitDto("save", null, this.props.auditComment).then(() => {
                            this.setState({
                                saveSubmitting: false
                            });
                        });
                        nextState.auditComment.length != 0 && this.props.forUpdateAuditComment(nextState.auditComment);
                    });
                }else {
                    Mousetrap.bind("a",  () => { 
                        this.setState({
                            lastSubmitting: true,
                        });

                        nextProps.getLastOneTask().then(() => {
                            this.setState({
                                lastSubmitting: false,
                            });
                        });
                    });
                }
                
                Mousetrap.bind("d",  () => {
                    this.setState({
                        nextSubmitting: true,
                    });
                    
                    this.props.operationCommitDto("save", null, this.props.auditComment).then(() => {
                        !this.props.template && nextProps.getNextOneTask().then(() => {
                            this.setState({
                                nextSubmitting: false,
                            });
                        });
                    })
                });
            } 

        }else {
            Mousetrap.unbind("d");
            Mousetrap.unbind("alt+s");
            Mousetrap.unbind("s");
            Mousetrap.unbind("a");
        }

        if ((this.props.imageUrl != nextProps.imageUrl) || (this.props.fileName != nextProps.fileName)) {
            this.closeOperationForm();
        }

    }

    componentWillUnmount() {
    
    }
    
    renderAddAuditCommentForm() {
        let { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const { CheckableTag } = Tag;
        const { TextArea } = Input;

        return (
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                className="addAuditCommentFormContent"
                autoComplete="off" 
                preserve={true}
                >
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Label Name")}>
                    {getFieldDecorator('labelName', {
                        initialValue: this.state.labelName,
                        rules: [
                            this.state.type == "missMark" ? { 
                                required: false, 
                            }:{
                                required: true, 
                                message: i18n.gettext('Please select or input your label name') 
                            },{
                            validator: this.checkLabelName
                        }]
                    })(
                        <Input
                            placeholder={i18n.gettext('Please select or input your label name')}
                            prefix={<Icon type="edit"/>}
                            onChange={e => this.handleChange(e.target.value, "labelName")}
                            />
                    )}
                </Form.Item>
                <div className='selectLabelList'>
                    {(this.props.hasSelectedLabel || [{label: i18n.gettext("VOID")}]).map((socObj, key) => {
                        return (
                            <CheckableTag  
                                className='labelNameTag'
                                checked={this.state.labelName == socObj.label}
                                onChange={checked => this.handleChangeTag(socObj.label, checked)}
                            >
                                {socObj.label}
                            </CheckableTag>
                        );
                    })} 
                </div>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Type")}>
                    {getFieldDecorator('type', {
                        initialValue:this.state.type,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please select your type') 
                        }]
                    })(
                        <Select prefixIcon={<Icon type="edit"/>} onChange={(value) => this.handleChange(value, "type")}>
                            <Option value="mislabeled">错标</Option>
                            <Option value="missMark">漏标</Option>
                            <Option value="multiLabel">多标</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item 
                    colon={false} 
                    label={i18n.gettext("Feature")}>
                    {getFieldDecorator('feature', {
                        initialValue:this.state.feature,
                        rules: [{ 
                            required: true, 
                            message: i18n.gettext('Please input your feature') 
                        }]
                    })(
                        <TextArea
                            placeholder={i18n.gettext("Please input your feature")}
                            allowClear={true}
                            className="featureTextArea"
                            maxLength={60}
                            onChange={e => this.handleChangeFeature(e.target.value)}/>
                    )}
                </Form.Item>
                <div className="featureLength">
                    <span>{this.state.featureLength}</span>
                    <span >{`/60`}</span>
                </div>
            </Form>
        )
    }

    renderAddAuditCommentBtn() {
        return (
            <div className='addAuditCommentBtnGroup'>
                <Button className='addAuditComment' onClick={e => this.addAuditComment()}> 
                    {i18n.gettext("Add Auditcomment")}
                </Button>
            </div>
        );
    }

    renderAuditComment() {
        const commentType = [{
            type: "mislabeled",
            text: "错标"
        },{
            type: "missMark",
            text: "漏标"
        },{
            type: "multiLabel",
            text: "多标"
        }]

        let comments = (this.props.auditComment || []).map((comment, key) => {
            if (comment.id){
                return (
                    <Tag closable 
                        className='commentTag'
                        key={comment.id}
                        onClose={e => this.deleteSetItem(key, comment)}>
                            <div className='tagConent'>
                                <span className='labelName'>
                                    {comment.labelName}
                                </span>
                                {commentType.find(x => x.type == comment.type).text}
                            </div>
                            <div className='feature'>
                                {comment.feature}
                            </div>
                    </Tag>
            )};
        })


        return (
            <Card className='commentListCard' title={i18n.gettext("Comments List Card")}>
                {comments.length != 0 ?
                    <div className='commentContent'>
                        {comments}
                    </div>:
                    <div className='noneContent'>{i18n.gettext("Display None")}</div>
                }
            </Card>
        );
    }

    renderAbnormalBtnGroup() {
        if (this.props.urlType == "traid-and-bid-task") {
            return null;
        }

        return (
            <div>
                {this.props.taskCategory == 'label' &&
                    (<div className="operationBtnGroup">
                        {this.props.isAbnormalTask ?  
                            <Button loading={this.state.usUalSubmitting} onClick={e => {
                                this.setState({
                                    usUalSubmitting: true,
                                });

                                this.props.operationCommitDto("normal", this.props.isAbnormalTask, this.props.auditComment).then(() => {
                                    this.setState({
                                        usUalSubmitting: false,
                                    });
                                });
                            }}>
                                {i18n.gettext("Dismiss Unusual Task")}
                            </Button> :
                            <Button loading={this.state.usUalSubmitting} onClick={e => {
                                this.setState({
                                    usUalSubmitting: true,
                                });

                                this.props.operationCommitDto("normal", this.props.isAbnormalTask, this.props.auditComment).then(() => {
                                    this.setState({
                                        usUalSubmitting: false,
                                    });
                                });
                           }}>
                                {i18n.gettext("Unusual Task")}
                            </Button>}
                    </div>)}
            </div>
        );
    }

    renderSkipBtnGroup() {
        if (this.props.urlType == "traid-and-bid-task") {
            return null;
        }

        return (
            <div>
                <div className="operationBtnGroup">
                    <Button loading={this.state.skipSubmitting} onClick={e => { 
                            this.setState({
                                skipSubmitting: true,
                            });
                            
                            this.props.doSkipItem().then(() => {
                                this.setState({
                                    skipSubmitting: false,
                                }); 
                            })
                        }}>
                        {i18n.gettext("Skip For Now")}
                    </Button>
                </div>
            </div>
        );
    }

    renderPassBtnGroup() {
        return (
            <div>
                {this.props.taskCategory != 'label' && !this.props.template &&
                    (<div className="operationBtnGroup">
                        <Button loading={this.state.passSubmitting} onClick={e => {
                            this.setState({
                                passSubmitting: true,
                            });

                            this.props.operationCommitDto("auditCommit", true, this.props.auditComment).then(() => {
                                this.setState({
                                    passSubmitting: false,
                                });
                            });
                        }}>
                            {i18n.gettext("Pass")}
                        </Button>
                        <Divider type="vertical"/>
                        <Button loading={this.state.rejectSubmitting} onClick={e => {
                            this.setState({
                                rejectSubmitting: true,
                            });

                            this.props.operationCommitDto("auditCommit", false, this.props.auditComment).then(() => {
                                this.setState({
                                    rejectSubmitting: false,
                                });
                            })
                        }}>
                            {i18n.gettext("Reject")}
                        </Button>
                    </div>)}
            </div>
        );
    }

    renderPassAllBtnGroup() {
        return (
            <div>
                {this.props.taskCategory != 'label' && !this.props.template &&
                    (<div className="operationBtnGroup">
                        <Button loading={this.state.passAllSubmitting} onClick={e => {
                            this.setState({
                                passAllSubmitting: true
                            });

                            this.props.operationCommitDto("auditCommitAll", true, this.props.auditComment).then(() => {
                                this.setState({
                                    passAllSubmitting: false
                                });
                            });
                        }}>
                            {i18n.gettext("Pass All")}
                        </Button>
                        <Divider type="vertical"/>
                        <Button loading={this.state.rejectAllSubmitting}  onClick={e => {
                            this.setState({
                                rejectAllSubmitting: true
                            });

                            this.props.operationCommitDto("auditCommitAll", false, this.props.auditComment).then(() => {
                                this.setState({
                                    rejectAllSubmitting: false
                                });
                            })
                        }}>
                            {i18n.gettext("Reject All")}
                        </Button>
                    </div>)}
            </div>
        );
    }

    renderOperationBtnGroup() {
        return (
            <div className="operationBtnGroup">
                <Button disabled={this.props.isAbnormalTask && this.props.taskCategory == 'label'} 
                        loading={this.state.saveSubmitting}
                        onClick={e => {
                            this.setState({
                                saveSubmitting: true
                            });

                            !this.props.template && this.props.operationCommitDto("save", null, this.props.auditComment).then(() => {
                                this.setState({
                                    saveSubmitting: false
                                });
                            }).done();
                        }}>
                    {i18n.gettext("Save Result")}
                </Button>
                {(this.props.taskCategory == 'label' || this.props.template) &&
                    (<span>
                        <Divider type="vertical"/>
                        <Button disabled={this.props.isAbnormalTask && this.props.taskCategory == 'label'} 
                                loading={this.state.commitSubmitting}
                                onClick={e => {
                                    this.setState({
                                        commitSubmitting: true
                                    });
                                   
                                    !this.props.template && this.props.operationCommitDto("commit", null, this.props.auditComment).then(() => {
                                        this.setState({
                                            commitSubmitting: false
                                        });
                                    })
                                   
                                }}>
                            {i18n.gettext("Commit Result")}
                        </Button>
                    </span>)}
            </div>
        );
    }

    renderNextOneBtnGroup() {
        return (
            <div className="operationBtnGroup">
                {(this.props.taskCategory == 'label' || this.props.template) &&
                    (<span>
                        <Button className='nextOne' 
                                loading={this.state.lastSubmitting}
                                type="primary" 
                                onClick={e =>{ 
                                    this.setState({
                                        lastSubmitting: true,
                                    });

                                    !this.props.template && this.props.getLastOneTask().then(() => {
                                        this.setState({
                                            lastSubmitting: false,
                                        });
                                    });
                                }}>
                            {i18n.gettext("previous one")}
                        </Button>
                        <Divider type="vertical"/>
                    </span>)}
                <Button className='nextOne' 
                        type="primary" 
                        loading={this.state.nextSubmitting}
                        onClick={e => {
                            this.setState({
                                nextSubmitting: true,
                            });
                            
                            !this.props.template && this.props.getNextOneTask().then(() => {
                                this.setState({
                                    nextSubmitting: false,
                                });
                            });
                        }}>
                    {i18n.gettext("next one")}
                </Button>
            </div>
        );
    }

    renderDrawerTitle() {
        var clipboard = new ClipboardJS('.copy');

        // clipboard.on('success', function(e) {
        //     message.success(i18n.gettext("Copy Success"), 2);
        // });

        clipboard.on('error', function(e) {
            message.error(i18n.gettext("Copy Error"), 2);
        });

        return(
            <div className='drawerTitle'>
                <span className='title'>{i18n.gettext("Operation Drawer")}</span>
                <span>{this.props.fileName}</span>
                <button class='copy' data-clipboard-text={this.props.fileName}>{i18n.gettext("Copy Filename")}</button>
                {/* <Button class='copy' className='copyBtn' data-clipboard-text={this.props.fileName} onClick={e => this.copyFilename(this.props.fileName)}>{i18n.gettext("Copy Filename")}</Button> */}
            </div>)
    }

    render() {
        return (
            <Drawer title={this.renderDrawerTitle()}
                    placement="right"
                    className="operationDrawer"
                    id="operationDrawer"
                    onClose={e => this.closeOperationForm()}
                    visible={this.props.visible}
                    destroyOnClose={true}
                    width={500}>
                {this.props.onlyView != "true" &&
                    <div className='auditCommentContent'>
                        {this.renderAddAuditCommentForm()}
                        {this.renderAddAuditCommentBtn()}
                        {this.renderAuditComment()}
                    </div>}
                <div className="btnGroup" ref={this.btnGroup}>
                    <Divider/>
                    {this.props.onlyView != "true" &&
                        this.renderSkipBtnGroup()}
                    {this.props.onlyView != "true" &&
                        this.renderAbnormalBtnGroup()}
                    {this.props.onlyView != "true" &&
                        this.renderOperationBtnGroup()}
                    {this.renderNextOneBtnGroup()}
                    {this.renderPassBtnGroup()}
                    {this.renderPassAllBtnGroup()}
                </div>
            </Drawer>
        )
    }
}

export default Form.create()(OperationDrawer);