"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function ProductCard({
  product,
  liked,
  onToggleLike,
}: {
  product: Product
  liked: boolean
  onToggleLike: () => void
}) {
  const { title, description, category, price, imageAlt, imageWidth, imageHeight } = product
  return (
    <Card className="overflow-hidden">
      <img
        src={`/generic-placeholder-icon.png?height=${imageHeight}&width=${imageWidth}&query=${encodeURIComponent(
          `${title} ${category}`,
        )}`}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="w-full h-auto"
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-xs text-muted-foreground">{category}</div>
          </div>
          <div className="text-sm font-semibold">${price.toFixed(2)}</div>
        </div>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">{description}</p>

        <div className="mt-3">
          <Button
            variant={liked ? "secondary" : "default"}
            onClick={onToggleLike}
            aria-pressed={liked}
            aria-label={liked ? "Unlike product" : "Like product"}
            className="w-full"
          >
            {liked ? "Liked ✓" : "Like"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
