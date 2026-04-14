'use client';

import { Button } from "@/components/ui/button"
import React from "react"
import { createBook } from "@/lib/api/books"
import { TableIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { BookFormData, booksSchema } from "@/lib/validation/booksSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { APIError } from "@/lib/api/types"
import { AxiosError } from "axios"
import { z } from "zod"


export default function NewBookDetails() {
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
    const mutation = useMutation({
      mutationFn: createBook,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["books"] })
        form.reset()
        router.push("/")
      },
    })

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Add Book</h1>
      <Card className="w-full p-6">
        <form
          onSubmit={form.handleSubmit((data) =>
            mutation.mutate(data as BookFormData)
          )}
        >
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Item ID</label>
              <input
                {...form.register("itemId")}
                className="rounded border p-2"
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.itemId?.message}
              </p>
            </div>

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
              {mutation.isPending ? "Creating..." : "Create Book"}
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
