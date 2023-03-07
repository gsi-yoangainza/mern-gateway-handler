import { ReactNode } from 'react';
import { Modal, notification } from 'antd';

import { NotificationType } from '../types';

export const openNotification = (type: NotificationType, message: string): void => {
  notification[type]({
    message,
    duration: 3,
  });
};

export const onConfirm = (message: string, onOkCallBack: () => void, icon: ReactNode) => {
  return Modal.confirm({
    title: message,
    icon: icon,
    okText: 'Accept',
    cancelText: 'Cancel',
    onOk: onOkCallBack,
    centered: true,
  });
};
