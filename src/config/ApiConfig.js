
export const API_CONFIG = {
  gateway: `https://cs.luxiaobiao.cn/apis`,
  endpoints: {

    // task
    getOneTask: "/sm/tagging-task/receive-task",

    // nextOneTask
    examineNextTask: "sm/tagging-task/next-one",
    auNextTask: '/sm/tagging-task/next-auditor-task',
    labelNextTask: '/sm/tagging-task/nextOne-task',
    acNextTask: '/sm/tagging-task/next-acceptance-task'
  },
  alwaysExpectJSON: false,
};
