import React, { useEffect, useState, FC } from 'react';
import { useParams, useRouteMatch, useLocation } from 'umi';
import { Form, Input, Button, message, Switch, Spin } from 'antd';
import MySelect from '@/components/MySelect';
import { formItemLayout, wrapperCol } from '@/assets/js/config';
import MyUpload from '@/components/MyUpload';
// import Editor from '@/components/common/editor'
import './index.less';

const FormView: FC = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  const id = params.id;

  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;

  const [loading, setLoading] = useState<boolean>(false);

  // 编辑状态
  useEffect(() => {
    if (!id) {
      resetFields();
      return;
    }
    setFieldsValue({
      name: 'Jacob Jørgensen',
      gender: 'male',
      avatar: 'https://randomuser.me/api/portraits/thumb/men/84.jpg',
      content: 'jacob.jorgensen@example.com',
      status: Math.random() > 0.5,
    });
  }, [id, resetFields, setFieldsValue]);

  const handleSubmit = (values: any) => {
    console.log('values', values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('修改成功');
    }, 1000);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Spin spinning={loading}>
      <Form {...formItemLayout} form={form} onFinish={handleSubmit}>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[
            {
              required: true,
              message: '请选择性别',
            },
          ]}
        >
          <MySelect
            data={[
              { key: 'male', name: 'male' },
              { key: 'female', name: 'female' },
            ]}
            placeholder="请选择性别"
          />
        </Form.Item>
        <Form.Item
          label="头像"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra={
            <span>
              只支持<b>JPG、PNG、GIF</b>，大小不超过<b>5M</b>
            </span>
          }
        >
          <MyUpload />
        </Form.Item>
        {/* <Form.Item
          label="描述"
          name="content"
          rules={[
            {
              validator: async (rule, value) => {
                const h = value.toHTML();
                if (h === '<p></p>' || !h) {
                  throw new Error('请输入内容');
                }
              },
            },
          ]}
        >
          <Editor />
        </Form.Item> */}
        <Form.Item label="状态" name="status" valuePropName="checked">
          <Switch checkedChildren="开启" unCheckedChildren="禁用" />
        </Form.Item>
        <Form.Item wrapperCol={wrapperCol}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FormView;
