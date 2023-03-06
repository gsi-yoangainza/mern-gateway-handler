import React, { createRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { createGateway } from '../../store/gatewaySlice';
import { Button, Form, Input, Typography } from 'antd';
import { StyledDrawer } from '../styled';
import { theme } from '../../../../core/theme/theme';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { onConfirm } from '../../utils/utils';
import { intl } from '../../../../core/helpers/i18nHelper';
import PeripheralsTransfer from './GatewayPeripheralsTransfer';
import { validateIPv4Address } from '../../../../core/utils/validations';
import { ContainerForm, DrawerFooterActions, FormSpin } from '../../../common/styled';
import { IPeripheralResponse } from '../../../peripherals/types/peripherals';

interface IProps {
  onClose: () => void;
}
const GatewayForm: React.FC<IProps> = ({ onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { isFormLoading, isOpen } = useAppSelector((state) => state.gateway);
  const { peripherals } = useAppSelector((state) => state.peripheral);
  const [selectedPeripherals, setSelectedPeripherals] = useState<string[]>([]);
  const formRef = createRef<any>();
  const [form] = Form.useForm();
  const { Text } = Typography;

  const onSubmit = (e: any) => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (selectedPeripherals) {
      let items: IPeripheralResponse[] = [];
      selectedPeripherals.forEach((e) => {
        items = peripherals.filter((element) => element._id.toString() === e);
      });
      dispatch(createGateway({ ...e, peripheralDevices: items || [] }));
    } else {
      dispatch(createGateway({ ...e, peripheralDevices: selectedPeripherals || [] }));
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
  console.log('selectedPeripherals', selectedPeripherals);
  return (
    <Form
      name="add-user"
      onFinish={onSubmit}
      layout="vertical"
      form={form}
      ref={formRef}
      // initialValues={initVals}
      scrollToFirstError
    >
      <StyledDrawer
        title={
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 17 }}>
            {intl('gateway.addGateway')}
          </Text>
        }
        placement="right"
        closable={false}
        open={isOpen}
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
          <Form.Item required label={intl('gateway.name')} name="name" rules={[{ required: true }]}>
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
            <PeripheralsTransfer setSelected={setSelectedPeripherals} />
          </Form.Item>
        </ContainerForm>
      </StyledDrawer>
    </Form>
  );
};

export default GatewayForm;
