import React from 'react';
import { NodeCollapseOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Empty, Tag } from 'antd';

import { useAppSelector } from '../../../../app/hooks';
import { intl } from '../../../../core/helpers/i18nHelper';
import { DescriptionItemProps, IDetailsProps } from '../../types/gateway';
import { GatewayPeripheralsDetails, StyledDetailsRow } from '../styled';
import { DrawerFooterActions } from '../../../common/styled';

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
    <h4 className="site-description-item-profile-p-label">{title}:</h4>
    {content}
  </div>
);

const NoDataComponent = ({ title }: any) => (
  <>
    <h4 className="site-description-item-profile-p-label">{title}:</h4>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </>
);

const GatewayDetails: React.FC<IDetailsProps> = ({ open, onClose, name, gateway }: IDetailsProps) => {
  const item: any = { ...gateway };
  const datesKeys = ['createdAt', 'updatedAt'];
  const ignoreKeys = ['__v', '_id'];

  const { user } = useAppSelector((state) => state.auth);

  const manageContentDetails = (key: string) => {
    switch (key) {
      case 'user':
        return <DescriptionItem title={intl(`gateway.${key}`)} content={user?.name} />;

      default:
        return <DescriptionItem title={intl(`gateway.${key}`)} content={item[key]} />;
    }
  };

  return (
    <Drawer
      width={500}
      placement="right"
      maskClosable={false}
      closable={false}
      onClose={onClose}
      open={open}
      title={name}
      footer={
        <DrawerFooterActions>
          <Button type="primary" htmlType="button" onClick={onClose}>
            {intl('close')}
          </Button>
        </DrawerFooterActions>
      }
    >
      <p className="site-description-item-profile-p">{intl('properties')}</p>
      <StyledDetailsRow gutter={[16, 16]}>
        {Object.keys(item || {})
          .filter((e) => e != 'peripheralDevices')
          .filter((el) => !ignoreKeys.includes(el))
          .map((key: string, index) => {
            return (
              <Col span={12} key={`${key}-${index}`}>
                {datesKeys.includes(key) ? (
                  <DescriptionItem title={intl(`gateway.${key}`)} content={new Date(item[key]).toLocaleDateString()} />
                ) : (
                  manageContentDetails(key)
                )}
              </Col>
            );
          })}
      </StyledDetailsRow>
      <Divider />
      <StyledDetailsRow gutter={[16, 16]}>
        <Col span={24}>
          {item.peripheralDevices.length > 0 ? (
            <DescriptionItem
              title={intl(`peripherals`)}
              content={
                <StyledDetailsRow gutter={[60, 16]}>
                  {item.peripheralDevices.map((i: any) => {
                    return (
                      <Col span={12} key={i._id}>
                        <GatewayPeripheralsDetails>
                          <div className="peripheral-name">
                            <NodeCollapseOutlined /> {i.vendor}
                          </div>
                          <Tag color={`${i.status ? '#43c574' : '#ED495C'}`} key={'1'}>
                            {intl(`peripheral.${i.status ? 'online' : 'offline'}`).toUpperCase()}
                          </Tag>
                        </GatewayPeripheralsDetails>
                      </Col>
                    );
                  })}
                </StyledDetailsRow>
              }
            />
          ) : (
            <NoDataComponent title={intl(`peripherals`)} />
          )}
        </Col>
      </StyledDetailsRow>
    </Drawer>
  );
};

export default GatewayDetails;
