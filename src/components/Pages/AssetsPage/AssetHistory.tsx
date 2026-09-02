"use client"

import { useGetGoodIssueHistoryQuery } from "@/redux/features/goods_issue.features";

export default function AssetHistory() {
    const {data}=useGetGoodIssueHistoryQuery(undefined)
    console.log(data)
    return <div>Asset History</div>;
}