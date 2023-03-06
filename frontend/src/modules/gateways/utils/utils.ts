import { Modal, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactNode } from 'react';
import { NotificationType } from '../../common/types';
import { IGateway } from '../types/gateway';

export const columns: ColumnsType<IGateway> = [
  { title: 'Serial Number', dataIndex: 'serialNumber', key: 'serialNumber' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Ipv4Address', dataIndex: 'ipv4Address', key: 'ipv4Address' },
];

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

export const openNotification = (type: NotificationType, message: string): void => {
  notification[type]({
    message,
    duration: 3,
  });
};
