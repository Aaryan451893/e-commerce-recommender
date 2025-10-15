import { NextResponse } from "next/server"
import { CATALOG } from "@/data/products"

export async function GET() {
  return NextResponse.json({ products: CATALOG })
}
