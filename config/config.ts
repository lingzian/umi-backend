import { defineConfig } from 'umi';
import routes from './route.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
