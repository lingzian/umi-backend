import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { useLocalStorageState } from '@umijs/hooks';
import { myStore } from '@/utils'

export interface ConfigModelState {
  theme: boolean; // 主题：true为黑色 false为白色
  collapsed: boolean; // menu栏是否打开
}

export interface ConfigModelType {
  namespace: 'config';
  state: ConfigModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ConfigModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
    init: Reducer<ConfigModelState>;
  };
  subscriptions: { setup: Subscription };
}



const ConfigModel: ConfigModelType = {
  namespace: 'config',

  state: {
    theme: false,
    collapsed: false
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      console.log('进来设置config', action.action)
      let newState = {
        ...state,
        ...action.action,
      }
      myStore.set('localConfig', newState)
      return {
        ...state,
        ...action.action,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
    init(state, action) {
      let localConfig = myStore.get('localConfig')
      let newState = {
        ...state,
        ...localConfig
      }
      myStore.set('localConfig', newState)
      return newState
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default ConfigModel;