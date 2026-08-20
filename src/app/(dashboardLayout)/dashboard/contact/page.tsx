import ContackPage from '@/components/Pages/ContactPage/ContackPage'
import { TQuerySearch } from '@/interface/query'
import { modifyQuery } from '@/utils/modifyQuery'


export default async function page({ searchParams }: TQuerySearch) {
    const query = await searchParams
    const { currentLimit, currentPage, currentSearch } = modifyQuery(query)
    return (
        <ContackPage
            limit={currentLimit}
            page={currentPage}
            search={currentSearch}
        />
    )
}
