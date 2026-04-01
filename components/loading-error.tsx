import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { RedoIcon } from "lucide-react"

type ErrorProps = {
  message: string
  retry?: () => void
}

export function LoadingError({ message, retry }: ErrorProps) {
  return (
    <PageContainer>
      <p className="text-4xl text-red-500">Error:</p>
      <p className="ml-4 text-3xl italic">{message}</p>
      {retry && (
        <p>
          <Button
            onClick={retry}
            variant="secondary"
            className="p-4 text-xl text-blue-600"
          >
            <RedoIcon />
            Retry
          </Button>
        </p>
      )}
    </PageContainer>
  )
}
