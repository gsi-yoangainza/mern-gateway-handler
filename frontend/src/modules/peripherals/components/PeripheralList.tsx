import { Table } from 'antd';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';
import Actions from '../../common/components/crudNav/Actions';
import Spinner from '../../common/components/Spinner';
import { getAll, setOpen } from '../store/peripheralSlice';
import { columns, openNotification } from '../utils/utils';
import GatewayForm from './peripheralForm/PeripheralForm';

const PeripheralList: React.FC = () => {
  const dispatch = useAppDispatch();

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
