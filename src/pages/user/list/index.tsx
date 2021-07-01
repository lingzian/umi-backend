import React, { useState, useRef, FC, useEffect } from 'react';
import { history } from 'umi';
import { Button, Input, Modal, message } from 'antd';
import MyTable from '@/components/Table';
import { previewImg } from '@/utils';
import MySelect from '@/components/MySelect';
import { getList } from '@/services/tableList';
import EditUser from '../edit';
// import commom from '@/api'

const UserList: FC = () => {
  const tableRef: RefType = useRef();
  const [state, setState] = useState({
    type: 'add',
    showPopup: false,
  });
  useEffect(() => {}, []);
  // 添加
  const add = () => {
    setState({
      type: 'add',
      showPopup: true,
    });
  };
  // 编辑
  const edit = () => {
    setState({
      type: 'edit',
      showPopup: true,
    });
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
    // {
    //   title: 'avatar',
    //   dataIndex: 'picture',
    //   render: (picture: CommonObjectType<string>) => (
    //     <span onClick={() => preview(picture.thumbnail)}>
    //       <img src={picture.thumbnail} width="40" alt="" />
    //     </span>
    //   ),
    //   width: '3%',
    // },
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
      <Modal
        title={state.type === 'edit' ? '编辑用户' : '新建用户'}
        visible={state.showPopup}
        onCancel={() => setState((ele) => ({ ...ele, showPopup: false }))}
        destroyOnClose
        width={800}
        footer={null}
      >
        <EditUser
          successCallback={() => {
            setState((ele) => ({ ...ele, showPopup: false }));
            console.log('tableRef', tableRef);
            tableRef.current.update();
          }}
        />
        {/* <EditUser successCallback={this.successCallback} onCancel={() => this.setState({visible: false})} type={type} initialValues={userDetail} /> */}
      </Modal>
    </>
  );
};
export default UserList;
