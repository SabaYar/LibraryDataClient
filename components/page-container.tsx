export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="justify-top flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 bg-white px-16 py-16 sm:items-start dark:bg-black">
        {children}
      </div>
    </div>
  )
}
