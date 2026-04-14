"use client"

import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"
import { editBook, fetchBook } from "@/lib/api/books"
import { TableIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { BookFormData, booksSchema } from "@/lib/validation/booksSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { APIError } from "@/lib/api/types"
import { AxiosError } from "axios"
import { z } from "zod"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"

export default function EditBookDetails() {
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id as string),
  })
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<
    z.input<typeof booksSchema>,
    unknown,
    z.output<typeof booksSchema>
  >({
    resolver: zodResolver(booksSchema),
    defaultValues: {
      itemId: "",
      isbn: "",
      bookTitle: "",
      pageCount: 1,
      isAvailable: false,
      lateFeeUsd: 0,
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        itemId: data.itemId,
        isbn: data.isbn,
        bookTitle: data.bookTitle,
        pageCount: data.pageCount,
        isAvailable: data.isAvailable,
        lateFeeUsd: data.lateFeeUsd,
      })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: (formData: z.output<typeof booksSchema>) =>
      editBook(id as string, formData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["books"] })
      void queryClient.invalidateQueries({ queryKey: ["book", id] })
      router.push(`/`)
    },
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch} />

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Edit Book</h1>
      <Card className="w-full p-6">
        <form
          onSubmit={form.handleSubmit((data) =>
            mutation.mutate(data as BookFormData)
          )}
        >
          <CardContent className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium">ISBN</label>
              <input
                {...form.register("isbn")}
                className="rounded border p-2"
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.isbn?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Book Title</label>
              <input
                {...form.register("bookTitle")}
                className="rounded border p-2"
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.bookTitle?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Page Count</label>
              <input
                type="number"
                {...form.register("pageCount", { valueAsNumber: true })}
                className="rounded border p-2"
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.pageCount?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Availability</label>
              <Controller
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Late Fee (USD)</label>
              <input
                type="number"
                step="0.01"
                {...form.register("lateFeeUsd", { valueAsNumber: true })}
                className="rounded border p-2"
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.lateFeeUsd?.message}
              </p>
            </div>

            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Editing..." : "Edit Book"}
            </button>

            {mutation.isError && (
              <p className="text-red-500">
                {
                  (mutation.error as AxiosError<APIError>)?.response?.data
                    ?.message
                }
              </p>
            )}
          </CardContent>
        </form>
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
