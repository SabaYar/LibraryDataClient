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


export default function NewBook() {
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
            <input {...form.register("itemId")} placeholder="Item ID" />
            <p>{form.formState.errors.itemId?.message}</p>

            <input {...form.register("isbn")} placeholder="ISBN" />
            <p>{form.formState.errors.isbn?.message}</p>

            <input {...form.register("bookTitle")} placeholder="Book Title" />
            <p>{form.formState.errors.bookTitle?.message}</p>

            <input
              type="number"
              {...form.register("pageCount", { valueAsNumber: true })}
              placeholder="Page Count"
            />
            <p>{form.formState.errors.pageCount?.message}</p>

            <Controller
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Available?
                </label>
              )}
            />

            <input
              type="number"
              step="0.01"
              {...form.register("lateFeeUsd", { valueAsNumber: true })}
              placeholder="Late Fee (USD)"
            />
            <p>{form.formState.errors.lateFeeUsd?.message}</p>

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
