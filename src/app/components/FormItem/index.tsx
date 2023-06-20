import { Col, Row, Space, Typography } from 'antd';
import React from 'react';

interface Props {
  children: React.ReactElement;
  title: any;
  required?: boolean;
  errorText?: any;
}

const FormItem = ({ children, title, required, errorText }: Props) => {
  return (
    <Row>
      <Col span={6} xs={24} md={24} lg={6}>
        <Typography.Title level={5}>
          {title}
          {required && (
            <span style={{ color: 'red', marginLeft: '6px' }}>*</span>
          )}
        </Typography.Title>
      </Col>
      <Col span={18} xs={24} md={24} lg={18}>
        {children}
        {errorText && (
          <Typography.Text type="danger">{errorText}</Typography.Text>
        )}
      </Col>
    </Row>
  );
};

export default FormItem;
