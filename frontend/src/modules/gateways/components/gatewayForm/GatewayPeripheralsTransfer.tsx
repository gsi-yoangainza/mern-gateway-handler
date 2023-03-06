import React, { useEffect, useMemo, useState } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { getAll as getPeripherals } from '../../../peripherals/store/peripheralSlice';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

export interface IProps {
  setSelected: (items: string[]) => void;
}
// const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const PeripheralsTransfer: React.FC<IProps> = ({ setSelected }: IProps) => {
  const { isOpen } = useAppSelector((state) => state.gateway);
  const { peripherals } = useAppSelector((state) => state.peripheral);

  const data: RecordType[] = peripherals.map((e, i) => ({
    key: e._id.toString(),
    title: `${e.vendor}`,
    description: `${e.vendor}-${e._id}`,
  }));
  const initialTargetKeys = data.map((item) => item.key);
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(getPeripherals());
    }
  }, [isOpen]);

  // const initialTargetKeys = useMemo(
  //   () =>
  //     peripherals.filter((item) => Number(item._id) > 10).map((item) => item._id),
  //   [peripherals]
  // );

  const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    setSelected(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={data}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={(item) => item.description}
    />
  );
};

export default PeripheralsTransfer;
