'use client';

import React from "react"
import { fetchBooks } from "@/lib/api/books"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Book } from "@/lib/api/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"

export default function BookList() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch} />

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Book List</h1>
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Page Count</TableHead>
                <TableHead>ISBN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((book: Book) => (
                <TableRow key={book.itemId}>
                  <TableCell>
                    <Button variant="link" asChild>
                      <Link href={`/books/${book.itemId}`}>{book.bookTitle}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>{book.pageCount.toLocaleString()}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  )
}

