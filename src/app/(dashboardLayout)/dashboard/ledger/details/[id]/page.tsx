import LedgerDetailsPage from "@/components/Pages/LedgerPage/LedgerDetailsPage";
import { TParams, TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({
    params,
    searchParams,
}: TParams & TQuerySearch) => {
    const { id } = await params;

    const query = await searchParams;

    const {
        currentLimit,
        currentPage,
    } = modifyQuery(query);

    return (
        <LedgerDetailsPage
            id={id}
            params={
                {
                    limit: currentLimit,
                    page: currentPage,
                }
            }
        />
    );
};

export default Page;