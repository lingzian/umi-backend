import React, { useRef, FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'antd';
import MyTable from '@/components/Table';
import { previewImg } from '@/utils';
import MySelect from '@/components/MySelect';
import { getList } from '@/services/tableList';
// import commom from '@/api'

const UserList: FC = () => {
  const tableRef: RefType = useRef();
  const history = useHistory();
  useEffect(() => {
    // alert(0)
  }, []);
  // 添加
  const add = () => {
    history.push('/user/list/add');
  };
  // 编辑
  const edit = () => {
    history.push('/user/list/edit?id=666');
  };

  // 新增按钮
  const AddBtn = () => (
    <Button className="fr" onClick={add} type="primary">
      新增用户
    </Button>
  );

  const onSelectRow = (rowKeys: string[]) => {
    console.log('rowKeys: ', rowKeys);
  };

  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'name',
      slot: <Input placeholder="name" allowClear />,
      rules: [],
      initialValue: 'this is a demo🤓',
    },
    {
      key: 'gender',
      slot: (
        <MySelect
          data={[
            { name: 'male', key: 'male' },
            { name: 'female', key: 'female' },
          ]}
          placeholder="gender"
        />
      ),
    },
  ];
  const preview = (url: string) =>
    previewImg(<img src={url} width="100%" alt="" />);
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'picture',
      render: (picture: CommonObjectType<string>) => (
        <span onClick={() => preview(picture.thumbnail)}>
          <img src={picture.thumbnail} width="40" alt="" />
        </span>
      ),
      width: '3%',
    },
    {
      title: 'name',
      dataIndex: 'name',
      render: (name: CommonObjectType<string>) => `${name.first} ${name.last}`,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      render: () => (
        <>
          <Button className="btn" onClick={edit} size="small">
            编辑
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <AddBtn />
      <MyTable
        apiFun={getList}
        columns={columns}
        ref={tableRef}
        onSelectRow={onSelectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
    </>
  );
};
export default UserList;
