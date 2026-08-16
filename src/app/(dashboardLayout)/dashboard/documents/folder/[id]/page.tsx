import SingleFolderPage from '@/components/Pages/Docuemts/SingleFolder/SingleFolderPage'
import { TParams } from '@/interface/query'
export default async function page(props: TParams) {
  const { id } = await props.params
  return (
    <div>
      <SingleFolderPage id={id} />
    </div>
  )
}
