export interface ProductVariant {
  color: string;
  colorName: string;
  colorHex?: string;
  swatchUrl?: string;
  images: string[];
  inStock?: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'ALL' | 'LATEX' | 'COATS + JACKETS' | 'DRESSES' | 'DENIM' | 'SHOES' | 'ACCESSORIES';
  badge?: string;
  description: string;
  fit: string;
  fabric: string;
  care: string;
  availableSizes: string[];
  variants: ProductVariant[];
  defaultImage: string;
  secondaryImage: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'iconique-latex-bodysuit-pink',
    handle: 'iconique-latex-bodysuit-pink',
    title: 'Iconique Pink Latex Bodysuit',
    price: 158,
    category: 'LATEX',
    badge: 'SIGNATURE DROP',
    description: 'Sculpted second-skin bodysuit handcrafted in high-gloss baby pink liquid latex. Designed by @iconiquebabe featuring high-neck architectural collar, high-cut leg lines, and snap base closure.',
    fit: 'Form-fitting, sculpted silhouette. If between sizes or prefer ease of wear, recommend sizing up.',
    fabric: '100% natural luxury latex with high-gloss liquid rose finish.',
    care: 'Hand wash in lukewarm water with mild soap. Dry flat. Treat with silicone latex shine.',
    availableSizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    defaultImage: '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/latex-bodysuit-black-bodysuit-khy-816682.webp?v=1778851614&width=800',
    variants: [
      {
        color: 'baby-pink',
        colorName: 'Baby Pink',
        colorHex: '#f472b6',
        images: [
          '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
          'https://www.khy.com/cdn/shop/files/AD00124_ROUGE_2249.jpg?v=1791922207&width=800'
        ],
        inStock: true
      },
      {
        color: 'pure-white',
        colorName: 'Pure White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/white_tank.jpg?v=1791927166&width=800'
        ],
        inStock: true
      },
      {
        color: 'noir',
        colorName: 'Noir Black',
        colorHex: '#181818',
        images: [
          'https://www.khy.com/cdn/shop/files/latex-bodysuit-black-bodysuit-khy-980321.webp?v=1778851608&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: 'iconique-pink-fur-jacket',
    handle: 'iconique-powder-pink-faux-fur-jacket',
    title: 'Signature Powder Pink Faux Fur',
    price: 295,
    category: 'COATS + JACKETS',
    badge: 'BESTSELLER',
    description: 'Opulent, cloud-soft collarless faux fur jacket in delicate powder pink as seen on @iconiquebabe. Satin lined with concealed hook closures and cropped silhouette.',
    fit: 'Boxy, waist-skimming crop with relaxed shoulders.',
    fabric: '100% Premium plush faux fur; 100% Silk satin lining.',
    care: 'Dry clean only. Store in garment dust bag.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    defaultImage: '/src/assets/images/editorial_pink_fur_1792018528759.jpg',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/OW003-H25_Signature-Faux-Fur-Jacket_PowderPink_3.jpg?v=1790018985&width=800',
    variants: [
      {
        color: 'powder-pink',
        colorName: 'Powder Pink',
        colorHex: '#fbcfe8',
        images: [
          '/src/assets/images/editorial_pink_fur_1792018528759.jpg',
          'https://www.khy.com/cdn/shop/files/OW003-H25_Signature-Faux-Fur-Jacket_PowderPink_3.jpg?v=1790018985&width=800',
          'https://www.khy.com/cdn/shop/files/OW003-H25_Signature-Faux-Fur-Jacket_PowderPink_5.jpg?v=1790018985&width=800'
        ],
        inStock: true
      },
      {
        color: 'snow-white',
        colorName: 'Snow White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/white_tank.jpg?v=1791927166&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: 'iconique-sandal-rose-chrome',
    handle: 'iconique-sandal-rose-chrome',
    title: 'Iconique Sandal | Rose Chrome',
    price: 395,
    category: 'SHOES',
    badge: 'ITALIAN MADE',
    description: 'Handcrafted in Florence, Italy. Modern architectural stiletto sandals in powder pink leather and reflective rose metallic chrome heel.',
    fit: '95mm stiletto height. Fits true to Italian sizing.',
    fabric: '100% Italian Nappa Leather & Rose Mirror Chrome hardware.',
    care: 'Store in dust bag. Clean with soft cloth.',
    availableSizes: ['36', '37', '38', '39', '40', '41'],
    defaultImage: '/src/assets/images/campaign_pink_heels_1792018526786.jpg',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/crop_Khy_Crochet_S21_SHOE_1865.jpg?v=1787076335&width=800',
    variants: [
      {
        color: 'rose-chrome',
        colorName: 'Rose Chrome',
        colorHex: '#f472b6',
        images: [
          '/src/assets/images/campaign_pink_heels_1792018526786.jpg',
          'https://www.khy.com/cdn/shop/files/PK26-9005_MetallicChrome__0145_46748dbd-dfbc-420a-8824-08c97f22286d.jpg?v=1787172262&width=800'
        ],
        inStock: true
      },
      {
        color: 'pearl-white',
        colorName: 'Pearl White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/PK26-9005_MetallicChrome__0147_c18d7bdb-4202-4875-b9fb-2f7686114145.jpg?v=1787172262&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: 'iconique-blush-leather-jacket',
    handle: 'iconique-blush-leather-jacket',
    title: 'Blush Tailored Moto Jacket',
    price: 580,
    category: 'COATS + JACKETS',
    badge: 'LIMITED EDITION',
    description: 'Chic blush pink genuine lambskin leather moto jacket as styled by @iconiquebabe. Gold hardware zips, cropped hem, and silky rose lining.',
    fit: 'Tailored fit that contours the waist.',
    fabric: '100% Genuine Lambskin Leather; Silk lining.',
    care: 'Professional leather dry clean.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultImage: '/src/assets/images/lookbook_iconique_babe_1792018527682.jpg',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/OW006-H25_Leather-Moto-Jacket.jpg?v=1790019340&width=800',
    variants: [
      {
        color: 'blush-pink',
        colorName: 'Blush Pink',
        colorHex: '#fbcfe8',
        images: [
          '/src/assets/images/lookbook_iconique_babe_1792018527682.jpg',
          'https://www.khy.com/cdn/shop/files/OW006-H25_Leather-Moto-Jacket.jpg?v=1790019340&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '15456311705969',
    handle: 'mulholland-studded-carpenter-pant-vintage-khaki',
    title: 'Iconique Studded Carpenter Pant',
    price: 490,
    category: 'DENIM',
    description: 'Heavyweight cotton canvas carpenter pant accented with polished dome studs throughout. Multi-pocket utilitarian detailing, hammer loop, and relaxed wide leg.',
    fit: 'Mid-rise with an elongated straight wide leg. Fits true to size.',
    fabric: '100% Cotton durable canvas with metal alloy hardware.',
    care: 'Machine wash cold inside out on gentle cycle. Hang dry.',
    availableSizes: ['24', '25', '26', '27', '28', '29', '30'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/mulholland-studded-carpenter-pant-vintage-khaki-bottom-pant-khy-9099883.png?v=1778611126&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/mulholland-studded-carpenter-pant-vintage-khaki-bottom-pant-khy-3022734.png?v=1778610988&width=800',
    variants: [
      {
        color: 'vintage-khaki',
        colorName: 'Vintage Khaki',
        colorHex: '#b29d78',
        images: [
          'https://www.khy.com/cdn/shop/files/mulholland-studded-carpenter-pant-vintage-khaki-bottom-pant-khy-9099883.png?v=1778611126&width=800',
          'https://www.khy.com/cdn/shop/files/mulholland-studded-carpenter-pant-vintage-khaki-bottom-pant-khy-3022734.png?v=1778610988&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '16045147718001',
    handle: 'echo-layered-tee-black',
    title: 'Echo Layered Tee (Blush & Baby)',
    price: 130,
    category: 'ALL',
    description: 'Double-layered ultra-soft cotton tee in delicate baby pink & cloud white. Contrast exposed under-layer at neckline and hem with raw edge trim.',
    fit: 'Slightly relaxed, true to size.',
    fabric: '100% Peruvian Cotton jersey.',
    care: 'Machine wash cold with like colors. Tumble dry low.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/Khy_Print_Sept26_S2_0183.jpg?v=1791303188&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/Khy_Print_Sept26_S2_0116_ff1447ed-fceb-48c6-b335-0f91010a4ccd.jpg?v=1791334848&width=800',
    variants: [
      {
        color: 'baby',
        colorName: 'Baby Pink',
        colorHex: '#fce7f3',
        images: [
          'https://www.khy.com/cdn/shop/files/Khy_Print_Sept26_S2_0183.jpg?v=1791303188&width=800',
          'https://www.khy.com/cdn/shop/files/Khy_Print_Sept26_S2_0116_ff1447ed-fceb-48c6-b335-0f91010a4ccd.jpg?v=1791334848&width=800'
        ],
        inStock: true
      },
      {
        color: 'cloud',
        colorName: 'Cloud White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/SunsetStudded_1.png?v=1782925161&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '14953958965617',
    handle: 'latex-plunge-tank-bone',
    title: 'Latex Plunge Tank | Bone White',
    price: 182,
    category: 'LATEX',
    description: 'Deep plunge neckline tank designed to sculpt and accentuate curves. High-gloss pristine bone white liquid latex.',
    fit: 'Fitted, compression design.',
    fabric: '100% natural latex.',
    care: 'Hand wash cold with silicone polish.',
    availableSizes: ['XXS', 'XS', 'S', 'M', 'L'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/latex-plunge-tank-bone-tank-khy-841040.webp?v=1778851136&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/white_tank.jpg?v=1791927166&width=800',
    variants: [
      {
        color: 'bone',
        colorName: 'Bone White',
        colorHex: '#faf5f7',
        images: [
          'https://www.khy.com/cdn/shop/files/latex-plunge-tank-bone-tank-khy-841040.webp?v=1778851136&width=800',
          'https://www.khy.com/cdn/shop/files/white_tank.jpg?v=1791927166&width=800'
        ],
        inStock: true
      },
      {
        color: 'pink',
        colorName: 'Rose Pink',
        colorHex: '#ec4899',
        images: [
          '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '14953958801777',
    handle: 'latex-cutout-dress-rouge',
    title: 'Latex Cutout Dress | Rouge Pink',
    price: 278,
    category: 'LATEX',
    description: 'Dramatic architectural cutout midi dress crafted in rich statement rouge pink liquid latex. Flattering hip curve cutouts and high collar.',
    fit: 'Bodycon contouring fit.',
    fabric: '100% natural latex.',
    care: 'Specialist latex wash and polish.',
    availableSizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/latex-cutout-dress-rouge-midi-khy-405705.webp?v=1743635934&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/latex-cutout-dress-rouge-midi-khy-260512.webp?v=1743635934&width=800',
    variants: [
      {
        color: 'rouge-pink',
        colorName: 'Rouge Pink',
        colorHex: '#be185d',
        images: [
          'https://www.khy.com/cdn/shop/files/latex-cutout-dress-rouge-midi-khy-405705.webp?v=1743635934&width=800',
          'https://www.khy.com/cdn/shop/files/latex-cutout-dress-rouge-midi-khy-260512.webp?v=1743635934&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '15456310919537',
    handle: 'audrey-halter-gown-black',
    title: 'Audrey Halter Gown | Noir Glam',
    price: 200,
    category: 'DRESSES',
    description: 'Column maxi gown with delicate halter neck strap and low plunging back. Liquid matte stretch jersey that skims and elongates.',
    fit: 'Floor length column cut.',
    fabric: '92% Rayon, 8% Elastane.',
    care: 'Dry clean or gentle cold hand wash.',
    availableSizes: ['XXS', 'XS', 'S', 'M', 'L'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/PK26-5000_Audrey-Halter-Gown_Black_1.jpg?v=1790018595&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/PK26-5000_Audrey-Halter-Gown_Black_2.jpg?v=1790018594&width=800',
    variants: [
      {
        color: 'black',
        colorName: 'Noir',
        colorHex: '#1f1217',
        images: [
          'https://www.khy.com/cdn/shop/files/PK26-5000_Audrey-Halter-Gown_Black_1.jpg?v=1790018595&width=800',
          'https://www.khy.com/cdn/shop/files/PK26-5000_Audrey-Halter-Gown_Black_2.jpg?v=1790018594&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '15587807625585',
    handle: 'rooftop-mini-dress-black',
    title: 'Rooftop Silk Mini Dress',
    price: 280,
    category: 'DRESSES',
    description: 'Cowl neck halter mini dress cut from lustrous fluid silk. Open back with tie detail and softly flared A-line hem.',
    fit: 'Flirty mini length.',
    fabric: '100% Mulberry Silk.',
    care: 'Dry clean only.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/4x5kyliebypierre15_0fe7daf0-d212-448e-8cbb-c5d1fc7ed494.jpg?v=1781064339&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/4x5kyliebypierre13_d720e814-4c31-4348-b62b-bdbe8a53d3f8.jpg?v=1781064336&width=800',
    variants: [
      {
        color: 'black',
        colorName: 'Noir',
        colorHex: '#1f1217',
        images: [
          'https://www.khy.com/cdn/shop/files/4x5kyliebypierre15_0fe7daf0-d212-448e-8cbb-c5d1fc7ed494.jpg?v=1781064339&width=800'
        ],
        inStock: true
      },
      {
        color: 'pearl',
        colorName: 'Pearl White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/4x5kyliebypierre16_14ce6ce6-8de2-473d-8a51-69557de49afc.jpg?v=1781064336&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '15456311771505',
    handle: 'sunset-studded-low-rise-jean-cloud',
    title: 'Sunset Studded Jean | Cloud White',
    price: 330,
    category: 'DENIM',
    badge: 'TRENDING',
    description: 'Pristine cloud white denim adorned with hand-placed micro silver studs. Relaxed straight leg and signature Iconique Babe hardware.',
    fit: 'Mid-rise with classic straight leg.',
    fabric: '100% Cotton rigid denim.',
    care: 'Turn inside out and wash cold.',
    availableSizes: ['24', '25', '26', '27', '28', '29', '30'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/SunsetStudded_1.png?v=1782925161&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/sunset-studded-mid-rise-jean-cloud-bottom-pant-khy-5860833.png?v=1778610862&width=800',
    variants: [
      {
        color: 'cloud-white',
        colorName: 'Cloud White',
        colorHex: '#ffffff',
        images: [
          'https://www.khy.com/cdn/shop/files/SunsetStudded_1.png?v=1782925161&width=800',
          'https://www.khy.com/cdn/shop/files/sunset-studded-mid-rise-jean-cloud-bottom-pant-khy-5860833.png?v=1778610862&width=800'
        ],
        inStock: true
      }
    ]
  },
  {
    id: '15477029241201',
    handle: 'benedict-bomber-palm',
    title: 'Iconique Cropped Bomber',
    price: 300,
    category: 'COATS + JACKETS',
    description: 'Voluminous cropped bomber jacket in lightweight washed shell with ribbed cuffs and silver storm zipper.',
    fit: 'Boxy, oversized silhouette.',
    fabric: '100% Recycled Nylon outer shell.',
    care: 'Dry clean only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultImage: 'https://www.khy.com/cdn/shop/files/4x5_green-bomber.jpg?v=1790018473&width=800',
    secondaryImage: 'https://www.khy.com/cdn/shop/files/PK26-4003_PK26-8000_Laurel-Short_Benedict-Bomber_WashedBlack-Palm_2.jpg?v=1790021022&width=800',
    variants: [
      {
        color: 'palm',
        colorName: 'Palm Green',
        colorHex: '#445138',
        images: [
          'https://www.khy.com/cdn/shop/files/4x5_green-bomber.jpg?v=1790018473&width=800'
        ],
        inStock: true
      }
    ]
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
    caption: 'unapologetically me in the new pink latex drop 🎀✨ @iconiquebabe #UnapologeticallyMe',
    productHandle: 'iconique-latex-bodysuit-pink',
    likes: '84.2K'
  },
  {
    id: 'ig-2',
    image: '/src/assets/images/editorial_pink_fur_1792018528759.jpg',
    caption: 'never too much pink 💅 wearing the signature powder fur #RestingBFace @iconiquebabe',
    productHandle: 'iconique-powder-pink-faux-fur-jacket',
    likes: '112.5K'
  },
  {
    id: 'ig-3',
    image: '/src/assets/images/campaign_pink_heels_1792018526786.jpg',
    caption: 'stepping out in florence in the new rose chrome sandals ✨ @iconiquebabe',
    productHandle: 'iconique-sandal-rose-chrome',
    likes: '94.8K'
  },
  {
    id: 'ig-4',
    image: '/src/assets/images/lookbook_iconique_babe_1792018527682.jpg',
    caption: 'blush leather + clean white trousers for golden hour 🌅 #GoldenHour @iconiquebabe',
    productHandle: 'iconique-blush-leather-jacket',
    likes: '143K'
  },
  {
    id: 'ig-5',
    image: 'https://www.khy.com/cdn/shop/files/SunsetStudded_1.png?v=1782925161&width=600',
    caption: 'studded white denim obsession 🤍 @iconiquebabe',
    productHandle: 'sunset-studded-low-rise-jean-cloud',
    likes: '78K'
  },
  {
    id: 'ig-6',
    image: 'https://www.khy.com/cdn/shop/files/4x5kyliebypierre15_0fe7daf0-d212-448e-8cbb-c5d1fc7ed494.jpg?v=1781064339&width=600',
    caption: 'rooftop silk vibes tonight #PettyLabelle @iconiquebabe',
    productHandle: 'rooftop-mini-dress-black',
    likes: '129K'
  }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', rate: 0.92, country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', rate: 0.79, country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, country: 'Canada', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', rate: 1.52, country: 'Australia', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥', rate: 152.0, country: 'Japan', flag: '🇯🇵' },
];
