import SingleReceivableAndPayablePage from '@/components/Pages/ReceivableAndPayablePage/SingleReceivableAndPayable/SingleReceivableAndPayablePage'
import { TParams } from '@/interface/query'


export default async function page(props: TParams) {
  const { id } = await props.params
  return (
    <div>
      <SingleReceivableAndPayablePage id={id} />
    </div>
  )
}
