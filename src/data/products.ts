export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  image: string;
  gallery: string[];
  details: {
    material: string;
    dimensions: string;
    era: string;
  };
}

export const products: Product[] = [
  {
    id: "vintage-cartier-tank",
    name: "Vintage Cartier Tank Louis 1970s",
    price: 8400,
    category: "Watches",
    condition: "Excellent",
    description:
      "A quintessential example of Parisian elegance from the 1970s. This vintage Cartier Tank features a beautifully proportioned rectangular case, classic Roman numerals, and an original leather strap. Carefully preserved and ready to become part of your collection.",
    seller: "Diana Wu",
    location: "Paris, France",
    image: "/images/cartier-main.jpg",
    gallery: [
      "/images/cartier-main.jpg",
      "/images/cartier-2.jpg",
      "/images/cartier-3.jpg",
      "/images/cartier-4.jpg",
    ],
    details: {
      material: "18k Gold",
      dimensions: "23mm × 30mm",
      era: "1970s",
    },
  },
  {
    id: "vintage-leather-briefcase",
    name: "Vintage Leather Briefcase",
    price: 420,
    category: "Accessories",
    condition: "Very Good",
    description:
      "A beautifully aged leather briefcase with a timeless silhouette. The natural patina gives this piece its distinctive character while remaining practical for everyday use.",
    seller: "Marcus Lee",
    location: "Toronto, Canada",
    image: "/images/briefcase.jpg",
    gallery: [
      "/images/briefcase.jpg",
      "/images/briefcase-2.jpg",
    ],
    details: {
      material: "Full-grain Leather",
      dimensions: "42cm × 30cm",
      era: "1980s",
    },
  },
  {
    id: "vintage-emerald-ring",
    name: "Vintage Emerald Signet",
    price: 1200,
    category: "Jewelry",
    condition: "Excellent",
    description:
      "A distinctive vintage signet ring featuring a deep green emerald centerpiece and a classic gold setting. A statement piece with understated character.",
    seller: "Amelia Chen",
    location: "Vancouver, Canada",
    image: "/images/emerald-ring.jpg",
    gallery: [
      "/images/emerald-ring.jpg",
      "/images/emerald-ring-2.jpg",
    ],
    details: {
      material: "Gold & Emerald",
      dimensions: "18mm × 15mm",
      era: "1960s",
    },
  },
  {
    id: "vintage-sunglasses",
    name: "1960s Gold Frame Sunglasses",
    price: 350,
    category: "Accessories",
    condition: "Good",
    description:
      "Elegant vintage sunglasses with a delicate gold-tone frame and softly rounded lenses. A classic piece inspired by mid-century design.",
    seller: "Sofia Martin",
    location: "Montreal, Canada",
    image: "/images/sunglasses.jpg",
    gallery: [
      "/images/sunglasses.jpg",
      "/images/sunglasses-2.jpg",
    ],
    details: {
      material: "Metal",
      dimensions: "52mm × 45mm",
      era: "1960s",
    },
  },
  {
    id: "vintage-pearl-necklace",
    name: "Natural Pearl Strand",
    price: 2400,
    category: "Jewelry",
    condition: "Excellent",
    description:
      "A refined strand of natural pearls with subtle variation in shape and tone. Elegant enough for formal occasions while remaining timeless enough for everyday wear.",
    seller: "Claire Laurent",
    location: "Paris, France",
    image: "/images/pearls.jpg",
    gallery: [
      "/images/pearls.jpg",
      "/images/pearls-2.jpg",
    ],
    details: {
      material: "Natural Pearl",
      dimensions: "42cm",
      era: "1970s",
    },
  },
];