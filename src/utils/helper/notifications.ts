import { notification as antdNotification } from 'antd';

interface NotificationProps {
  message?: string;
  description: string;
}

export const notification = {
  error: ({ message, description }: NotificationProps) => {
    antdNotification.error({
      message: message ? message : 'Error',
      description,
      className: 'notification notification-error',
    });
  },
  warning: ({ message, description }: NotificationProps) => {
    antdNotification.warning({
      message: message ? message : 'Warning',
      description,
      className: 'notification notification-warning',
    });
  },
  success: ({ message, description }: NotificationProps) => {
    antdNotification.success({
      message: message ? message : 'Success',
      description,
      className: 'notification notification-success',
    });
  },
  info: ({ message, description }: NotificationProps) => {
    antdNotification.info({
      message: message ? message : 'Info',
      description,
      className: 'notification notification-info',
    });
  },
};
