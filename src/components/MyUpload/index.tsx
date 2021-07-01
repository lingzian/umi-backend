import React, { useState, useEffect, ReactNode, useRef } from 'react';
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
  value = [],
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
  const handleChange = (info) => {
    console.log('onchange', info);
    let curFileList = info.fileList;
    curFileList = curFileList.map((file) => {
      if (file.response) {
        // 这里上传组件回调的数据，有些是提供给上传组件自身使用的，所以不能不要
        // 而需要向后端提交的数据这里提前封装起来，以方便最终的提交
        let saveParams = {};
        saveParams['filename'] = file.response.name;
        saveParams['url'] = file.response.url;
        file['saveParams'] = saveParams;
      }
      return file;
    });
    curFileList = curFileList.filter((file) => {
      if (file.size / 1024 / 1024 <= 2) {
        if (file.response) {
          return file.response.status == 'done';
        }
        return true;
      } else {
        return false;
      }
    });
    console.log('curFileList', curFileList);
    onChange(curFileList);
    // setState((ele) => ({ ...ele, fileList: curFileList }));
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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!');
      return false;
    }
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
        accept={'.pdf,.jpg,.png'}
        fileList={value}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={amount}
        beforeUpload={beforeUpload}
        multiple
      >
        {fileList.length >= amount || value.length >= amount
          ? null
          : uploadButton}
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
