
import { BrandAsset } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const CLIENTS = [
  "Vogue Fashion", "Urban Soul", "Luxe Living", "Golden Hour", "Velvet & Co.",
  "Modern Aesthetics", "Canvas Studio", "Eclipse Wear", "Pure Elegance", "Noir Style",
  "Aura Beauty", "Highline Apparel", "Botanic Scents", "Summit Gear", "Opulent"
];

// ==================================================================================
// 🔧 USER IMAGE CONFIGURATION
// ==================================================================================

// --- HERO SECTION SCROLLING IMAGES ---
export const HERO_IMAGES_COL_1 = [
  { src: "/Hero-section-1/A_luxury_closeup_2k_202601032000.jpeg", label: "Celestial Shine Collection" },
  { src: "/Hero-section-1/Urban.png", label: "Urban Collection" },
  { src: "/Hero-section-1/lifestyle.png", label: "Lifestyle Series" },
  { src: "/Hero-section-1/Pure.png", label: "Pure Classic" },
  { src: "/Hero-section-1/Active.png", label: "Active Drift" },
  { src: "/Hero-section-1/Resort.png", label: "Resort Wear" }
];

export const HERO_IMAGES_COL_2 = [
  { src: "/Hero-section-2/Duo.png", label: "Classic Duo" },
  { src: "/Hero-section-2/IMG-20260219-WA0012.jpg", label: "Studio Light" },
  { src: "/Hero-section-2/Berry.png", label: "Berry Bloom" },
  { src: "/Hero-section-2/Tech.png", label: "Daily Tech" },
  { src: "/Hero-section-2/Aura.png", label: "Golden Aura" },
  { src: "/Hero-section-2/Runway.png", label: "Runway" }
];

export const ASSETS: BrandAsset[] = [
  // ==================================================================================
  // MODULE: VISUALS (Flatlay to Model)
  // Structure: 1 Featured Item (Before/After) + 6 Grid Items (Categories)
  // ==================================================================================

  // --- FEATURED: BEFORE / AFTER SLIDER ---
  {
    id: 'v-g1', // Featured ID
    module: 'visuals',
    subCategory: 'garments',
    style: 'lifestyle',
    title: 'Urban Explorer Jacket',
    description: 'Men\'s casual jacket transformed from a studio hanger shot to a lifestyle street context with AI-generated lighting and model.',
    imageUrl: '/Visuals/Blazer main/1.png.jpg', // Man in Jacket (Output)
    inputImageUrl: '/Visuals/Blazer main/0.jpg', // Jacket on Hanger (Input)
  },

  // --- 1. MEN PRODUCT (1 Input, 3 Outputs) ---
  {
    id: 'v-men-1',
    module: 'visuals',
    subCategory: 'garments',
    style: 'studio',
    title: 'Classic Menswear',
    description: 'Tailored suit visualization from flatlay to executive studio setting.',
    imageUrl: '/Visuals/Men/Cover.jpg', // Man in Suit
    inputImageUrl: '/Visuals/Men/0.jpg', // Suit on Hanger
    outputVariations: [
      '/Visuals/Men/4.jpg',
      '/Visuals/Men/1.jpg',
      '/Visuals/Men/3.jpg'
    ]
  },

  // --- 2. FEMALE PRODUCTS (1 Input, 3 Outputs) ---
  {
    id: 'v-fem-1',
    module: 'visuals',
    subCategory: 'garments',
    style: 'lifestyle',
    title: 'Western Femme Trendz',
    description: 'Floral dress placed in varying sun-drenched lifestyle settings.',
    imageUrl: '/Visuals/Female/Cover.jpg', // Woman in dress
    inputImageUrl: '/Visuals/Female/0.jpg', // Dress on hanger
    outputVariations: [
      '/Visuals/Female/1.jpg',
      '/Visuals/Female/2.jpg',
      '/Visuals/Female/3.jpg'
    ]
  },

  // --- 3. FOOTWEAR (1 Input, 3 Outputs) ---
  {
    id: 'v-foot-1',
    module: 'visuals',
    subCategory: 'footwear',
    style: 'studio',
    title: 'Crafted Footwear',
    description: 'Product shot transformation into dynamic athletic context.',
    imageUrl: '/Visuals/Footwear/Cover.png', // Sneakers Running
    inputImageUrl: '/Visuals/Footwear/0.jpg', // Sneaker Product Shot
    outputVariations: [
      '/Visuals/Footwear/1.jpg',
      '/Visuals/Footwear/2.jpg',
      '/Visuals/Footwear/3.jpg'
    ]
  },

  // --- 4. ACCESSORIES (1 Input, 3 Outputs) ---
  {
    id: 'v-acc-1',
    module: 'visuals',
    subCategory: 'accessories',
    style: 'lifestyle',
    title: 'Fine Accessories',
    description: 'Handbag visualization in luxury cafe and street environments.',
    imageUrl: '/Visuals/Bag/Cover.png', // Bag Lifestyle
    inputImageUrl: '/Visuals/Bag/0.jpg', // Bag Product Shot
    outputVariations: [
      '/Visuals/Bag/1.jpg',
      '/Visuals/Bag/2.jpg',
      '/Visuals/Bag/3.jpg'
    ]
  },

  // --- 5. COSMETICS (1 Input, 3 Outputs) ---
  {
    id: 'v-cos-1',
    module: 'visuals',
    subCategory: 'cosmetics',
    style: 'studio',
    title: 'Beauty Essentials',
    description: 'High-end cosmetic product styling with water and botanical elements.',
    imageUrl: '/Visuals/Bodywash/Cover.jpg', // Cosmetics Nature
    inputImageUrl: '/Visuals/Bodywash/0 (2).jpg', // Bottle Product Shot
    outputVariations: [
      '/Visuals/Bodywash/1.jpg',
      '/Visuals/Bodywash/3.jpg',
      '/Visuals/Bodywash/2.jpg'
    ]
  },

  // --- 6. BABY PRODUCT (1 Input, 3 Outputs) ---
  {
    id: 'v-baby-1',
    module: 'visuals',
    subCategory: 'baby',
    style: 'lifestyle',
    title: 'Little Wonders',
    description: 'Baby apparel placed in soft, comforting nursery settings.',
    imageUrl: '/Visuals/Baby/Cover.jpg', // Baby Lifestyle
    inputImageUrl: '/Visuals/Baby/0.jpg', // Baby Clothes Flatlay
    outputVariations: [
      '/Visuals/Baby/1.jpg',
      '/Visuals/Baby/2.jpg',
      '/Visuals/Baby/3.jpg'
    ]
  },




  // ==================================================================================
  // MODULE: VIDEOS
  // ==================================================================================
  // Updated Metadata to match content of public sample videos more accurately while maintaining aesthetic direction.
  {
    id: 'vid-1',
    module: 'videos',
    subCategory: 'garments',
    title: 'Quiet Luxury',
    description: 'High-impact product visuals that stop the scroll and build brand authority. If you’re a fashion brand ready to stand out — this is how your product should look.',
    videoUrl: '/Videos/Garment.mp4'
  },
  {
    id: 'vid-2',
    module: 'videos',
    subCategory: 'accessories',
    title: 'Quiet Detail',
    description: 'Balanced framing. Soft precision.Designed to showcase the product in a calm, elevated atmosphere — where minimalism becomes a powerful brand statement.',
    videoUrl: '/Videos/Ring holder.mp4'
  },
  {
    id: 'vid-3',
    module: 'videos',
    subCategory: 'footwear',
    title: 'Quiet Dominance',
    description: 'Designed with clarity. Captured with intention.Every angle highlights structure, texture, and form — turning movement into a refined visual experience.Minimal presentation. Maximum impact.',
    videoUrl: '/Videos/Shoe.mp4'
  },
  {
    id: 'vid-4',
    module: 'videos',
    subCategory: 'cosmetics',
    title: 'Quiet Glow',
    description: 'Gentle tones. Controlled depth.Designed to bring out the product’s natural luminosity while maintaining a calm, elevated aesthetic.',
    videoUrl: '/Videos/Cosmetics.mp4'
  },
  {
    id: 'vid-5',
    module: 'videos',
    subCategory: 'accessories',
    title: 'Quiet Prestige',
    description: 'Engineered with detail. Captured with restraint.A clean visual composition that highlights craftsmanship, texture, and balance — allowing time itself to become the statement.',
    videoUrl: '/Videos/Watch 1.mp4'
  },
];
