import { IUser } from "./user";

export type TStockBook = {
    id: string;
    class: string;
    stockIn: number;
    stockOut: number;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    createdBy: IUser
    seasonId: string;
    vataId: string;
};