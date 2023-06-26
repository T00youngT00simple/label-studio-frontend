(function (root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // console.log('是commonjs模块规范，nodejs环境')
        module.exports = factory();

    } else if (typeof define === 'function' && define.amd) {
        // console.log('是AMD模块规范，如require.js')
        define(factory())
    } else if (typeof define === 'function' && define.cmd) {
        // console.log('是CMD模块规范，如sea.js')
        define(function (require, exports, module) {
            module.exports = factory()
        })
    } else {
        // console.log('没有模块环境，直接挂载在全局对象上')
        root.luMiRequest = factory();
    }
}(this, function () {
    return {
        token: window.sessionStorage.token,
        url: window.sessionStorage.url,

        /* 获取一条标注任务 */
        getOneLaTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/receive-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 按批次开始进行标注任务 */
        getLaTasks: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/start-mission',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 按批次开始进行审核任务 */
        getAuTasks: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/start-auditor-mission',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 开始一条审核任务 */
        getOneAuTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/receive-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 获取批次的验收任务 */
        getAcTasks: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/start-acceptance-mission',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 获取一条验收任务 */
        getAcOneTask: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/receive-acceptance-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 获取定制方案 */
        getCustomizedSolutions: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/private-custom/select-custom',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },
        /* 添加定制方案 */ 
        createCustomizedSolution: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/private-custom/add',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },
        /* 更新定制方案 */
        updateCustomizedSolution: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/private-custom/revise',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },
        /* 删除所有的定制方案 */
        deleteCustomPlan: function (asyncJudge, data) {
            let reponseData;
            this.ajax({
                url: this.url + '/sm/private-custom/delete-all',
                params: data,
                async: asyncJudge,
                type: 'delete',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData;
        },
        /* 获取标注规范 */
        geCustomLabels: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-batch/file-resource',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 获取标注规范 */
        getCalloutSpecification(asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/file/display',
                data: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 标注任务的保存 */
        saveOneLaTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/save-result' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        saveOneLaTask_WithoutHash: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/save-result',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 标注任务下一条 */
        laNextTask: function (asyncJudge, resulType, data) {
            data.integrated = JSON.stringify(data.integrated);
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/nextOne-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 标注任务提交 */
        laSubmit: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/commit' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },


        laSubmit_WithoutHash: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/commit',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },


        /* 标注任务上一条 */
        laPreTask: function (asyncJudge, resulType, data) {
            data.integrated = JSON.stringify(data.integrated);
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/preOne-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 审核任务保存 */
        auSaveOneTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/save-audit-result' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        auSaveOneTask_WithOutHash: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/save-audit-result',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 审核任务提交 */
        auSubmit: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/auditor-commit' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 审核任务提交 */
        auSubmit_WithoutHash: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/auditor-commit',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 审核任务下一条 */
        auNextTask: function (asyncJudge, resulType, data) {
            data.integrated = this.jsonStringify(data.integrated);
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/next-auditor-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 验收任务提交 */
        acSubmit: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/acceptance-commit' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        acSubmit_WithoutHash: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/acceptance-commit',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 验收任务下一条 */
        acNextTask: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + "/sm/tagging-task/next-acceptance-task",
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 验收任务保存 */
        acSaveOneTask: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/save-audit-result' + '?hash5=' + this.md5(data.taskString),
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 查看下一条任务（只查看） */
        examineNextTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/next-one',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 查看上一条任务（只查看） */
        examinePretTask: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/pre-one',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 验收全部操作 */
        acAllSubmit: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/acceptance-batch/batch-acceptance-commit',
                params: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 审核全部操作 */
        auAllSubmit: function (asyncJudge, resulType, data) {
            data.integrated = this.jsonStringify(data.integrated);
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/batch-auditor-commit',
                params: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },


        /* 标注帧提交 */
        laCommitFrame: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/detail-commit',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 标注帧保存 */
        laSaveFrame: function (asyncJudge, resulType, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/' + resulType + '/detail-save-result',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 审核/验收帧保存 */
        auSaveFrame: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/task-video-detail/detail-save-auditComments',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 暂时跳过 */
        skipTemporarily: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/skip',
                params: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 定制页面 */
        customPage: function (asyncJudge, data) {
            let reponseData = null;
            this.ajax({
                url: this.url + '/sm/label-page/design-label-page',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },

                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })

            return reponseData;
        },

        /* 异常任务 */
        abnormalTask: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/abnormal-task',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 解除异常 */
        normalTask: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/normal-task',
                params: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },

        /* 获取定制页面 */
        queryCustomPage: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/label-page/find-one',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }

            })
            return reponseData
        },

        /* 申请仲裁 */
        applyArbitration: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/arbitration/saveApplyArbitration',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 获取个人定制 */
        getPersonalDesign: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/personal-design/find-one',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 新增个人定制 */
        createPersonalDesign: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/personal-design/insert',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 更新个人定制 */
        updatePersonalDesign: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/personal-design/update',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 查询仲裁原因 */
        findArbitrationReason: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/arbitration/find-arbitration-by-taskId',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 仲裁成功 */
        arbitrationSuccess: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/arbitration/saveArbitrationResult',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 帧批量提交 */
        detailBathchCommit: function (asyncJudge, data){
            let reponseData
            this.ajax({
                url: this.url + '/sm/task-video-detail/detail-batch-commit',
                params: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 人员校验 */
        personCheck: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/share-task-Whether-enter',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 验收获取指定帧请求 */
        getSpecifiedQuantity: function (asyncJudge, data) {
            let reponseData
            this.ajax({
                url: this.url + '/sm/tagging-task/receive-acceptance-task',
                params: data,
                async: asyncJudge,
                type: 'get',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 单帧驳回 */
        singleFrameHandle: function (asyncJudge, data){
            let reponseData
            this.ajax({
                url: this.url + '/sm/task-video-detail/detail-auditor-commit',
                data: data,
                async: asyncJudge,
                type: 'post',
                success: function (res) {
                    reponseData = res
                },
                error: function () {
                    reponseData = { code: 1, data: null, msg: "请求失败请重试!" }
                }
            })
            return reponseData
        },
        /* 23d语义分割-地面点算法生成 */ 
        getAlgorithmGenerationPointIndexs: function (asyncJudge, data) {
            return new Promise((resolve,reject) => {
                this.ajax({
                    url: this.url.replace('/apis','') + '/ptapis/PointCloudGround/',
                    params: data,
                    async: asyncJudge,
                    type: 'get',
                    success: function (res) {
                        resolve(res)
                    },
                    error: function () {
                        reject({ code: 1, data: null, msg: "请求失败请重试!" })
                    }
                })
            })
        },
        /* 获取任务操作历史 */
        getTaskOperationHistory: function(asyncJudge, data) {
            return new Promise((resolve, reject) => {
                this.ajax({
                    url: this.url + '/sm/tagging-task-date-operate/list-operate',
                    params: data,
                    async: asyncJudge,
                    type: 'get',
                    success: function (res) {
                        resolve(res)
                    },
                    error: function () {
                       reject({ code: 1, data: null, msg: "请求失败请重试!" })
                    }
                })
            })
        },
        /* 查看任务操作历史的结果 */
        getHistoryTaskData: function(asyncJudge, data) {
            return new Promise((resolve, reject) => {
                this.ajax({
                    url: this.url + '/sm/tagging-task-date-history/get-data-by-operate',
                    params: data,
                    async: asyncJudge,
                    type: 'get',
                    success: function (res) {
                        resolve(res)
                    },
                    error: function () {
                       reject({ code: 1, data: null, msg: "请求失败请重试!" })
                    }
                })
            })
        },
        params: function (obj) {
            let str = ''
            for (item in obj) {
                //为啥不能用obj.item
                if (obj[item] === null) {
                    str += item + '=' + '&'
                } else {
                    str += item + '=' + obj[item] + '&'
                }
            }
            //剪切多余的 &
            str = str.substr(0, str.length - 1)
            return str
        },
        jsonStringify: function (obj) {
            return JSON.stringify(obj);
        },
        ajax: function (options) {
            let xhr = new XMLHttpRequest()
            // options.type.toLocaleLowerCase()
            //this的指向是$对象
            // let data = this.params(options.data)
            // if (options.type === 'get') {
            //     options.url = options.url + '?' + data
            //     data = null
            // }

            //打开连接需要在设置请求头之前，否则报下面的错误
            //Uncaught DOMException: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        // console.log(xhr.responseText);
                        //如果success没有传递也不会报错
                        options.success && options.success(JSON.parse(xhr.responseText))
                    } else {
                        //请求出错
                        options.error && options.error()
                    }
                    //请求完成
                    options.compelete && options.compelete()
                }
            }
            // xhr.open(options.type, options.url,options.async)

            // if (options.type === 'post') {
            //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            // }
            //相当于过滤器的作用

            // xhr.send(data)

            /* 后加 */
            if (!!options.params) {
                //调用拼接字符串函数
                options.url += '?' + this.params(options.params)
            }
            xhr.open(options.type, options.url, options.async)
            xhr.setRequestHeader('token', this.token)
            xhr.setRequestHeader('Domain', window.location.hostname)
            if (options.beforesend && !options.beforesend()) {
                return
            }
            // 请求体
            //判断post传入的参数是不是FormData构造函数
            if (options.data instanceof FormData) {
                xhr.send(options.data)
            } else if (typeof options.data === 'object') {
                //判断post传入的参数是不是object对象
                //请求头
                xhr.setRequestHeader('Content-Type', 'application/json')
                // 转换为json字符串
                xhr.send(JSON.stringify(options.data))
            } else if (typeof options.data == 'string') {
                //判断post传入的参数是不是string字符串
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                //直接在请求体中传入参数
                xhr.send(options.data)
            } else {
                xhr.send()
            }


            // 响应
            xhr.addEventListener('load', function () {
                //回调函数
                //把返回的JSON字符串转换为js对象
                options.success && options.success(JSON.parse(xhr.response))
            })

        },

        // //调用myAjax函数，并传入一个对象

        // 	// get请求
        //     myAjax({
        //         method: 'get',
        //         url: '接口路径',
        //         params: {
        //             id: 15441,
        //         },
        //         success: function(result) {
        //             console.log(result);  // 返回一个ID为15441的数据
        //         }
        //     })


        //  //post请求
        //     myAjax({
        //         method: 'post',
        //         url: '接口路径',
        //         data: {
        //             bookname: '123',
        //             author: '456',
        //             publisher: '789'
        //         },
        //         success: function(result) {
        //             console.log(result);
        //         }
        //     })
        //get方式传入的是一个对象的话，就需要处理一下数据
        // 拼接字符串
        paramsToString: function (obj) {
            let arr = []
            //遍历对象，拼接后保存在arr数组里
            for (let k in obj) {
                arr.push(k + '=' + obj[k])
            }
            //数组转换字符串
            return arr.join('&')
        },

        //封装ajax 
        //{ method, url, params, data, success }:解构对象
        myAjax: function ({ method, url, params, data, success }) {
            let xhr = new XMLHttpRequest()
            // 请求行

        },

        /* 获取MD5值 */
        /*
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       * to work around bugs in some JS interpreters.
       */
        safeAdd: function (x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff)
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
            return (msw << 16) | (lsw & 0xffff)
        },

        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        bitRotateLeft: function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt))
        },

        /*
        * These functions implement the four basic operations the algorithm uses.
        */
        md5cmn: function (q, a, b, x, s, t) {
            return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b)
        },
        md5ff: function (a, b, c, d, x, s, t) {
            return this.md5cmn((b & c) | (~b & d), a, b, x, s, t)
        },
        md5gg: function (a, b, c, d, x, s, t) {
            return this.md5cmn((b & d) | (c & ~d), a, b, x, s, t)
        },
        md5hh: function (a, b, c, d, x, s, t) {
            return this.md5cmn(b ^ c ^ d, a, b, x, s, t)
        },
        md5ii: function (a, b, c, d, x, s, t) {
            return this.md5cmn(c ^ (b | ~d), a, b, x, s, t)
        },

        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        binlMD5: function (x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << (len % 32)
            x[((len + 64) >>> 9 << 4) + 14] = len

            var i
            var olda
            var oldb
            var oldc
            var oldd
            var a = 1732584193
            var b = -271733879
            var c = -1732584194
            var d = 271733878

            for (i = 0; i < x.length; i += 16) {
                olda = a
                oldb = b
                oldc = c
                oldd = d

                a = this.md5ff(a, b, c, d, x[i], 7, -680876936)
                d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586)
                c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819)
                b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
                a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897)
                d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
                c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
                b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983)
                a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
                d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
                c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063)
                b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
                a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
                d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101)
                c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
                b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

                a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510)
                d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
                c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713)
                b = this.md5gg(b, c, d, a, x[i], 20, -373897302)
                a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691)
                d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083)
                c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335)
                b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848)
                a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438)
                d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
                c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961)
                b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
                a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
                d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784)
                c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
                b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

                a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558)
                d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
                c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
                b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556)
                a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
                d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
                c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632)
                b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
                a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174)
                d = this.md5hh(d, a, b, c, x[i], 11, -358537222)
                c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979)
                b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189)
                a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487)
                d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835)
                c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520)
                b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651)

                a = this.md5ii(a, b, c, d, x[i], 6, -198630844)
                d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
                c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
                b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055)
                a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
                d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
                c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523)
                b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
                a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
                d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744)
                c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
                b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
                a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070)
                d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
                c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259)
                b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551)

                a = this.safeAdd(a, olda)
                b = this.safeAdd(b, oldb)
                c = this.safeAdd(c, oldc)
                d = this.safeAdd(d, oldd)
            }
            return [a, b, c, d]
        },

        /*
        * Convert an array of little-endian words to a string
        */
        binl2rstr: function (input) {
            var i
            var output = ''
            var length32 = input.length * 32
            for (i = 0; i < length32; i += 8) {
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
            }
            return output
        },

        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        rstr2binl: function (input) {
            var i
            var output = []
            output[(input.length >> 2) - 1] = undefined
            for (i = 0; i < output.length; i += 1) {
                output[i] = 0
            }
            var length8 = input.length * 8
            for (i = 0; i < length8; i += 8) {
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
            }
            return output
        },

        /*
        * Calculate the MD5 of a raw string
        */
        rstrMD5: function (s) {
            return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8))
        },

        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        rstrHMACMD5: function (key, data) {
            var i
            var bkey = this.rstr2binl(key)
            var ipad = []
            var opad = []
            var hash
            ipad[15] = opad[15] = undefined
            if (bkey.length > 16) {
                bkey = this.binlMD5(bkey, key.length * 8)
            }
            for (i = 0; i < 16; i += 1) {
                ipad[i] = bkey[i] ^ 0x36363636
                opad[i] = bkey[i] ^ 0x5c5c5c5c
            }
            hash = this.binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
            return this.binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
        },

        /*
        * Convert a raw string to a hex string
        */
        rstr2hex: function (input) {
            var hexTab = '0123456789abcdef'
            var output = ''
            var x
            var i
            for (i = 0; i < input.length; i += 1) {
                x = input.charCodeAt(i)
                output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
            }
            return output
        },

        /*
        * Encode a string as utf-8
        */
        str2rstrUTF8: function (input) {
            return unescape(encodeURIComponent(input))
        },

        /*
        * Take string arguments and return either raw or hex encoded strings
        */
        rawMD5: function (s) {
            return this.rstrMD5(this.str2rstrUTF8(s))
        },
        hexMD5: function (s) {
            return this.rstr2hex(this.rawMD5(s))
        },
        rawHMACMD5: function (k, d) {
            return this.rstrHMACMD5(this.str2rstrUTF8(k), this.str2rstrUTF8(d))
        },
        hexHMACMD5: function (k, d) {
            return this.rstr2hex(this.rawHMACMD5(k, d))
        },
        md5: function (string, key, raw) {
            if (!key) {
                if (!raw) {
                    return this.hexMD5(string)
                }
                return this.rawMD5(string)
            }
            if (!raw) {
                return this.hexHMACMD5(key, string)
            }
            return this.rawHMACMD5(key, string)
        }

    }

}))