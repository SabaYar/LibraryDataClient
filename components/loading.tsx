import { PageContainer } from "@/components/page-container"
import { Spinner } from "@/components/ui/spinner"

export function Loading(){
  return (
    <PageContainer>
      <div className="flex align-text-bottom text-blue-500 text-4xl italic">
        <Spinner className="size-10 mr-4"/>Please Wait...
      </div>
    </PageContainer>
  )
}