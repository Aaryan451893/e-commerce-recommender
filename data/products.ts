export type Product = {
  id: string
  title: string
  category: string
  price: number
  description: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
}

export const CATALOG: Product[] = [
  {
    id: "p1",
    title: "Classic White Sneakers",
    category: "Footwear",
    price: 79.99,
    description: "Low-top everyday sneakers with breathable mesh and cushioned insoles for comfort.",
    imageAlt: "Classic white sneakers on a neutral background",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p2",
    title: "Trail Running Shoes",
    category: "Footwear",
    price: 129.0,
    description: "Rugged outsole with multi-directional lugs and reinforced toe protection for off-road runs.",
    imageAlt: "Trail running shoes with rugged outsole",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p3",
    title: "Athletic Performance Socks (3-Pack)",
    category: "Accessories",
    price: 18.5,
    description: "Moisture-wicking crew socks with arch support and reinforced heel and toe.",
    imageAlt: "Three pairs of athletic socks",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p4",
    title: "Lightweight Running Shorts",
    category: "Apparel",
    price: 34.99,
    description: "Quick-dry fabric, 5-inch inseam, and zip pocket to secure small essentials while running.",
    imageAlt: "Black running shorts on table",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p5",
    title: "Moisture-Wicking T-Shirt",
    category: "Apparel",
    price: 24.0,
    description: "Breathable, quick-drying tee ideal for workouts and hot weather.",
    imageAlt: "Gray moisture-wicking t-shirt",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p6",
    title: "Hiking Backpack 28L",
    category: "Bags",
    price: 89.0,
    description: "Compact daypack with ventilated back panel, hydration sleeve, and multiple compartments.",
    imageAlt: "Hiking backpack in outdoor setting",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p7",
    title: "Insulated Water Bottle 750ml",
    category: "Accessories",
    price: 29.99,
    description: "Double-wall stainless steel keeps drinks cold for 24 hours or hot for 12.",
    imageAlt: "Insulated stainless steel water bottle",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p8",
    title: "Yoga Mat Pro 6mm",
    category: "Fitness",
    price: 45.0,
    description: "High-density, non-slip surface provides joint support for yoga and pilates sessions.",
    imageAlt: "Rolled yoga mat on wooden floor",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p9",
    title: "Wireless Sport Earbuds",
    category: "Electronics",
    price: 99.0,
    description: "Sweat-resistant earbuds with secure fit wings and 8-hour battery life.",
    imageAlt: "Wireless sport earbuds on a desk",
    imageWidth: 640,
    imageHeight: 480,
  },
  {
    id: "p10",
    title: "Fitness Smartwatch",
    category: "Electronics",
    price: 199.0,
    description: "Tracks heart rate, sleep, GPS runs, and features a bright AMOLED display.",
    imageAlt: "Fitness smartwatch with AMOLED display",
    imageWidth: 640,
    imageHeight: 480,
  },
]
