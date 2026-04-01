import axios from "axios"
import { Book } from "@/lib/api/types"

export async function fetchBooks(): Promise<Book[]> {
  const res = await axios.get<Book[]>("http://localhost:8080/api/books")
  return res.data
}

export async function fetchBook(id: string): Promise<Book> {
  const res = await axios.get<Book>(`http://localhost:8080/api/books/${id}`)
  return res.data
}