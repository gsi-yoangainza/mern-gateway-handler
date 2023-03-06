import { Table } from 'antd';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';
import Actions from '../../common/components/crudNav/Actions';
import Spinner from '../../common/components/Spinner';
import { getAll, setOpen } from '../store/gatewaySlice';
import { columns, openNotification } from '../utils/utils';
import GatewayForm from './gatewayForm/GatewayForm';

const GatewayList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const { gateways, isLoading, isError, message, isOpen } = useAppSelector((state) => state.gateway);

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
      <Actions text="Gateway" handleClick={() => dispatch(setOpen(true))} />
      <Table size="middle" dataSource={gateways} columns={columns} rowKey="_id"></Table>
      <GatewayForm {...{ isOpen, onClose }} />
    </>
  );
};

export default GatewayList;
