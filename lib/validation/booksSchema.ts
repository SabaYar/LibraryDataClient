import { z } from "zod"

export const booksSchema = z.object({
  itemId: z.string().min(1, "Item ID required"),
  isbn: z.string().min(1, "ISBN required"),
  bookTitle: z.string().min(1, "Book title required"),
  pageCount: z.number().min(1, "Page count should be 1 page minimum"),
  isAvailable: z.boolean(),
  lateFeeUsd: z.number().min(0, "Late fee must be $0 USD or higher"),
})

export type BookFormData = z.infer<typeof booksSchema>
