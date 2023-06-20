import { Modal, ModalProps } from 'antd';
import React from 'react';

interface CustomProps extends ModalProps {
  children: React.ReactElement;
}

const AntdModal = ({ children, ...rest }: CustomProps) => {
  return (
    <Modal className="modal-custom" {...rest}>
      {children}
    </Modal>
  );
};

export default AntdModal;
