export type TGoodsCategory = {
    id: string;
    name: string;
};

export type TGoodsStock = {
    id: string;
    vataId: string;
    categoryId: string;
    name: string;
    shop: string;
    quantity: number;
    price: number;
    image: string;
    warranty: string | null;
    createdAt: string;
    updatedAt: string;

    category: TGoodsCategory;

    _count: {
        goodsIssues: number;
        goodsLosses: number;
    };
};






export type TGoodsIssue = {
    id: string;

    name: string;

    location: string;

    quantity: number;

    date: string;

    good: TGoodsStock;
};

