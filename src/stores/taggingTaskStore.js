import { getParent, types } from 'mobx-state-tree';

/**
 * Project Store
 */
const TaggingTaskStore = types
  .model('TaggingTask', {
    /**
     * Project ID
     */
    id: types.number,
    batchId: types.number,
    dataBatchName: types.string,
    filePath: types.string,
    taskList: types.string,
    data: types.maybe(types.frozen()),
    comment: types.maybe(types.frozen()),
    abnormalTask: types.boolean,
  })
  .views(self => ({

  }))
  .actions(self => {
    function resetValue (taskInfo) {
      self.id = taskInfo.id;
      self.filePath = taskInfo.filePath;
    };

    return {
      resetValue
    };
  });


export default TaggingTaskStore;
