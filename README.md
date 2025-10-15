# E-commerce Product Recommender (Demo)

An interactive Next.js app that recommends products based on user likes using:
- Pretrained text embeddings for similarity (Vercel AI SDK)
- LLM-generated explanations for “Why this product?”

## Features
- Browse an initial product catalog and like items you enjoy
- Get recommendations computed via cosine similarity of embeddings
- Short, user-friendly LLM explanations per recommendation
- Clean UI with shadcn/ui, SWR-based fetching

## Tech
- Next.js App Router (Next.js runtime)
- Vercel AI SDK (`embed`, `generateText`)
- In-memory catalog (swap to a real DB like Supabase or Neon later)

## API
- `GET /api/products` — returns the catalog
- `POST /api/recommend` — body: `{ likedIds: string[], limit?: number }` → returns `{ recommendations: [{ product, score, explanation }] }`

## Notes
- Embeddings: `openai/text-embedding-3-small`
- Explanations: `openai/gpt-5-mini`
- The demo runs fully in v0 preview; persistence is in-memory.

## Demo Video
Add a short screen recording of the /recommender flow (catalog → like → recommend) here.
