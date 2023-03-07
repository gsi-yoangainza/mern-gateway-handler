import { IPeripheralResponse } from '../../peripherals/types/peripherals';

export interface IGateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices?: IPeripheralResponse[];
}

export interface IGatewayResponse extends IGateway {
  _id: string;
}

export interface RecordType {
  key: string;
  title: string;
  description: string;
}

export interface IGatewayEditData {
  id: string;
  data: IGateway;
}

export interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

export interface IDetailsProps {
  open: boolean;
  onClose: () => void;
  name: string;
  gateway: IGatewayResponse;
}
