export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice: number
  image: string
  description: string
  weight: string
  benefits: string[]
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Kaju',
    category: 'Nuts',
    price: 400,
    originalPrice: 500,
    image: '/pd1.jpeg',
    description: 'Premium California almonds, hand-selected and roasted to perfection. Rich in protein and healthy fats.',
    weight: '250g',
    benefits: ['High in Vitamin E', 'Rich in Antioxidants', 'Supports Heart Health'],
    rating: 4.8,
    reviews: 342,
  },
  {
    id: '2',
    name: 'Anjeer',
    category: 'Nuts',
    price: 599,
    originalPrice: 800,
    image: '/pd2.jpeg',
    description: 'Smooth, buttery cashews with exceptional quality. Perfect for snacking or cooking.',
    weight: '250g',
    benefits: ['Magnesium Rich', 'Boosts Energy', 'Supports Brain Function'],
    rating: 4.7,
    reviews: 298,
  },
  {
    id: '3',
<<<<<<< HEAD
    name: 'Kaju',
=======
    name: 'kaju',
>>>>>>> b91bd70c208cfd3de26bcb404ec5aae166a78a90
    category: 'Nuts',
    price: 150,
    originalPrice: 200,
    image: '/pd3.jpeg',
    description: 'Fresh organic walnuts packed with omega-3 fatty acids. Great for brain health.',
    weight: '100g',
    benefits: ['Omega-3 Fatty Acids', 'Brain Health', 'Reduces Inflammation'],
    rating: 4.9,
    reviews: 512,
  },
  {
    id: '4',
    name: 'Dates Premium',
    category: 'Dried Fruits',
    price: 449,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1585707642170-f8fe9f49bfde?w=400&h=400&fit=crop',
    description: 'Natural sweet dates, soft and chewy. Perfect for energy and digestion.',
    weight: '500g',
    benefits: ['Natural Energy', 'High in Fiber', 'Rich in Minerals'],
    rating: 4.6,
    reviews: 187,
  },
  {
    id: '5',
    name: 'Dried Apricots',
    category: 'Dried Fruits',
    price: 399,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd77c54?w=400&h=400&fit=crop',
    description: 'Tangy and sweet dried apricots. Rich in vitamins and natural sugars.',
    weight: '300g',
    benefits: ['Vitamin A Rich', 'Energy Booster', 'Aids Digestion'],
    rating: 4.5,
    reviews: 156,
  },
  {
    id: '6',
    name: 'Pistachios Deluxe',
    category: 'Nuts',
    price: 1299,
    originalPrice: 1800,
    image: 'https://images.unsplash.com/photo-1585707642170-f8fe9f49bfde?w=400&h=400&fit=crop',
    description: 'Premium salted pistachios with vibrant green color. A luxury snack.',
    weight: '400g',
    benefits: ['Antioxidant Rich', 'Heart Healthy', 'Good for Eyes'],
    rating: 4.9,
    reviews: 423,
  },
  {
    id: '7',
    name: 'Raisins Golden',
    category: 'Dried Fruits',
    price: 299,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd77c54?w=400&h=400&fit=crop',
    description: 'Sun-dried golden raisins with natural sweetness. Perfect for baking.',
    weight: '500g',
    benefits: ['Natural Sweetness', 'Iron Rich', 'Supports Bone Health'],
    rating: 4.4,
    reviews: 267,
  },
  {
    id: '8',
    name: 'Mixed Dry Fruits',
    category: 'Mix',
    price: 1599,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1585707642170-f8fe9f49bfde?w=400&h=400&fit=crop',
    description: 'Premium assortment of almonds, cashews, raisins, and dates. Perfect gift.',
    weight: '1000g',
    benefits: ['Complete Nutrition', 'Perfect Gift', 'Variety Pack'],
    rating: 4.8,
    reviews: 654,
  },
]
