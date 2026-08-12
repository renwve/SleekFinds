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
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Natural Pearl",
      dimensions: "42cm",
      era: "1970s",
    },
  },

  {
    id: "vintage-gold-watch",
    name: "Classic Gold Dress Watch",
    price: 1850,
    category: "Watches",
    condition: "Very Good",
    description:
      "A refined vintage dress watch with a slim profile and understated dial. Designed for collectors who appreciate quiet luxury and traditional watchmaking.",
    seller: "Julian Hart",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Gold-plated Steel",
      dimensions: "36mm Case",
      era: "1970s",
    },
  },

  {
    id: "mid-century-lounge-chair",
    name: "Mid-Century Leather Lounge Chair",
    price: 1650,
    category: "Furniture",
    condition: "Very Good",
    description:
      "A sculptural mid-century lounge chair with rich leather upholstery and a beautifully aged frame. An excellent statement piece for a refined interior.",
    seller: "Henry Cole",
    location: "Copenhagen, Denmark",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Leather & Teak",
      dimensions: "78cm × 82cm × 76cm",
      era: "1960s",
    },
  },

  {
    id: "vintage-leather-handbag",
    name: "Structured Vintage Leather Handbag",
    price: 780,
    category: "Bags",
    condition: "Excellent",
    description:
      "A beautifully structured leather handbag with a timeless silhouette, polished hardware, and a warm natural patina.",
    seller: "Isabelle Moreau",
    location: "Lyon, France",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Italian Leather",
      dimensions: "28cm × 22cm",
      era: "1980s",
    },
  },

  {
    id: "vintage-fountain-pen",
    name: "Sterling Silver Fountain Pen",
    price: 290,
    category: "Collectibles",
    condition: "Excellent",
    description:
      "A beautifully crafted vintage fountain pen with a polished sterling silver body and classic detailing. A wonderful addition to a writing collection.",
    seller: "Thomas Reed",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Sterling Silver",
      dimensions: "14cm",
      era: "1960s",
    },
  },

  {
    id: "vintage-silk-scarf",
    name: "French Silk Scarf",
    price: 240,
    category: "Fashion",
    condition: "Excellent",
    description:
      "A luxurious vintage silk scarf featuring an elegant pattern and soft hand-finished edges. A versatile collector's piece.",
    seller: "Camille Bernard",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1585488432137-8f5c8f2c8f6b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585488432137-8f5c8f2c8f6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601924928377-0b8a5d5e1f8f?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "100% Silk",
      dimensions: "90cm × 90cm",
      era: "1980s",
    },
  },

  {
    id: "vintage-wooden-desk",
    name: "Danish Teak Writing Desk",
    price: 1250,
    category: "Furniture",
    condition: "Very Good",
    description:
      "A clean-lined Danish teak writing desk with tapered legs and generous storage. Its understated design makes it an ideal workspace or collector's piece.",
    seller: "Oliver Jensen",
    location: "Aarhus, Denmark",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Teak Wood",
      dimensions: "120cm × 60cm × 74cm",
      era: "1960s",
    },
  },

  {
    id: "vintage-gold-bracelet",
    name: "Vintage Gold Link Bracelet",
    price: 1750,
    category: "Jewelry",
    condition: "Excellent",
    description:
      "A substantial vintage gold link bracelet with a softly polished finish and classic construction. Elegant worn alone or layered with a watch.",
    seller: "Nora Bennett",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "14k Gold",
      dimensions: "19cm",
      era: "1970s",
    },
  },

  {
    id: "vintage-wool-coat",
    name: "Tailored Camel Wool Coat",
    price: 640,
    category: "Fashion",
    condition: "Very Good",
    description:
      "A beautifully tailored camel wool coat with a classic silhouette and exceptional structure. A timeless wardrobe staple from another era.",
    seller: "Sophie Laurent",
    location: "Montreal, Canada",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Wool",
      dimensions: "Size 40",
      era: "1980s",
    },
  },

  {
    id: "vintage-ceramic-vase",
    name: "Handcrafted Mid-Century Ceramic Vase",
    price: 320,
    category: "Home",
    condition: "Excellent",
    description:
      "A sculptural ceramic vase with a distinctive organic shape and subtle earthy glaze. A beautiful example of mid-century studio pottery.",
    seller: "Emma Foster",
    location: "Vancouver, Canada",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Hand-thrown Ceramic",
      dimensions: "28cm × 18cm",
      era: "1960s",
    },
  },

  {
    id: "vintage-camera",
    name: "Classic 35mm Film Camera",
    price: 560,
    category: "Collectibles",
    condition: "Very Good",
    description:
      "A beautifully preserved 35mm film camera with a classic mechanical body and vintage lens. Ideal for collectors and photographers who appreciate analog craftsmanship.",
    seller: "Daniel Park",
    location: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Metal & Glass",
      dimensions: "14cm × 9cm",
      era: "1970s",
    },
  },

  {
    id: "vintage-leather-loafers",
    name: "Italian Leather Penny Loafers",
    price: 390,
    category: "Fashion",
    condition: "Very Good",
    description:
      "Classic Italian leather loafers with a beautifully developed patina and traditional penny-loafer construction.",
    seller: "Marco Rossi",
    location: "Milan, Italy",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Italian Leather",
      dimensions: "US 10",
      era: "1980s",
    },
  },

  {
    id: "vintage-silver-cufflinks",
    name: "Sterling Silver Cufflinks",
    price: 180,
    category: "Accessories",
    condition: "Excellent",
    description:
      "A pair of understated sterling silver cufflinks featuring traditional detailing and a beautifully aged finish.",
    seller: "Edward Miles",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Sterling Silver",
      dimensions: "18mm × 14mm",
      era: "1970s",
    },
  },

  {
    id: "vintage-record-player",
    name: "Mid-Century Record Player",
    price: 720,
    category: "Collectibles",
    condition: "Good",
    description:
      "A beautifully styled vintage record player with warm wood detailing and classic analog character. A striking addition to any listening room.",
    seller: "Alex Morgan",
    location: "Calgary, Canada",
    image:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Wood & Metal",
      dimensions: "45cm × 35cm",
      era: "1960s",
    },
  },

  {
    id: "vintage-chanel-bag",
    name: "Classic Quilted Leather Shoulder Bag",
    price: 2850,
    category: "Bags",
    condition: "Very Good",
    description:
      "An elegant quilted leather shoulder bag with a timeless silhouette, structured construction, and polished metal hardware.",
    seller: "Charlotte Dubois",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Quilted Leather",
      dimensions: "25cm × 17cm",
      era: "1990s",
    },
  },

  {
    id: "vintage-brass-lamp",
    name: "Brass Table Lamp",
    price: 460,
    category: "Home",
    condition: "Excellent",
    description:
      "A refined vintage brass table lamp with a sculptural base and warm presence. Perfect for a reading room, office, or bedside table.",
    seller: "Maya Thompson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Brass",
      dimensions: "42cm × 18cm",
      era: "1970s",
    },
  },

  {
    id: "vintage-silver-tray",
    name: "Art Deco Silver Serving Tray",
    price: 680,
    category: "Home",
    condition: "Very Good",
    description:
      "An elegant silver serving tray with Art Deco-inspired geometry and a beautifully aged surface. A sophisticated decorative or entertaining piece.",
    seller: "Lucien Moreau",
    location: "Brussels, Belgium",
    image:
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Sterling Silver",
      dimensions: "48cm × 30cm",
      era: "1930s",
    },
  },

  {
    id: "vintage-wool-rug",
    name: "Handwoven Persian Wool Rug",
    price: 1450,
    category: "Home",
    condition: "Very Good",
    description:
      "A richly patterned handwoven wool rug with subtle variations that speak to its age and craftsmanship. A grounding piece for a sophisticated interior.",
    seller: "Farah Rahimi",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
    details: {
      material: "Handwoven Wool",
      dimensions: "240cm × 170cm",
      era: "1970s",
    },
  },
];