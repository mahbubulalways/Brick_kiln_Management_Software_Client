export interface ICustomer {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  totalPurchased: number;
  totalPaid: number;
  nextPaymentDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  customerCode:string
   note: string | null;
}

export interface IDueResponse {
  id: string;
  customerId: number;
  customer: ICustomer;
  collect: number;
  due: number;
  newDue: number;
  nextDate: string;
  season: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface TDueData {
  id: number;
  due: number;
  collect: number;
  newDue: number;
  nextDate: string;
  customerId: number;
  season: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
}