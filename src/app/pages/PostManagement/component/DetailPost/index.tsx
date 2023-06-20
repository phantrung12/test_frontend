import React from 'react';
import { IPost } from '../../../../../types/Post.type';
import { Button, Col, Modal, Row } from 'antd';

interface Props {
  post?: IPost;
  open: boolean;
  onClose?: () => void;
}

const DetailPost = ({ post, open, onClose }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <Row gutter={[16, 16]}>
        <Col span={6}>ID</Col>
        <Col span={18}>{post?.id}</Col>
        <Col span={6}>User ID</Col>
        <Col span={18}>{post?.userId}</Col>
        <Col span={6}>Title</Col>
        <Col span={18}>{post?.title}</Col>
        <Col span={6}>Body</Col>
        <Col span={18}>{post?.body}</Col>
      </Row>
    </Modal>
  );
};

export default DetailPost;
