import { Button, Icon, message, Upload } from '@alipay/bigfish/antd';
import React, { Component } from '@alipay/bigfish/react';
import styles from './style.less';

const { Dragger } = Upload;

class UploadImage extends Component {
  state = {
    loading: false,
  };

  handleLogoChange = info => {
    const { onChange } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
      });
      return;
    }

    if (info.file.status === 'done') {
      /* response 为后端返回的数据 */
      onChange(info.file.response.url);
      this.setState({
        loading: false,
      });
    }
  };

  beforeUpload = file => {
    const typeMatch = ['image/jpeg', 'image/png', 'image/svg+xml'].indexOf(file.type) > -1;

    if (!typeMatch) {
      message.error('只能上传 JPG、PNG、SVG 类型的图片！');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('图片尺寸不能超过 2M！');
    }

    return typeMatch && isLt2M;
  };

  render() {
    const { loading } = this.state;
    const { value } = this.props;
    const uploadProps = {
      name: 'logo',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleLogoChange,
      beforeUpload: this.beforeUpload,
      showUploadList: false,
    };
    return (
      <div className={styles.uploadLogo}>
        <Dragger {...uploadProps}>
          <div className={styles.uploadPreview}>
            {loading && <Icon type="loading" />}
            {!loading && !value && <Icon type="plus" />}
            {!loading && value && <img src={value} alt="" />}
          </div>
        </Dragger>
        <div className={styles.uploadActionArea}>
          <Upload {...uploadProps}>
            <Button>
              <Icon type="upload" />
              上传文件
            </Button>
          </Upload>
          <div className={styles.uploadRemark}>可拖拽照片到左侧区域上传</div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
