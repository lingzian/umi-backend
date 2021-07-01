import React, { useEffect, useState, FC } from 'react';
import { useParams, useRouteMatch, useLocation } from 'umi';
import { Form, Input, Button, message, Switch, Spin } from 'antd';
import MySelect from '@/components/MySelect';
import { formItemLayout, wrapperCol } from '@/assets/js/config';
import MyUpload from '@/components/MyUpload';
// import Editor from '@/components/common/editor'
import './index.less';

interface props {
  successCallback: Function;
}
const FormView: FC<props> = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const location = useLocation();

  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;

  const [loading, setLoading] = useState<boolean>(false);

  // 编辑状态
  useEffect(() => {
    setFieldsValue({
      name: 'Jacob Jørgensen',
      gender: 'male',
      avatar: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
      // content: 'jacob.jorgensen@example.com',
      status: Math.random() > 0.5,
    });
  }, [resetFields, setFieldsValue]);

  const handleSubmit = (values: any) => {
    console.log('values', values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('修改成功');
      props.successCallback();
    }, 1000);
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
          extra={
            <span>
              只支持<b>JPG、PNG、GIF</b>，大小不超过<b>2M</b>
            </span>
          }
          rules={[
            {
              validator: (rule, value, callback) => {
                console.log('验证', value);
                if (value.length <= 0) {
                  callback('请选择图片');
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          {/* {getFieldDecorator('attachment', {
            rules: [
            { required: true, message: '请上传相关图片' },
            { validator: (rule, value, callback) =>　{
              if (value) {
              const { aware } = this.props;
              const { fileList } = aware;
              const newFileList=fileList.map(item => ({...item}));
              if (!newFileList) {
              callback('请上传相关图片');
              } else {
              newFileList.length ? callback() : callback('请上传相关图片');
              }
              }
              callback(); // callback方法必须要有，否则会报错
             } },
            ],
            })(
              <MyUpload />
          )} */}
          <MyUpload />
        </Form.Item>

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
