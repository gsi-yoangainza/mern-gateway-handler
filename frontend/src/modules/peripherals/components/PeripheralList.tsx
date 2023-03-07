import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';
import { getAll, setOpen } from '../store/peripheralSlice';
import { IPeripheral } from '../types/peripherals';
import { openNotification } from '../../common/utils/utils';
import GatewayForm from './peripheralForm/PeripheralForm';
import Actions from '../../common/components/crudNav/Actions';
import Spinner from '../../common/components/Spinner';

const PeripheralList: React.FC = () => {
  const dispatch = useAppDispatch();

  const columns: ColumnsType<IPeripheral> = [
    { title: intl('peripheral.vendor'), dataIndex: 'vendor', key: 'vendor' },
    { title: intl('creationDate'), dataIndex: 'createdAt', key: 'creationDate' },
    {
      title: intl('peripheral.status'),
      dataIndex: 'status',
      key: 'status',
      render: (value) => intl(`peripheral.${value ? 'online' : 'offline'}`),
    },
    {
      title: intl('peripheral.status'),
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <Tag color={`${status ? '#43c574' : '#ED495C'}`} key={'1'}>
          {intl(`peripheral.${status ? 'online' : 'offline'}`).toUpperCase()}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const { peripherals, isLoading, isError, message, isOpen } = useAppSelector((state) => state.peripheral);

  useEffect(() => {
    if (isError) {
      openNotification('error', message);
    }
  }, [isError, message]);

  if (isLoading) return <Spinner />;

  const onClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <>
      <Actions text="Peripheral" handleClick={() => dispatch(setOpen(true))} />
      <Table size="middle" dataSource={peripherals} columns={columns} rowKey="_id"></Table>
      <GatewayForm {...{ isOpen, onClose }} />
    </>
  );
};

export default PeripheralList;
