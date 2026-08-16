import DocumentPage from "@/components/Pages/Docuemts/DocumentPage"
import CustomLoader from "@/components/Reusable/CustomLoader"
import { Suspense } from "react"

const Page =()=>{

    return (
        <Suspense fallback={<div><CustomLoader cls="h-[30vh]"/></div>}>
            <DocumentPage/>
        </Suspense >
    )
}

export default Page