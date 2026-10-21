import { CustomerOrder, Subscriber, EmailCampaign } from '../types/admin';

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: 'sub-1',
    email: 'charlotte.vogue@gmail.com',
    name: 'Charlotte Vance',
    source: 'VIP Club',
    subscribedAt: '2026-10-12T14:22:00Z',
    status: 'Active'
  },
  {
    id: 'sub-2',
    email: 'elena.rossi@milano-fashion.it',
    name: 'Elena Rossi',
    source: 'Newsletter',
    subscribedAt: '2026-10-13T09:15:00Z',
    status: 'Active'
  },
  {
    id: 'sub-3',
    email: 'babe.fan99@yahoo.com',
    name: 'Jessica Moore',
    source: 'Waitlist',
    subscribedAt: '2026-10-13T18:40:00Z',
    status: 'Active'
  },
  {
    id: 'sub-4',
    email: 'sophie.lux@icloud.com',
    name: 'Sophie Laurent',
    source: 'Checkout',
    subscribedAt: '2026-10-14T11:05:00Z',
    status: 'Active'
  },
  {
    id: 'sub-5',
    email: 'amara.stylist@glamour.com',
    name: 'Amara Brooks',
    source: 'VIP Club',
    subscribedAt: '2026-10-14T13:30:00Z',
    status: 'Active'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: '#ICONIQUE-892104',
    customerName: 'Charlotte Vance',
    email: 'charlotte.vogue@gmail.com',
    address: '742 Evergreen Terrace',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    country: 'United States',
    items: [
      {
        productId: 'iconique-latex-bodysuit-pink',
        productTitle: 'Iconique Pink Latex Bodysuit',
        image: '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
        price: 158,
        color: 'Baby Pink',
        size: 'S',
        quantity: 1
      },
      {
        productId: 'iconique-sandal-rose-chrome',
        productTitle: 'Iconique Sandal | Rose Chrome',
        image: '/src/assets/images/campaign_pink_heels_1792018526786.jpg',
        price: 395,
        color: 'Rose Chrome',
        size: '38',
        quantity: 1
      }
    ],
    subtotal: 553,
    shipping: 0,
    tax: 45,
    total: 598,
    status: 'Processing',
    paymentMethod: 'Visa •••• 4242',
    trackingNumber: 'FDX-88291049US',
    createdAt: '2026-10-14T10:15:00Z'
  },
  {
    id: '#ICONIQUE-741902',
    customerName: 'Sophie Laurent',
    email: 'sophie.lux@icloud.com',
    address: '14 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    state: 'IDF',
    zip: '75008',
    country: 'France',
    items: [
      {
        productId: 'iconique-pink-fur-jacket',
        productTitle: 'Signature Powder Pink Faux Fur',
        image: '/src/assets/images/editorial_pink_fur_1792018528759.jpg',
        price: 295,
        color: 'Powder Pink',
        size: 'M',
        quantity: 1
      }
    ],
    subtotal: 295,
    shipping: 0,
    tax: 24,
    total: 319,
    status: 'Shipped',
    paymentMethod: 'Mastercard •••• 5591',
    trackingNumber: 'DHL-99120485EU',
    createdAt: '2026-10-13T16:20:00Z'
  },
  {
    id: '#ICONIQUE-620481',
    customerName: 'Elena Rossi',
    email: 'elena.rossi@milano-fashion.it',
    address: 'Via Montenapoleone 8',
    city: 'Milan',
    state: 'MI',
    zip: '20121',
    country: 'Italy',
    items: [
      {
        productId: 'iconique-blush-leather-jacket',
        productTitle: 'Blush Tailored Moto Jacket',
        image: '/src/assets/images/lookbook_iconique_babe_1792018527682.jpg',
        price: 580,
        color: 'Blush Pink',
        size: 'S',
        quantity: 1
      }
    ],
    subtotal: 580,
    shipping: 0,
    tax: 48,
    total: 628,
    status: 'Delivered',
    paymentMethod: 'Apple Pay',
    trackingNumber: 'UPS-10492850IT',
    createdAt: '2026-10-12T09:40:00Z'
  }
];

export const INITIAL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'camp-1',
    subject: '🎀 VIP Early Access: The Pink Liquid Latex Drop is Live!',
    previewText: 'Exclusive 24-hour private window for @iconiquebabe VIPs.',
    message: 'Hello Iconic Babes! The sculpted liquid pink collection is officially here. Handcrafted in ultra-high-gloss latex with architectural silhouettes. Shop before public release with complimentary Italian silk packaging.',
    discountCode: 'VIPBABES15',
    recipientCount: 1420,
    sentAt: '2026-10-13T12:00:00Z',
    status: 'Sent'
  }
];

export const DEFAULT_STORE_SETTINGS = {
  storeName: 'ICONIQUE BABE',
  tagline: 'The premier pink & white luxury fashion house',
  heroHeadline: 'PINK IS THE NEW ICONIC',
  heroSubtitle: 'sculpted silhouettes returned in ultra-high-gloss baby pink liquid latex. curated & directed by @iconiquebabe.',
  announcementText: 'ICONIQUE BABE IS HERE | SHOP THE PINK DROP 🎀',
  freeShippingThreshold: 150,
  vipDiscountPercent: 15,
  contactEmail: 'babe@iconiquebabe.com',
  contactPhone: '+1 (310) 849-2026',
  instagramHandle: '@iconiquebabe',
  youtubeHandle: '@aisirinavea',
  linktreeUrl: 'https://linktr.ee/aisirinavea',
  adminPassword: 'admin', // default master password
  storeMode: 'live' as const
};

