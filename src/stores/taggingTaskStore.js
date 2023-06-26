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
    data: types.maybe(types.frozen()),
    abnormalTask: types.boolean,
  })
  .views(self => ({




  }));

export default TaggingTaskStore;
