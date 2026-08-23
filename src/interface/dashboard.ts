export type TChallanSummary = {
    totalSale: number;
    discount: number;
    carRent: number;
    totalSaleWithRent: number;
    cash: number;
    due: number;
};

export type TChallanItemReport = {
    class: string;
    totalChallan: number;
    totalQuantity: number;
    totalPrice: number;
};

export type TPaymentReport = {
    ledger: string;
    amount: number;
    paymentGiven: number;
};

export type TDashboardReport = {
    challan: {
        summary: TChallanSummary;
        items: TChallanItemReport[];
    };
    payment: {
        total: number;
        payments: TPaymentReport[];
    };
    cash: number;
    due: number
};