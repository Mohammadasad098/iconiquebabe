import { Product } from '../data/products';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productTitle: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

export interface CustomerOrder {
  id: string; // e.g. #ICONIQUE-829104
  customerName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source: 'Newsletter' | 'Waitlist' | 'Checkout' | 'VIP Club';
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface EmailCampaign {
  id: string;
  subject: string;
  previewText: string;
  message: string;
  discountCode?: string;
  recipientCount: number;
  sentAt: string;
  status: 'Sent' | 'Draft';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  announcementText: string;
  freeShippingThreshold: number;
  vipDiscountPercent: number;
  contactEmail: string;
  contactPhone: string;
  instagramHandle: string;
  youtubeHandle: string;
  linktreeUrl: string;
  adminPassword: string;
  storeMode: 'live' | 'vip_exclusive' | 'maintenance';
}

