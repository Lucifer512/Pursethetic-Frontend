export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  images: string[];
  category: string;
  description: string;
  details: string;
  shipping: string;
  care: string;
  featured?: boolean;
};

const defaultShipping = "Nationwide shipping. Free on orders over Rs. 4,000.";

export const products: Product[] = [
  {
    id: "hobo-brown",
    slug: "hobo-brown",
    name: "Hobo Brown",
    price: 2800,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8740.jpg?v=1769348150&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8740.jpg?v=1769348150&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8740.jpg?v=1769348150&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8740.jpg?v=1769348150&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8740.jpg?v=1769348150&width=360"
    ],
    category: "Hobo",
    description: "A classic brown hobo bag, perfect for everyday style.",
    details: "Soft-structured hobo silhouette with everyday capacity and easy shoulder carry.",
    shipping: defaultShipping,
    care: "Wipe gently with a damp cloth. Store in a dust bag when not in use.",
    featured: true,
  },
  {
    id: "hobo-green",
    slug: "hobo-green",
    name: "Hobo Green",
    price: 2800,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_1431_JPG.jpg?v=1772029584&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_1431_JPG.jpg?v=1772029584&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_1431_JPG.jpg?v=1772029584&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1431_JPG.jpg?v=1772029584&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1431_JPG.jpg?v=1772029584&width=360"
    ],
    category: "Hobo",
    description: "A stylish green hobo bag for a fresh look.",
    details: "Relaxed shape with premium finish and a modern, minimal profile.",
    shipping: defaultShipping,
    care: "Wipe gently with a damp cloth. Avoid prolonged direct sunlight.",
    featured: true,
  },
  {
    id: "fuzzy-mini-green",
    slug: "fuzzy-mini-green",
    name: "Fuzzy Mini Green",
    price: 1400,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8768.jpg?v=1769350301&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8768.jpg?v=1769350301&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8768.jpg?v=1769350301&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8768.jpg?v=1769350301&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8768.jpg?v=1769350301&width=360"
    ],
    category: "Mini",
    description: "Mini fuzzy green bag, cute and compact.",
    details: "Compact mini shape designed for light carry and statement styling.",
    shipping: defaultShipping,
    care: "Use a soft dry cloth or lint roller to keep texture fresh.",
    featured: true,
  },
  {
    id: "mono-tote-beige",
    slug: "mono-tote-beige",
    name: "Mono Tote Beige",
    price: 1750,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8737.jpg?v=1769347524&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8737.jpg?v=1769347524&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8737.jpg?v=1769347524&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8737.jpg?v=1769347524&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8737.jpg?v=1769347524&width=360"
    ],
    category: "Tote",
    description: "Beige mono tote, elegant and spacious.",
    details: "Clean-lined tote profile with generous space for daily essentials.",
    shipping: defaultShipping,
    care: "Wipe gently with a damp cloth. Store upright to keep structure.",
  },
  {
    id: "royal-red",
    slug: "royal-red",
    name: "Royal Red",
    price: 1850,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8746.jpg?v=1769349107&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8746.jpg?v=1769349107&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8746.jpg?v=1769349107&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8746.jpg?v=1769349107&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8746.jpg?v=1769349107&width=360"
    ],
    category: "Shoulder",
    description: "Royal red bag for a bold statement.",
    details: "Bold colorway with compact silhouette for elevated day-to-night wear.",
    shipping: defaultShipping,
    care: "Avoid dark denim rub and moisture exposure.",
  },
  {
    id: "nexus-rainbow",
    slug: "nexus-rainbow",
    name: "Nexus Rainbow",
    price: 2700,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8748.jpg?v=1769356371&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8748.jpg?v=1769356371&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8748.jpg?v=1769356371&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8748.jpg?v=1769356371&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8748.jpg?v=1769356371&width=360"
    ],
    category: "Shoulder",
    description: "Nexus rainbow bag, colorful and unique.",
    details: "Distinctive statement finish with polished structure and practical size.",
    shipping: defaultShipping,
    care: "Store away from abrasive surfaces to preserve finish.",
  },
  {
    id: "hobo-pink",
    slug: "hobo-pink",
    name: "Hobo Pink",
    price: 2800,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_1429_JPG.jpg?v=1772030643&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_1429_JPG.jpg?v=1772030643&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_1429_JPG.jpg?v=1772030643&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1429_JPG.jpg?v=1772030643&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1429_JPG.jpg?v=1772030643&width=360"
    ],
    category: "Hobo",
    description: "Chic pink hobo bag for a feminine touch.",
    details: "Soft hobo profile with graceful drape and contemporary tone.",
    shipping: defaultShipping,
    care: "Clean gently with microfiber cloth.",
  },
  {
    id: "essential-cognac-tote",
    slug: "essential-cognac-tote",
    name: "Cognac Tote Brown",
    price: 2500,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8752.jpg?v=1769345939&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8752.jpg?v=1769345939&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8752.jpg?v=1769345939&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8752.jpg?v=1769345939&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8752.jpg?v=1769345939&width=360"
    ],
    category: "Tote",
    description: "Cognac brown tote, versatile and durable.",
    details: "Structured tote body with rich tone and roomy interior.",
    shipping: defaultShipping,
    care: "Use neutral conditioner occasionally to maintain finish.",
  },
  {
    id: "fuzzy-mini-brown",
    slug: "fuzzy-mini-brown",
    name: "Fuzzy Mini Brown",
    price: 1400,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8766.jpg?v=1769350569&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8766.jpg?v=1769350569&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8766.jpg?v=1769350569&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8766.jpg?v=1769350569&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8766.jpg?v=1769350569&width=360"
    ],
    category: "Mini",
    description: "Mini fuzzy brown bag, cute and compact.",
    details: "Small-size plush design with lightweight carry.",
    shipping: defaultShipping,
    care: "Use a soft dry cloth and avoid heavy friction.",
  },
  {
    id: "nova-black",
    slug: "nova-black",
    name: "Nova Black",
    price: 1500,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8744.jpg?v=1769348771&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8744.jpg?v=1769348771&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8744.jpg?v=1769348771&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8744.jpg?v=1769348771&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8744.jpg?v=1769348771&width=360"
    ],
    category: "Mini",
    description: "Nova black bag, classic and timeless.",
    details: "Compact modern profile with clean hardware-free finish.",
    shipping: defaultShipping,
    care: "Wipe with damp cloth and air dry naturally.",
  },
  {
    id: "halo-pink",
    slug: "halo-pink",
    name: "Halo Pink",
    price: 1700,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_1425_JPG.jpg?v=1772030703&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_1425_JPG.jpg?v=1772030703&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_1425_JPG.jpg?v=1772030703&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1425_JPG.jpg?v=1772030703&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1425_JPG.jpg?v=1772030703&width=360"
    ],
    category: "Shoulder",
    description: "Halo pink bag, playful and trendy.",
    details: "Chic shoulder silhouette designed for daily styling flexibility.",
    shipping: defaultShipping,
    care: "Keep away from rough surfaces and clean gently.",
  },
  {
    id: "hobo-beige",
    slug: "hobo-beige",
    name: "Hobo Beige",
    price: 2800,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_1443_JPG.jpg?v=1772030895&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_1443_JPG.jpg?v=1772030895&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_1443_JPG.jpg?v=1772030895&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1443_JPG.jpg?v=1772030895&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_1443_JPG.jpg?v=1772030895&width=360"
    ],
    category: "Hobo",
    description: "Beige hobo bag, neutral and stylish.",
    details: "Versatile neutral hobo with practical day-size capacity.",
    shipping: defaultShipping,
    care: "Store in dust bag and avoid moisture.",
  },
  {
    id: "velvet-charm",
    slug: "velvet-charm",
    name: "Urban Pleat Purple",
    price: 1600,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8765.jpg?v=1769331797&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8765.jpg?v=1769331797&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8765.jpg?v=1769331797&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8765.jpg?v=1769331797&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8765.jpg?v=1769331797&width=360"
    ],
    category: "Shoulder",
    description: "Urban pleat purple bag, modern and chic.",
    details: "Pleated texture with compact shape for standout styling.",
    shipping: defaultShipping,
    care: "Clean with soft cloth and keep away from heat.",
  },
  {
    id: "roselle-purple",
    slug: "roselle-purple",
    name: "Roselle Maroon",
    price: 1900,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG-4887.png?v=1773161222&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG-4887.png?v=1773161222&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG-4887.png?v=1773161222&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG-4887.png?v=1773161222&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG-4887.png?v=1773161222&width=360"
    ],
    category: "Shoulder",
    description: "Roselle maroon bag, elegant and rich.",
    details: "Refined maroon colorway with structured silhouette.",
    shipping: defaultShipping,
    care: "Avoid color transfer and store in a cool, dry place.",
  },
  {
    id: "aura-lace-silver",
    slug: "aura-lace-silver",
    name: "Aura Lace Silver",
    price: 2700,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8750.jpg?v=1769356627&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8750.jpg?v=1769356627&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8750.jpg?v=1769356627&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8750.jpg?v=1769356627&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8750.jpg?v=1769356627&width=360"
    ],
    category: "Shoulder",
    description: "Aura lace silver bag, sophisticated and unique.",
    details: "Elegant finish with premium look for formal and festive wear.",
    shipping: defaultShipping,
    care: "Handle with care and wipe gently after each use.",
  },
  {
    id: "fuzzy-mini-beige",
    slug: "fuzzy-mini-beige",
    name: "Fuzzy Mini Beige",
    price: 1400,
    image: "https://www.pursethetic.com/cdn/shop/files/IMG_8767.jpg?v=1769351361&width=360",
    secondaryImage: "https://www.pursethetic.com/cdn/shop/files/IMG_8767.jpg?v=1769351361&width=800",
    images: [
      "https://www.pursethetic.com/cdn/shop/files/IMG_8767.jpg?v=1769351361&width=800",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8767.jpg?v=1769351361&width=600",
      "https://www.pursethetic.com/cdn/shop/files/IMG_8767.jpg?v=1769351361&width=360"
    ],
    category: "Mini",
    description: "Mini fuzzy beige bag, cute and compact.",
    details: "Soft mini profile with compact dimensions and playful styling.",
    shipping: defaultShipping,
    care: "Brush gently to preserve texture.",
  }
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
