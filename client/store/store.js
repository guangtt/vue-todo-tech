import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
    var store =  new Vuex.Store({
        strict: true, // 在开发环境下规范书写，在store外部不能修改store内部数据。!!正式环境勿用!!
        state: defaultState,
        mutations,
        getters,
        actions,
        // 初始化就调用plugin
        // plugins: [(store) => {
        //     console.log('my plugin')
        // }
        // ]
    });
    //设置模块热更新
    if(module.hot){
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './getters/getters',
            './actions/actions'
        ], () => {
            var newState = require('./state/state').default;
            var newMutations = require('./mutations/mutations').default;
            var newGetters = require('./getters/getters').default;
            var newActions = require('./actions/actions').default;
            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                actions: newActions,
                getters: newGetters
            })
        })
    }
    return store;
};