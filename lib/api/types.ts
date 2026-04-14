export interface Book {
  itemId: string
  isbn: string
  bookTitle: string
  pageCount: number
  isAvailable: boolean
  lateFeeUsd: number
}

export type APIError = {
  status: number
  error: string
  message: string
}
