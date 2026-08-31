export type TVataInformation = {
    id: string;
    vataId: string;
    nameEnglish: string;
    nameBangla: string;
    address: string;
    subdomain: string;
    ownerName: string;
    ownerPhoneNumber: string;
    challansPhoneNumber: string;
    smsRate: number | null;
    softwareFee: number;
    nextPaymentDate: string | null;
    createdAt: string;
    updatedAt: string;
};



// FOR ADMIN
export type TSubscriptionStatus =
    | "PENDING"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED";

export type TSubscription = {
    id: string;
    vataId: string;
    startDate: string | null;
    endDate: string | null;
    amount: string;
    status: TSubscriptionStatus;
    paidAt: string;
    paymentMethod: string;
    transactionId: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
};

export type TVataResponse = {
    vataId: string;
    id: string;
    nameBangla: string;
    nameEnglish: string;
    nextPaymentDate: string | Date;
    ownerName: string;
    address: string;
    ownerPhoneNumber: string;
    createdAt: string | Date;
    softwareFee: number | string;
    smsRate: number | string;
    subscriptionEnd: string | Date | null;
    subscriptionStart: string | Date | null;
    subdomain: string;
    subscriptions: TSubscription[];
};