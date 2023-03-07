import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { getAll as getPeripherals } from '../../../peripherals/store/peripheralSlice';
import { RecordType } from '../../types/gateway';
import { dataTransform } from '../../utils';
import { IPeripheralResponse } from '../../../peripherals/types/peripherals';
import { intl } from '../../../../core/helpers/i18nHelper';

export interface IProps {
  setSelected: (items: string[]) => void;
  gatewayPeripherals: IPeripheralResponse[];
  status: 'error' | 'warning' | undefined;
  setStatus: (status: any) => void;
}

const PeripheralsTransfer: React.FC<IProps> = ({ setSelected, gatewayPeripherals, status, setStatus }: IProps) => {
  const { isOpen, isOpenEdit } = useAppSelector((state) => state.gateway);
  const { peripherals } = useAppSelector((state) => state.peripheral);

  const [data, setData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen || isOpenEdit) {
      dispatch(getPeripherals());
    }
  }, [isOpen, isOpenEdit]);

  useEffect(() => {
    if (peripherals.length > 0) {
      setData(dataTransform(peripherals, intl));
    }
    if (gatewayPeripherals?.length > 0) {
      setTargetKeys(dataTransform(gatewayPeripherals || [], intl).map((item) => item.key));
    }
  }, [gatewayPeripherals, peripherals]);

  const handleChange = (newTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    const total = [...targetKeys];
    if (total.length === 10 || newTargetKeys.length > 10) {
      setStatus('error');
    } else {
      setStatus('');
    }

    setTargetKeys(newTargetKeys);
    setSelected(newTargetKeys);
  };

  return (
    <Transfer
      dataSource={data}
      listStyle={{
        width: 200,
        height: 200,
        justifyContent: 'center',
      }}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => item.description}
      status={status}
    />
  );
};

export default PeripheralsTransfer;
