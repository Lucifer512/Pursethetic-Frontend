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

type ProductFamily = "tote" | "shoulder" | "hobo" | "mini";

const defaultShipping = "Nationwide shipping. Free on orders over Rs. 4,000.";

const familyImages: Record<ProductFamily, string[]> = {
  tote: ["/web-product-category-tote-bag_jpg.jpg", "/cognac_tote.png", "/banner-1.jpg", "/banner-3.jpg"],
  shoulder: ["/web-product-category-shoulder-bag_jpg.jpg", "/banner-2.jpg", "/banner-3.jpg", "/banner-1.jpg"],
  hobo: ["/web-product-category-shoulder-bag_jpg.jpg", "/banner-1.jpg", "/banner-2.jpg", "/banner-3.jpg"],
  mini: ["/WhatsApp_Image_2026-01-26_at_1.02.19_AM.jpg", "/banner-3.jpg", "/banner-2.jpg", "/banner-1.jpg"],
};

type ProductSeed = Omit<Product, "image" | "secondaryImage" | "images"> & {
  family: ProductFamily;
  galleryRotation?: number;
};

function rotateImages(images: string[], rotation = 0) {
  const offset = rotation % images.length;
  return [...images.slice(offset), ...images.slice(0, offset)];
}

const productSeeds: ProductSeed[] = [
  {
    id: "hobo-brown",
    slug: "hobo-brown",
    name: "Hobo Brown",
    price: 2800,
    family: "hobo",
    galleryRotation: 0,
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
    family: "hobo",
    galleryRotation: 1,
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
    family: "mini",
    galleryRotation: 0,
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
    family: "tote",
    galleryRotation: 0,
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
    family: "shoulder",
    galleryRotation: 0,
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
    family: "shoulder",
    galleryRotation: 1,
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
    family: "hobo",
    galleryRotation: 2,
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
    family: "tote",
    galleryRotation: 1,
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
    family: "mini",
    galleryRotation: 1,
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
    family: "mini",
    galleryRotation: 2,
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
    family: "shoulder",
    galleryRotation: 2,
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
    family: "hobo",
    galleryRotation: 3,
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
    family: "shoulder",
    galleryRotation: 3,
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
    family: "shoulder",
    galleryRotation: 1,
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
    family: "shoulder",
    galleryRotation: 2,
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
    family: "mini",
    galleryRotation: 3,
    category: "Mini",
    description: "Mini fuzzy beige bag, cute and compact.",
    details: "Soft mini profile with compact dimensions and playful styling.",
    shipping: defaultShipping,
    care: "Brush gently to preserve texture.",
  },
];

export const products: Product[] = productSeeds.map(({ family, galleryRotation = 0, ...product }) => {
  const images = rotateImages(familyImages[family], galleryRotation);
  return {
    ...product,
    image: images[0],
    secondaryImage: images[1],
    images,
  };
});

export const featuredProducts = products.filter((product) => product.featured);

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
