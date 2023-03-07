import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { isEmpty } from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';
import { getAll, deleteGateway, setOpen, setOpenDetails, setOpenEdit, reset } from '../store/gatewaySlice';
import { IGatewayResponse } from '../types/gateway';
import { onConfirm, openNotification } from '../../common/utils/utils';
import GatewayForm from './gatewayForm/GatewayForm';
import Actions from '../../common/components/crudNav/Actions';
import Spinner from '../../common/components/Spinner';
import GatewayDetails from './gatewayForm/GatewayDetails';

const GatewayList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gateways, isLoading, isError, message, openDetails, isOpen, isOpenEdit, isFormSuccess } = useAppSelector(
    (state) => state.gateway
  );
  const [selectedGateway, setSelectedGateway] = useState<IGatewayResponse>();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  useEffect(() => {
    if (isError) {
      openNotification('error', message);
    }
    if (isFormSuccess && message !== '') {
      openNotification('success', intl(message));
    }
    dispatch(reset());
  }, [isError, isFormSuccess, dispatch]);

  const onDelete = (record: any) => {
    onConfirm(
      intl('warningDelete'),
      () => {
        dispatch(deleteGateway(record._id));
      },
      <ExclamationCircleOutlined />
    );
  };

  const handleDetails = (e: IGatewayResponse) => {
    setSelectedGateway(e);
    dispatch(setOpenDetails(true));
  };

  const handleEdit = (e: IGatewayResponse) => {
    setSelectedGateway(e);
    dispatch(setOpenEdit(true));
  };

  const columns: ColumnsType<IGatewayResponse> = [
    { title: intl('gateway.serialNumber'), dataIndex: 'serialNumber', key: 'serialNumber' },
    { title: intl('gateway.name'), dataIndex: 'name', key: 'name' },
    { title: intl('gateway.ipv4Address'), dataIndex: 'ipv4Address', key: 'ipv4Address' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" onClick={() => handleEdit(record)}>
            {intl('edit')}
          </Button>
          <Button type="link" onClick={() => handleDetails(record)}>
            {intl('details')}
          </Button>
          <Button type="link" onClick={() => onDelete(record)}>
            {intl('remove')}
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isError) {
      openNotification('error', message);
    }
  }, [isError, message]);

  if (isLoading) return <Spinner />;

  const onClose = () => {
    if (isOpenEdit) {
      setSelectedGateway(undefined);
      dispatch(setOpenEdit(false));
    }
    dispatch(setOpen(false));
  };

  return (
    <>
      <Actions text="Gateway" handleClick={() => dispatch(setOpen(true))} />
      <Table size="middle" dataSource={gateways} columns={columns} rowKey="_id"></Table>
      {(isOpen || (isOpenEdit && !isEmpty(selectedGateway))) && <GatewayForm {...{ onClose, selectedGateway }} />}
      {openDetails && !isEmpty(selectedGateway) && (
        <GatewayDetails
          open={openDetails}
          onClose={() => dispatch(setOpenDetails(false))}
          name={intl('gateway.gatewayDetails')}
          gateway={selectedGateway}
        />
      )}
    </>
  );
};

export default GatewayList;
