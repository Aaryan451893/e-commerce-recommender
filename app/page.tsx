import Link from "next/link"

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">Welcome</h1>
      <p className="mt-2 text-muted-foreground">Try the interactive e-commerce recommender demo.</p>
      <div className="mt-4">
        <Link
          href="/recommender"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Open Recommender
        </Link>
      </div>
    </main>
  )
}
