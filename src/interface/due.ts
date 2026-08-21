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


// DUE EACH CUSTOMER 
interface TDueCustomer {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  totalPurchased: number;
  totalPaid: number;
  nextPaymentDate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  note: string | null;
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
  customer: TDueCustomer;
}