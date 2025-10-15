"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ProductCard from "./product-card"
import { cn } from "@/lib/utils"

type Product = {
  id: string
  title: string
  category: string
  price: number
  description: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
}

type Recommendation = {
  product: Product
  score: number
  explanation: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

async function recommend(url: string, { arg }: { arg: { likedIds: string[]; limit?: number } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  })
  if (!res.ok) throw new Error("Failed to fetch recommendations")
  return res.json() as Promise<{ recommendations: Recommendation[] }>
}

export default function RecommenderClient() {
  const { data: catalogData } = useSWR<{ products: Product[] }>("/api/products", fetcher)
  const products = catalogData?.products || []

  const [likedIds, setLikedIds] = useState<string[]>([])

  const { data: recData, trigger, isMutating } = useSWRMutation("/api/recommend", recommend)

  const toggleLike = (id: string) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const likedSet = useMemo(() => new Set(likedIds), [likedIds])

  const onRecommend = () => {
    if (likedIds.length === 0) return
    trigger({ likedIds, limit: 3 })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} liked={likedSet.has(p.id)} onToggleLike={() => toggleLike(p.id)} />
          ))}
        </div>
      </section>

      <aside className="lg:col-span-1">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Liked items</div>
                <div className="text-lg font-medium">{likedIds.length}</div>
              </div>
              <Button
                variant="default"
                className={cn("rounded-md")}
                onClick={onRecommend}
                disabled={likedIds.length === 0 || isMutating}
              >
                {isMutating ? "Finding..." : "Get Recommendations"}
              </Button>
            </div>

            <Separator className="my-4" />

            {likedIds.length === 0 ? (
              <p className="text-sm text-muted-foreground">Like a few products to get tailored recommendations.</p>
            ) : (
              <div className="space-y-3">
                <div className="text-sm font-medium">Recommendations</div>
                {recData?.recommendations?.length ? (
                  recData.recommendations.map((r) => (
                    <div key={r.product.id} className="rounded-md border p-3 bg-card text-card-foreground">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.product.title}</div>
                        <div className="text-xs text-muted-foreground">Similarity {(r.score * 100).toFixed(0)}%</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.product.category} • ${r.product.price.toFixed(2)}
                      </div>
                      <p className="mt-2 text-sm">{r.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Click “Get Recommendations” to see suggestions.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
