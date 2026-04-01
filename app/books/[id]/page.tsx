'use client';

import { Button } from "@/components/ui/button"
import React from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchBook } from "@/lib/api/books"
import { TableIcon } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"

export default function BookDetails() {
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id as string),
  })

  console.log('Book details data:', data)

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch}/>

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Book Details</h1>
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-orange-500">
            {data?.bookTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            <span className="text-xl font-bold">ISBN:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.isbn}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Page Count:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.pageCount.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Is Available:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.isAvailable ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Late Fee (USD):</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.lateFeeUsd.toLocaleString()}
            </span>
          </p>
        </CardContent>
      </Card>
      <Button className="mt-2" asChild>
        <Link href="/">
          <TableIcon />
          List Books
        </Link>
      </Button>
    </PageContainer>
  )
}