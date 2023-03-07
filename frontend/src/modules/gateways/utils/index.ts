import { IPeripheralResponse } from '../../peripherals/types/peripherals';
import { RecordType } from '../types/gateway';

export const filterArrayPeripherals = (arr: string[], all: any[]) => {
  let items: IPeripheralResponse[] = [];
  arr.forEach((elem) => {
    const exists = all.find((element) => element._id.toString() === elem);
    exists && items.push(exists);
  });

  return items;
};

export const dataTransform = (peripherals: IPeripheralResponse[], tranlationFn: any): RecordType[] =>
  peripherals.map((e, i) => ({
    key: e._id.toString(),
    title: `${e.vendor}`,
    description: `${e.vendor} (${tranlationFn(`peripheral.${e.status ? 'online' : 'offline'}`)})`,
  }));
