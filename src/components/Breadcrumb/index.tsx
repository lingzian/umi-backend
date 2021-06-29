import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';
import { Link, useLocation } from 'umi';
import { menuRoutes } from '../../../config/route.config';
import { history } from 'umi';

// 通用面包屑
const Breadcrumbs: FC = () => {
  const location = useLocation();

  const flattenRoutes = (arr: any): Array<any> => {
    return arr.reduce((prev: any, item: any) => {
      if (item.routes) {
        prev.push(item);
      }
      return prev.concat(item.routes ? flattenRoutes(item.routes) : item);
    }, []);
  };
  const [allRoutes, setAllRoutes] = useState(flattenRoutes(menuRoutes)); // 扁平化所有路由信息

  const createBread = () => {
    let breadArr = [] as any;
    if (location.pathname == '/') {
      return (breadArr = [
        {
          path: '/',
          name: '首页',
          key: '/home',
        },
      ]);
    }
    // 获取当前路径的key
    let key = allRoutes
      .find((ele) => ele.path == location.pathname)
      .key.split('/');
    // 通过key 组合父子的path
    let routeArr = key.reduce((total: any, ele: any, index: any) => {
      let pre = index > 1 ? total[index - 1] : false;
      return total.concat((pre ? pre : '') + '/' + ele);
    }, [] as any);
    // 通过每个path找到每个path的对象
    routeArr.forEach((ele: any, idx: any) => {
      breadArr.push(allRoutes.find((route: any) => route.path == ele));
    });
    return breadArr;
  };
  const breadcrumbs = createBread();
  return (
    <Breadcrumb style={{ display: 'inline-block' }}>
      {breadcrumbs.map((bc: any, index: number) => {
        return (
          <Breadcrumb.Item key={bc.key}>
            <Button
              disabled={
                (bc.routes && bc.path !== '/') ||
                index === breadcrumbs.length - 1
              }
              onClick={() => {
                history.push(bc.path);
              }}
              style={{ padding: '0' }}
              type="link"
            >
              {bc.name}
            </Button>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
