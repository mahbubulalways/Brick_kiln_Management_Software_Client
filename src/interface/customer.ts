export interface TCustomer {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  totalPurchasedQuantity: number;
  totalDeliveredQuantity: number;
  totalRemainingQuantity: number;
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
  note: string;
  customerCode:string;
  nextPaymentDate: string ;
}