import { NextResponse } from "next/server"
import { CATALOG } from "@/data/products"
import { averageVector, cosineSimilarity, getCatalogEmbeddings, getProductEmbedding } from "@/lib/embeddings"
import { generateText } from "ai"

type Body = {
  likedIds: string[]
  limit?: number
}

export async function POST(req: Request) {
  const body = (await req.json()) as Body
  const likedIds = Array.isArray(body.likedIds) ? body.likedIds : []
  const limit = Math.max(1, Math.min(6, body.limit ?? 3))

  if (likedIds.length === 0) {
    return NextResponse.json({ recommendations: [] })
  }

  // Precompute catalog embeddings
  await getCatalogEmbeddings(CATALOG)

  const likedProducts = CATALOG.filter((p) => likedIds.includes(p.id))
  const likedVecs = await Promise.all(likedProducts.map(getProductEmbedding))
  const userProfile = averageVector(likedVecs)

  // Score all candidates except liked
  const candidates = CATALOG.filter((p) => !likedIds.includes(p.id))
  const scored = await Promise.all(
    candidates.map(async (p) => {
      const vec = await getProductEmbedding(p)
      return { product: p, score: cosineSimilarity(userProfile, vec) }
    }),
  )

  scored.sort((a, b) => b.score - a.score)
  const top = scored.slice(0, limit)

  // Generate short explanations per recommendation
  const explanations = await Promise.all(
    top.map(async ({ product }) => {
      // Keep prompt succinct; pass minimal context
      const prompt = [
        "Explain briefly (1-2 sentences) why this product is recommended based on the user's liked items.",
        "Focus on shared attributes like category, use-case, style, and functional features.",
        "",
        `Product: ${product.title}`,
        `Category: ${product.category}`,
        `Description: ${product.description}`,
      ].join("\n")

      const { text } = await generateText({
        model: "openai/gpt-5-mini",
        prompt,
      })
      return text.trim()
    }),
  )

  const recommendations = top.map((t, i) => ({
    product: t.product,
    score: t.score,
    explanation: explanations[i],
  }))

  // Basic logging for debugging in preview logs
  console.log(
    "[v0] Recommendations generated:",
    recommendations.map((r) => r.product.id),
  )

  return NextResponse.json({ recommendations })
}
