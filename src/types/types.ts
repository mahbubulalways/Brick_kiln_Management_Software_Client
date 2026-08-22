import { IUser } from "@/interface/user";
import { Dispatch, SetStateAction } from "react";

export type TClassAndRate = {
  classType: string;
  className: string;
  rate: number | string;
  id?: number;
};

// CREATE INVOICE TYPES
export type TChallanItem = {
  class: string;
  rate: number;
  quantity: number;
  price: number;
};

export type TChallanCreate = {
  invoice: {
    serial: number;
    chalanType: string;
    deliveryDate: Date | null;
    challanDate: Date;
    duePaymentDate: Date;
    note: string;
    productPrice: number;
    discount: number;
    carRent: number;
    totalPrice: number;
    cash: number;
    due: number;
  };
  customer: {
    phoneNumber: string;
    name: string;
    address: string;
  };
  invoiceItems: {
    items: TChallanItem[];
  };
};

// INVOICE MODAL
export type TCustomInvoiceModal = {
  isOpen: boolean;
  onClose: () => void;
  setInvoiceId: Dispatch<SetStateAction<number | undefined>>;
  invoiceId: number;
};

// Types for showing challan

export interface ICustomer {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  totalPurchased: number;
  totalPaid: number;
  nextPaymentDate: string;
  note:string
  customerCode:string;
  remainingDelivery:number
}

export interface IChallanItem {
  id: string;
  challanId: number;
  class: string;
  deliveryDate: string;
  quantity: number;
  rate: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  challan?: IChallanForDataShow;
  delivered: number;
}

export interface IChallanForDataShow {
  id: string;
  serial: number;
  season:string;
  chalanType: string;
  challanDate: string;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  customer: ICustomer;
  items: IChallanItem[];
  createdBy:IUser,
  productPrice: number;
  discount: number;
  totalPrice: number;
  cash: number;
  due: number;
  duePaymentDate: string;
  deliveryDate: string;
  note?: string;
  carRent: number;
}

// DELIVERY

export type TTodaySDelivery = {
  customer: ICustomer;
  id: number;
  serial:number;
  items: IChallanItem[];
};
