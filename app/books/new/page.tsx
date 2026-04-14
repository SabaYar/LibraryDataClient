import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { booksSchema, BookFormData } from "@/lib/validation/booksSchema"
import { useMutation } from "@tanstack/react-query"
import { createBook } from "@/lib/api/books"

export default function AddBookForm() {
  const form = useForm<BookFormData>({resolver: zodResolver(booksSchema)})
  const mutation = useMutation({mutationFn: createBook})
  const onSubmit = (book: BookFormData) => {mutation.mutate(book)}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("itemId")} placeholder="Item ID" />
      <p>{form.formState.errors.itemId?.message}</p>

      <input {...form.register("isbn")} placeholder="ISBN" />
      <input {...form.register("bookTitle")} placeholder="Title" />

      <input
        type="number"
        {...form.register("pageCount", { valueAsNumber: true })}
      />

      <input
        type="number"
        {...form.register("lateFeeUsd", { valueAsNumber: true })}
      />

      <button type="submit">Add Book</button>
    </form>
  )
}
