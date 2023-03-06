export interface IPeripheral {
  uuId: string;
  vendor: string;
  status: boolean;
  dateCreated?: string;
}

export interface IPeripheralResponse {
  _id: string;
  uuId: string;
  vendor: string;
  status: boolean;
  dateCreated?: string;
}

export interface IInitialState {
  peripherals: IPeripheralResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFormLoading: boolean;
  message: string;
  isOpen: boolean;
}
