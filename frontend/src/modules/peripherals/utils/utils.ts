import { Modal, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactNode } from 'react';
import { intl } from '../../../core/helpers/i18nHelper';
import { NotificationType } from '../../common/types';
import { IPeripheral } from '../types/peripherals';

export const columns: ColumnsType<IPeripheral> = [
  { title: intl('peripheral.vendor'), dataIndex: 'vendor', key: 'vendor' },
  { title: intl('creationDate'), dataIndex: 'createdAt', key: 'creationDate' },
  { title: intl('peripheral.status'), dataIndex: 'status', key: 'status' },
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
