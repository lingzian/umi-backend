import { defineConfig } from 'umi';
import routes from './route.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    hmr: true,
    // // 默认为 false，且必须 设置 false，否则 plugin-dva 会重复加载 model
    // skipModelValidate: false,
  },
  theme: {},
  routes,
  fastRefresh: {},
});
