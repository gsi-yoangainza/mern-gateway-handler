import React, { createRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { createPeripheral } from '../../store/peripheralSlice';
import { Button, Form, Input, notification, Switch, Typography } from 'antd';
import { StyledDrawer } from '../styled';
import { theme } from '../../../../core/theme/theme';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { onConfirm } from '../../utils/utils';
import { intl } from '../../../../core/helpers/i18nHelper';
import { validateIPv4Address } from '../../../../core/utils/validations';
import { ContainerForm, DrawerFooterActions, FormSpin } from '../../../common/styled';

interface IProps {
  onClose: () => void;
}
const PeripheralForm: React.FC<IProps> = ({ onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { isFormLoading, isOpen } = useAppSelector((state) => state.peripheral);
  const formRef = createRef<any>();
  const [form] = Form.useForm();
  const { Text } = Typography;

  const onSubmit = (e: any) => {
    dispatch(createPeripheral(e));
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
            {intl('peripheral.addPeripheral')}
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
          <Form.Item required label={intl('peripheral.vendor')} name="vendor" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item required label={intl('peripheral.status')} name="status">
            <Switch checkedChildren={intl('peripheral.online')} unCheckedChildren={intl('peripheral.offline')} />
          </Form.Item>
        </ContainerForm>
      </StyledDrawer>
    </Form>
  );
};

export default PeripheralForm;
