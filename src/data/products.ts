import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Robe Émeraude Recyclée',
    description: 'Magnifique robe confectionnée à partir de tissus recyclés premium. Un parfait équilibre entre élégance et responsabilité environnementale.',
    price: 89.99,
    originalPrice: 120.00,
    images: [
      'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg'
    ],
    category: 'Robes',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Émeraude', 'Noir', 'Bleu Marine'],
    isEcoFriendly: true,
    isRecycled: true,
    inStock: true,
    rating: 4.8,
    reviews: 127,
    materials: ['Soie recyclée', 'Polyester recyclé', 'Coton bio'],
    sustainability: {
      carbonFootprint: 2.1,
      recycledContent: 85,
      certifications: ['GOTS', 'OEKO-TEX']
    }
  },
  {
    id: '2',
    name: 'Blazer Premium Upcyclé',
    description: 'Blazer sophistiqué créé à partir de vestes vintage retravaillées. Pièce unique alliant style intemporel et innovation durable.',
    price: 145.00,
    images: [
      'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    ],
    category: 'Vestes',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Gris Anthracite', 'Bordeaux'],
    isEcoFriendly: true,
    isRecycled: true,
    inStock: true,
    rating: 4.9,
    reviews: 89,
    materials: ['Laine upcyclée', 'Doublure en soie recyclée'],
    sustainability: {
      carbonFootprint: 1.8,
      recycledContent: 90,
      certifications: ['Cradle to Cradle', 'B-Corp']
    }
  },
  {
    id: '3',
    name: 'Pantalon Fluide Bio',
    description: 'Pantalon confectionné dans un coton biologique certifié. Coupe moderne et confortable pour un style décontracté chic.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
    ],
    category: 'Pantalons',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Noir', 'Kaki', 'Blanc'],
    isEcoFriendly: true,
    isRecycled: false,
    inStock: true,
    rating: 4.6,
    reviews: 203,
    materials: ['Coton biologique', 'Élasthanne'],
    sustainability: {
      carbonFootprint: 3.2,
      recycledContent: 0,
      certifications: ['GOTS', 'Fair Trade']
    }
  },
  {
    id: '4',
    name: 'Chemisier Soie Responsable',
    description: 'Chemisier en soie produite selon des standards éthiques stricts. Élégance raffinée pour toutes les occasions professionnelles.',
    price: 125.00,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg'
    ],
    category: 'Hauts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blanc Ivoire', 'Rose Poudré', 'Bleu Ciel'],
    isEcoFriendly: true,
    isRecycled: false,
    inStock: true,
    rating: 4.7,
    reviews: 156,
    materials: ['Soie éthique', 'Nacre naturelle'],
    sustainability: {
      carbonFootprint: 2.8,
      recycledContent: 0,
      certifications: ['Silk Mark', 'Fair Trade']
    }
  },
  {
    id: '5',
    name: 'Jupe Midi Vintage Redesign',
    description: 'Jupe midi créée à partir de tissus vintage des années 70 redessinés. Pièce collector au style bohème chic.',
    price: 95.00,
    originalPrice: 130.00,
    images: [
      'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    ],
    category: 'Jupes',
    sizes: ['S', 'M', 'L'],
    colors: ['Floral Vintage', 'Paisley Bleu', 'Géométrique Doré'],
    isEcoFriendly: true,
    isRecycled: true,
    inStock: true,
    rating: 4.9,
    reviews: 74,
    materials: ['Tissus vintage upcyclés', 'Doublure coton bio'],
    sustainability: {
      carbonFootprint: 1.5,
      recycledContent: 95,
      certifications: ['Upcycled Certified', 'Zero Waste']
    }
  },
  {
    id: '6',
    name: 'Cardigan Cachemire Éthique',
    description: 'Cardigan en cachemire sourcé de façon éthique auprès de coopératives mongoles. Douceur exceptionnelle et chaleur incomparable.',
    price: 189.00,
    images: [
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg'
    ],
    category: 'Pulls',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Gris Perle', 'Nude'],
    isEcoFriendly: true,
    isRecycled: false,
    inStock: true,
    rating: 5.0,
    reviews: 92,
    materials: ['Cachemire éthique', 'Boutons en coco naturel'],
    sustainability: {
      carbonFootprint: 4.1,
      recycledContent: 0,
      certifications: ['Fair Trade', 'Animal Welfare Approved']
    }
  }
];

export const categories = [
  'Tous',
  'Nouveautés',
  'Collection Recyclée',
  'Robes',
  'Hauts',
  'Pantalons',
  'Jupes',
  'Vestes',
  'Pulls',
  'Accessoires'
];

export const featuredProducts = products.slice(0, 4);
export const newArrivals = products.filter(p => ['1', '3', '5'].includes(p.id));
export const recycledCollection = products.filter(p => p.isRecycled);