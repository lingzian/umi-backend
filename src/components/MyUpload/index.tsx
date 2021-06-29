import React, { useState, useEffect, ReactNode } from 'react';
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/Upload';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
interface FileProps {
  onChange?: (file: any) => void;
  value?: any[];
  // 子组件
  children?: ReactNode;
  /** 文字说明 */
  extra?: string | ReactNode;
  // 限制数量
  amount?: number;
  // 限制大小 单位 M
  size?: number;
  // 同upload参数
  otherProps?: UploadProps;
}
const MyUpload = ({
  onChange,
  value = [
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ],
  amount = 4,
  size,
  otherProps,
  extra,
  children,
}: FileProps) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: value,
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => {
    setState((ele) => ({ ...ele, previewVisible: false }));
  };
  const handleChange = ({ fileList }) => {
    onChange(fileList);
    setState((ele) => ({ ...ele, fileList: fileList }));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState((ele) => ({
      ...ele,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    }));
  };

  // 上传前验证
  const beforeUpload = (
    file: { type: string; size: number },
    fileList: any[],
  ) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('图片类型不正确！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!');
      return false;
    }
    // if(fileList.length > amount) {
    //   message.error(`最多只能上传${amount}张图片！`);
    //   return false
    // }
    return true;
  };

  const { previewVisible, previewImage, fileList, previewTitle } = state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={amount}
        beforeUpload={beforeUpload}
        multiple
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyUpload;
