import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RecommenderClient from "@/components/recommender-client"

export default function RecommenderPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-balance">E-commerce Product Recommender</h1>
        <p className="text-muted-foreground mt-2">
          Like products you enjoy. We’ll recommend similar items and explain why.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Product Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense>
              <RecommenderClient />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">How it works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Browse the catalog and like items you’re into.</li>
              <li>We compute similarity using pretrained text embeddings of each product.</li>
              <li>An LLM generates a short explanation for each recommendation.</li>
            </ol>
            <p className="mt-4">
              This demo uses AI SDK for both embeddings and text. Swap the in-memory catalog for a real database any
              time.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
