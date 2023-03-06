import { Button, Space } from 'antd';
import React from 'react';
import { ActionsContainer } from '../../styled';

interface IProps {
  text: string;
  handleClick: () => void;
}

const Actions: React.FC<IProps> = ({ text, handleClick }: IProps) => {
  return (
    <ActionsContainer>
      <Space style={{ marginBottom: 16, marginTop: 16 }}>
        <Button type="primary" onClick={handleClick}>{`Add ${text}`}</Button>
      </Space>
    </ActionsContainer>
  );
};

export default Actions;
