import AssetsPage from '@/components/Pages/AssetsPage/AssetsPage'
import { TQuerySearch } from '@/interface/query'
import { modifyQuery } from '@/utils/modifyQuery'


export default async function page({ searchParams }: TQuerySearch) {
  const query = await searchParams
  const { currentLimit, currentPage } = modifyQuery(query)
  return (
    <div>
      <AssetsPage
        limit={currentLimit}
        page={currentPage}
      />
    </div>
  )
}
