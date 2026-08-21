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