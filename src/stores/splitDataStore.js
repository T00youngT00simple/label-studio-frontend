import { getParent, types } from 'mobx-state-tree';

/**
 * Project Store
 */
const SplitDataStore = types
  .model('splitData', {
    /**
     * Project ID
     */
    taskId: types.number,
    batchId: types.frozen(),
    taskCategory: types.string,
    batchType: types.string,
    labelPageId: types.number,
    onlyView: types.maybeNull(types.boolean),
    taskList: types.string,
    level: types.maybeNull(types.number),
    abnormalTask: types.maybeNull(types.boolean),
    taskConfirmation: types.boolean,
    taskConfirm: types.maybeNull(types.boolean),
    labelSet: types.maybe(types.frozen()),
    mark: types.boolean,
    template: types.boolean,
    templateId: types.maybeNull(types.number),
    taggingBatchId: types.maybeNull(types.number),
  })
  .views(self => ({




  }));

export default SplitDataStore;
