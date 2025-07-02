export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  co2Saved: number;
  ecoPoints: number;
  ecoCertified: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  features: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Fiber Toothbrush Set',
    category: 'Personal Care',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sustainable bamboo toothbrush set with soft bristles. Biodegradable and plastic-free.',
    co2Saved: 1.2,
    ecoPoints: 15,
    ecoCertified: true,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    tags: ['Plastic-free', 'Biodegradable', 'Vegan'],
    features: ['Soft bristles', 'Bamboo handle', 'Pack of 4', 'Compostable packaging']
  },
  {
    id: '2',
    name: 'Organic Cotton Tote Bag',
    category: 'Accessories',
    price: 499,
    image: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Durable organic cotton tote bag perfect for grocery shopping and daily use.',
    co2Saved: 2.5,
    ecoPoints: 25,
    ecoCertified: true,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    tags: ['Organic', 'Reusable', 'Fair Trade'],
    features: ['100% organic cotton', 'Reinforced handles', 'Machine washable', 'Large capacity']
  },
  {
    id: '3',
    name: 'Solar-Powered Phone Charger',
    category: 'Electronics',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.pexels.com/photos/159249/solar-panel-array-power-sun-electricity-159249.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Portable solar charger with high-efficiency panels. Perfect for outdoor adventures.',
    co2Saved: 5.8,
    ecoPoints: 60,
    ecoCertified: true,
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['Solar-powered', 'Portable', 'Weather-resistant'],
    features: ['Fast charging', 'Multiple device support', 'Waterproof', '10000mAh capacity']
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    category: 'Kitchen',
    price: 799,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Double-walled stainless steel water bottle. Keeps drinks cold for 24 hours.',
    co2Saved: 3.2,
    ecoPoints: 30,
    ecoCertified: true,
    rating: 4.7,
    reviews: 312,
    inStock: true,
    tags: ['BPA-free', 'Insulated', 'Leak-proof'],
    features: ['750ml capacity', 'Temperature retention', 'Easy grip', 'Dishwasher safe']
  },
  {
    id: '5',
    name: 'Natural Soap Bar Collection',
    category: 'Personal Care',
    price: 599,
    originalPrice: 699,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Collection of handmade natural soap bars with essential oils and organic ingredients.',
    co2Saved: 1.8,
    ecoPoints: 20,
    ecoCertified: true,
    rating: 4.9,
    reviews: 198,
    inStock: true,
    tags: ['Handmade', 'Natural', 'Cruelty-free'],
    features: ['Pack of 6', 'Essential oils', 'Zero waste packaging', 'Moisturizing formula']
  },
  {
    id: '6',
    name: 'Wooden Kitchen Utensil Set',
    category: 'Kitchen',
    price: 899,
    image: 'https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Handcrafted wooden kitchen utensils made from sustainable bamboo.',
    co2Saved: 2.1,
    ecoPoints: 22,
    ecoCertified: true,
    rating: 4.5,
    reviews: 67,
    inStock: true,
    tags: ['Handcrafted', 'Sustainable', 'Food-safe'],
    features: ['6-piece set', 'Bamboo material', 'Non-toxic finish', 'Heat resistant']
  },
  {
    id: '7',
    name: 'Beeswax Food Wraps',
    category: 'Kitchen',
    price: 449,
    image: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Reusable beeswax wraps to replace plastic wrap. Made with organic cotton.',
    co2Saved: 4.5,
    ecoPoints: 35,
    ecoCertified: true,
    rating: 4.8,
    reviews: 143,
    inStock: true,
    tags: ['Zero waste', 'Reusable', 'Biodegradable'],
    features: ['Set of 3 sizes', 'Natural antibacterial', 'Washable', 'Compostable']
  },
  {
    id: '8',
    name: 'LED Plant Grow Light',
    category: 'Home & Garden',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Energy-efficient LED grow light for indoor plants. Full spectrum lighting.',
    co2Saved: 3.7,
    ecoPoints: 40,
    ecoCertified: true,
    rating: 4.6,
    reviews: 91,
    inStock: true,
    tags: ['Energy-efficient', 'Full spectrum', 'Indoor gardening'],
    features: ['Low power consumption', 'Timer function', 'Adjustable height', '2-year warranty']
  }
];

export const categories = [
  'All',
  'Personal Care',
  'Kitchen',
  'Electronics',
  'Accessories',
  'Home & Garden'
];