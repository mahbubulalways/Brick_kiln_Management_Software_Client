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
