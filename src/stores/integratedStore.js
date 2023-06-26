import { getParent, types } from 'mobx-state-tree';

/**
 * Project Store
 */
const IntegratedStore = types
  .model('integrated', {
    /**
     * Project ID
     */
    endTime: types.maybeNull(types.string),
    startTime: types.maybeNull(types.string),
    taggerBy: types.maybeNull(types.string),
    whetherRejected: types.maybeNull(types.boolean),
    skipTemperily: types.maybeNull(types.boolean),
    whetherAcceptanceRejected: types.maybeNull(types.boolean),
    containAcceptanceComment: types.maybeNull(types.boolean),
  })
  .views(self => ({
    


  }));

export default IntegratedStore;
