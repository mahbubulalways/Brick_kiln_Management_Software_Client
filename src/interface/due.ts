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
}

export interface IDueResponse {
  id: number;
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