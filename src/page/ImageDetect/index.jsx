import { Form, Input } from '@alipay/bigfish/antd';
import React, { useState } from '@alipay/bigfish/react';
import { CreateProjectLayout } from '@alipay/tech-ui';
import styles from './style.less';
import UploadImage from './UploadImage';

const CreateProject = ({ form }) => {
  /* form commit loading */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = form;

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };

  return (
    <div className={styles.box}>
      <CreateProjectLayout
        title="创建小程序"
        description="这是一行说明文字，非必要时可以省略。"
        onOk={handleSubmit}
        confirmLoading={loading}
      >
        <CreateProjectLayout.Content>
          <Form layout="vertical">
            <Form.Item
              label="小程序名称"
              help="名称由中文、英文、下划线、+、-组成，长度在3~30个字符。"
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_+-]{3,30}$/,
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="小程序简介" help="小程序上架后一个自然月可修改5次（10~32个字符）。">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    pattern: /^.{10,30}$/,
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="小程序logo">
              {getFieldDecorator('logo', {
                rules: [
                  {
                    required: true,
                    message: '请上传LOGO',
                  },
                ],
              })(<UploadImage />)}
            </Form.Item>
          </Form>
        </CreateProjectLayout.Content>
      </CreateProjectLayout>
    </div>
  );
};

export default Form.create()(CreateProject);
