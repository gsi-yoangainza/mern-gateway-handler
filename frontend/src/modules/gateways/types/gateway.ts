import { IPeripheral } from '../store/gatewaySlice';

export interface IGateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices?: IPeripheral[];
}
