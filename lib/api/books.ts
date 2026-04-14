import axios from "axios"
import { Book } from "@/lib/api/types"
import { BookFormData } from "@/lib/validation/booksSchema"

export async function fetchBooks(): Promise<Book[]> {
  const res = await axios.get<Book[]>("http://localhost:8080/api/books")
  return res.data
}

export async function fetchBook(id: string): Promise<Book> {
  const res = await axios.get<Book>(`http://localhost:8080/api/books/${id}`)
  return res.data
}

export async function createBook(book: BookFormData) {
  const res = await axios.post("http://localhost:8080/api/books", book)
  return res.data
}

export async function deleteBook(id: string) {
  await axios.delete(`http://localhost:8080/api/books/${id}`)
}

export async function editBook(id: string, book: BookFormData) {
  const res = await axios.put(`http://localhost:8080/api/books/${id}`, book)
  return res.data
}