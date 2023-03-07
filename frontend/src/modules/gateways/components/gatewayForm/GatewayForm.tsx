import React, { createRef, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { createGateway, editGateway } from '../../store/gatewaySlice';
import { StyledDrawer } from '../styled';
import { theme } from '../../../../core/theme/theme';
import { filterArrayPeripherals } from '../../utils';
import { intl } from '../../../../core/helpers/i18nHelper';
import { validateFieldName, validateIPv4Address } from '../../../../core/utils/validations';
import { ContainerForm, DrawerFooterActions, FormSpin } from '../../../common/styled';
import { IGatewayResponse } from '../../types/gateway';
import { onConfirm, openNotification } from '../../../common/utils/utils';
import PeripheralsTransfer from './GatewayPeripheralsTransfer';

interface IProps {
  onClose: () => void;
  selectedGateway?: IGatewayResponse;
}

const GatewayForm: React.FC<IProps> = ({ onClose, selectedGateway }: IProps) => {
  const dispatch = useAppDispatch();
  const { isFormLoading, isOpen, isError, isOpenEdit } = useAppSelector((state) => state.gateway);
  const { peripherals } = useAppSelector((state) => state.peripheral);

  const [selectedPeripherals, setSelectedPeripherals] = useState<string[]>([]);
  const [peripheralTransferStatus, setStatus] = useState<'error' | 'warning'>();

  const formRef = createRef<any>();
  const [form] = Form.useForm();
  const { Text } = Typography;

  const onSubmit = (e: any) => {
    if (peripheralTransferStatus !== 'error') {
      if (selectedPeripherals.length > 0) {
        const items = filterArrayPeripherals(selectedPeripherals, peripherals);
        if (isOpenEdit) {
          dispatch(editGateway({ id: selectedGateway?._id || '', data: { ...e, peripheralDevices: items || [] } }));
        } else {
          dispatch(createGateway({ ...e, peripheralDevices: items || [] }));
        }
      } else {
        if (isOpenEdit) {
          dispatch(editGateway({ id: selectedGateway?._id || '', data: e }));
        } else {
          dispatch(createGateway(e));
        }
      }
      !isError && form.resetFields();
    } else {
      openNotification('error', intl('gateway.peripheralAmountValidation'));
    }
  };

  const handleCancel = () => {
    onConfirm(
      intl('dataWillBeLost'),
      () => {
        form.resetFields();
        onClose?.();
      },
      <ExclamationCircleOutlined />
    );
  };

  const handleStatus = (st: 'error' | 'warning') => {
    if (st === 'error') {
      openNotification('error', intl('gateway.peripheralAmountValidation'));
    }
    setStatus(st);
  };

  const initValues = {
    name: selectedGateway?.name,
    serialNumber: selectedGateway?.serialNumber,
    ipv4Address: selectedGateway?.ipv4Address,
  };

  return (
    <Form
      name="add-gateway"
      onFinish={onSubmit}
      layout="vertical"
      form={form}
      ref={formRef}
      initialValues={initValues}
      scrollToFirstError
    >
      <StyledDrawer
        title={
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 17 }}>
            {intl(!isOpenEdit ? 'gateway.addGateway' : 'gateway.editGateway')}
          </Text>
        }
        placement="right"
        closable={false}
        open={isOpen || (isOpenEdit && !isEmpty(selectedGateway))}
        destroyOnClose
        onClose={handleCancel}
        width={window.screen.width > 768 ? 500 : '100%'}
        maskClosable={false}
        footer={
          <DrawerFooterActions>
            <Button htmlType="button" onClick={handleCancel}>
              {intl('close')}
            </Button>
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" id="add-user-btn" htmlType="button" onClick={() => formRef?.current?.submit()}>
                  {intl('accept')}
                </Button>
              )}
            </Form.Item>
          </DrawerFooterActions>
        }
      >
        {isFormLoading && <FormSpin />}

        <ContainerForm>
          <Form.Item required label={intl('gateway.serialNumber')} name="serialNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            required
            label={intl('gateway.name')}
            name="name"
            rules={[
              { required: true },
              {
                validator: (rule, value) => validateFieldName(rule, value),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            required
            label={intl('gateway.ipv4Address')}
            name="ipv4Address"
            rules={[
              { required: true },
              {
                validator: (rule, value) => validateIPv4Address(rule, value),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={intl('gateway.peripherals')} name="peripheralDevices">
            <PeripheralsTransfer
              setSelected={setSelectedPeripherals}
              gatewayPeripherals={selectedGateway?.peripheralDevices || []}
              status={peripheralTransferStatus}
              setStatus={handleStatus}
            />
          </Form.Item>
        </ContainerForm>
      </StyledDrawer>
    </Form>
  );
};

export default GatewayForm;
