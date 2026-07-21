// Deterministic mock data for the Vendly demo. No backend.

export const revenueData = [
  { d: "Mon", v: 3200, o: 24 },
  { d: "Tue", v: 4100, o: 31 },
  { d: "Wed", v: 3800, o: 28 },
  { d: "Thu", v: 5200, o: 42 },
  { d: "Fri", v: 6100, o: 51 },
  { d: "Sat", v: 7800, o: 63 },
  { d: "Sun", v: 8400, o: 68 },
];

export const kpis = [
  { label: "Revenue", value: "$38,612", delta: "+18.2%", positive: true },
  { label: "Orders", value: "307", delta: "+12.4%", positive: true },
  { label: "Visitors", value: "24,181", delta: "+8.7%", positive: true },
  { label: "Conversion", value: "3.42%", delta: "-0.4%", positive: false },
];

export const recentOrders = [
  { id: "V-10423", customer: "Amelia Ross", total: "$128.00", status: "Paid", when: "2m ago" },
  { id: "V-10422", customer: "Noah Patel", total: "$54.20", status: "Paid", when: "6m ago" },
  { id: "V-10421", customer: "Zara Kim", total: "$312.00", status: "Fulfilled", when: "18m ago" },
  { id: "V-10420", customer: "Diego Alvarez", total: "$76.40", status: "Refunded", when: "1h ago" },
  { id: "V-10419", customer: "Sana Ali", total: "$189.90", status: "Paid", when: "2h ago" },
];

export const aiInsights = [
  { title: "Reorder Ceramic Mug (Sand)", meta: "Projected to sell out in 4 days.", tag: "Inventory" },
  { title: "Raise price on Linen Tote", meta: "Elasticity supports +8% with <2% drop.", tag: "Pricing" },
  { title: "Bundle Candle + Match Set", meta: "Attach rate 34% — likely +$1.2k/mo.", tag: "Merchandising" },
];

export const products = [
  { id: 1, name: "Handwoven Linen Tote", price: "$68", stock: 42, sales: 214, img: "linen tote bag natural fibre studio product photo minimal beige background" },
  { id: 2, name: "Ceramic Mug — Sand", price: "$28", stock: 8, sales: 512, img: "sand colored ceramic mug matte finish minimalist product shot" },
  { id: 3, name: "Cedar & Vetiver Candle", price: "$42", stock: 61, sales: 187, img: "amber glass candle wooden wick minimal studio product photo" },
  { id: 4, name: "Brass Match Cloche", price: "$34", stock: 24, sales: 96, img: "brass match holder glass dome minimalist product still life" },
  { id: 5, name: "Terracotta Planter", price: "$52", stock: 33, sales: 141, img: "terracotta clay planter minimalist product photo neutral background" },
  { id: 6, name: "Wool Throw Blanket", price: "$128", stock: 12, sales: 78, img: "cream wool knit throw blanket folded product photo minimal" },
];

export const customers = [
  { name: "Amelia Ross", email: "amelia@ross.co", spend: "$1,204", orders: 12, since: "Feb 2025" },
  { name: "Noah Patel", email: "noah@studio.io", spend: "$948", orders: 9, since: "Apr 2025" },
  { name: "Zara Kim", email: "zara@k.design", spend: "$2,116", orders: 18, since: "Nov 2024" },
  { name: "Diego Alvarez", email: "diego@alvarez.mx", spend: "$412", orders: 4, since: "Jun 2025" },
  { name: "Sana Ali", email: "sana@ali.pk", spend: "$1,880", orders: 15, since: "Jan 2025" },
];

export const marketplaceStores = [
  { slug: "artisan-co", name: "Artisan & Co.", tagline: "Slow-made home goods", category: "Home", rating: 4.9, products: 24 },
  { slug: "north-brew", name: "North Brew", tagline: "Single-origin coffee, weekly", category: "Food", rating: 4.8, products: 12 },
  { slug: "lumen-studio", name: "Lumen Studio", tagline: "Objects for quiet rooms", category: "Design", rating: 4.9, products: 38 },
  { slug: "field-and-fern", name: "Field & Fern", tagline: "Botanicals, honestly grown", category: "Wellness", rating: 4.7, products: 19 },
  { slug: "atelier-nine", name: "Atelier Nine", tagline: "Small-batch leather", category: "Accessories", rating: 4.9, products: 22 },
  { slug: "salt-water", name: "Saltwater", tagline: "Ocean-inspired ceramics", category: "Home", rating: 4.8, products: 16 },
];
