import SseMsg from "./SseMsg";
import factory from "../../../public/global/request"

export default class SseDataManager {
    constructor() {
        SseMsg.register(this);
    }

    saveCommitDto(batchId, taskId, level, urlType, duration, labelPageId, imageUrl, cloudData, 
        forCheckDto, lengthDto, methods, auditComment, taskCategory, auditMethods) {
        let taskCommitDto = {};

        if (!auditComment) {
            auditComment = [{
                "multiscaleNumber": 0,
                "numberOfMissingLabels": 1,
                "totalAuditOpinions": 1,
                "wrongMarkNumber": 0
            }];
        }else if (!auditComment.find(item => item.numberOfMissingLabels)){
            auditComment.push({
                "multiscaleNumber": 0,
                "numberOfMissingLabels": 1,
                "totalAuditOpinions": 1,
                "wrongMarkNumber": 0
            });
        }

        taskCommitDto = {
            auditComment: auditComment || [],
            data: [
                {
                    data: cloudData,
                    index: 0,
                    name: imageUrl,
                    timestamp: 0
                },
                lengthDto,
                forCheckDto
            ],
            taskId: taskId,
            duration: duration,
            weight: 0,
            level: level && Number(level) || 0
        };
        
        const checkRes = (result, resolve, mes) => {
            if (result && result.code == 0){
                resolve(mes);
            }
        }

        const prom = new Promise((res, rej) => {
            if (methods == "save"){
                if (urlType == "traid-and-bid-task") {
                    delete taskCommitDto["duration"];
                }

                if (taskCategory == "audit"){
                    taskCommitDto.urlType = urlType;
                    
                    let aSaveTaskInfo = factory.auSaveOneTask_WithOutHash(false, urlType, taskCommitDto);

                    checkRes(aSaveTaskInfo, res, "Save Success");
                    
                }else if (taskCategory == "acceptance"){
                    taskCommitDto.level = 6;
                    taskCommitDto.urlType = urlType;
                    
                    delete taskCommitDto["duration"];
                    
                    let aSaveTaskInfo = factory.auSaveOneTask_WithOutHash(false, urlType, taskCommitDto);
                    checkRes(aSaveTaskInfo, res, "Save Success");
                
                }else {
                    let saveResultInfo = factory.saveOneLaTask_WithoutHash(false, urlType, taskCommitDto);
                    checkRes(saveResultInfo, res, "Save Success");
                }
                
            }else if (methods == "commit"){
                let subResultInfo = factory.laSubmit_WithoutHash(false, urlType, taskCommitDto);
                checkRes(subResultInfo, res, "Commit Success");

            }else if (methods == "auditCommit"){
                let resultForAudit = !!auditMethods;

                taskCommitDto.resultForAudit = resultForAudit;
                taskCommitDto.labelPageId = labelPageId;

                if (urlType == "traid-and-bid-task") {
                    delete taskCommitDto["duration"];
                };

                if (taskCategory == "audit"){
                    let pointSum = 0;
                    for (let i in cloudData){
                        pointSum += cloudData[i].points.length;
                    };
                    
                    if (pointSum != lengthDto.pcdLength && auditMethods){
                        checkRes({code: 0}, res, "提交异常");
                    } else {
                        let passAuditTaskInfo = factory.auSubmit_WithoutHash(false, urlType, taskCommitDto);
                        checkRes(passAuditTaskInfo, res, (auditMethods ? "Pass" : "Reject") + " Success");
                    }
                    
                }else if (taskCategory == "acceptance"){
                    taskCommitDto.level = 6;
                    delete taskCommitDto["duration"];

                    let commitAcTaskInfo = factory.acSubmit_WithoutHash(false, taskCommitDto);
                    checkRes(commitAcTaskInfo, res, (auditMethods ? "Pass" : "Reject") + " Success");
                };

            }else if (methods == "auditCommitAll"){
                let integrated = JSON.parse(sessionStorage.getItem("integrated"));
                let taskIds = JSON.parse(sessionStorage.getItem("splitData")).taskList;
                
                if (taskCategory == "audit"){
                    let parseData = {
                        batchId: batchId,
                        level: level, 
                        resultForAudit: auditMethods, 
                        abnormalTask: null, 
                        taskIds: taskIds, 
                        integrated: integrated 
                    };
                    
                    let auditPassAllTaskInfo = factory.auAllSubmit(false, urlType, parseData);
                    checkRes(auditPassAllTaskInfo, res, (auditMethods ? "Pass" : "Reject") + " All Success");
                
                }else if (taskCategory == "acceptance"){
                    delete taskCommitDto["duration"];

                    let parseData = {
                        batchId: batchId,
                        ifAll: true, 
                        level: level, 
                        resultForAcceptance: !!auditMethods,
                        integrated: integrated 
                    };

                    let acceptancePassAllTaskInfo = factory.acAllSubmit(false, parseData);
                    checkRes(acceptancePassAllTaskInfo, res, (auditMethods ? "Pass" : "Reject") + " All Success");
                }

            }else if (methods == "normal"){
                if (auditMethods == true){
                    let normalTaskInfo = factory.normalTask(false, taskCommitDto);
                    checkRes(normalTaskInfo, res, "Dismiss Unusual Task Success");

                }else {
                    let abnormalTaskInfo = factory.abnormalTask(false, {
                        taskId: taskId
                    });
                    checkRes(abnormalTaskInfo, res, "Unusual Task Success");
                };
            };

        });

        return prom;
    }

    loadTaskData(cloudData) {
        const newPrm = new Promise((res,rej) => {
            res(cloudData)
        })

        return newPrm;
    }


    loadBinaryFile(fileName) {
        const worker = new Worker("./SseDataWorker.js");

        console.log(fileName);

        const url = "http://localhost:8080/" + fileName;
        const oReq = new XMLHttpRequest();

        oReq.responseType = "arraybuffer";
        oReq.open("GET", url, true);

        const prom = new Promise((res, rej) => {
            oReq.onloadend = (oEvent) => {

                console.log(oEvent);

                if (oEvent.target.status != 200) {
                    rej();
                } else {
                    worker.addEventListener("message", (arg) => {
                        if (arg.data.operation == "uncompress") {
                            if (arg.data.result)
                                res(arg.data.result);
                            else
                                rej()
                        }
                    });
                    worker.postMessage({operation: "uncompress", data: oReq.response});
                }
            };
            oReq.send("nothing");
        });
        prom.then(() => worker.terminate(), ()=>(0/* Silent catch */));
        return prom;
    }
}