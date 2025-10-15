// Server-side helpers for embeddings and similarity
// IMPORTANT: Do not use on the client.

import { embed } from "ai"
import type { Product } from "@/data/products"

// Simple in-memory cache for the demo
const catalogEmbeddingCache: Map<string, number[]> = new Map()

export function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb)
  return denom === 0 ? 0 : dot / denom
}

function productText(p: Product) {
  return `${p.title}\nCategory: ${p.category}\nDescription: ${p.description}`
}

export async function getProductEmbedding(p: Product): Promise<number[]> {
  const cached = catalogEmbeddingCache.get(p.id)
  if (cached) return cached

  const { embeddings } = await embed({
    model: "openai/text-embedding-3-small",
    value: productText(p),
  })

  const vec = embeddings as unknown as number[]
  catalogEmbeddingCache.set(p.id, vec)
  return vec
}

export async function getCatalogEmbeddings(catalog: Product[]) {
  const missing = catalog.filter((p) => !catalogEmbeddingCache.has(p.id))
  if (missing.length) {
    const { embeddings } = await embed({
      model: "openai/text-embedding-3-small",
      values: missing.map(productText),
    })
    for (let i = 0; i < missing.length; i++) {
      catalogEmbeddingCache.set(missing[i].id, embeddings[i] as unknown as number[])
    }
  }
  return catalog.map((p) => ({
    id: p.id,
    vector: catalogEmbeddingCache.get(p.id)!,
  }))
}

export function averageVector(vectors: number[][]): number[] {
  if (vectors.length === 0) return []
  const dim = vectors[0].length
  const out = new Array(dim).fill(0)
  for (const v of vectors) {
    for (let i = 0; i < dim; i++) out[i] += v[i]
  }
  for (let i = 0; i < dim; i++) out[i] /= vectors.length
  return out
}
