import { Product, Category, Brand } from "@shared/schema";

export const categories: Category[] = [
  { id: 1, name: "Engine Parts", slug: "engine-parts", description: "Engine components and accessories", vehicleType: "car", parentId: null },
  { id: 2, name: "Brake System", slug: "brake-system", description: "Brake components and accessories", vehicleType: "car", parentId: null },
  { id: 3, name: "Suspension", slug: "suspension", description: "Suspension components", vehicleType: "car", parentId: null },
  { id: 4, name: "Electrical", slug: "electrical", description: "Electrical components and accessories", vehicleType: "car", parentId: null },
  { id: 5, name: "Tires & Wheels", slug: "tires-wheels", description: "Tires and wheel accessories", vehicleType: "car", parentId: null },
  { id: 6, name: "Body Parts", slug: "body-parts", description: "Body panels and accessories", vehicleType: "car", parentId: null },
  { id: 7, name: "Motorcycle Engine", slug: "motorcycle-engine", description: "Motorcycle engine parts", vehicleType: "motorcycle", parentId: null },
  { id: 8, name: "Motorcycle Brakes", slug: "motorcycle-brakes", description: "Motorcycle brake components", vehicleType: "motorcycle", parentId: null },
  { id: 9, name: "Motorcycle Accessories", slug: "motorcycle-accessories", description: "Motorcycle accessories and gear", vehicleType: "motorcycle", parentId: null },
];

export const brands: Brand[] = [
  { id: 1, name: "Bosch", slug: "bosch", description: "Premium automotive parts", logoUrl: null },
  { id: 2, name: "Brembo", slug: "brembo", description: "High-performance brake systems", logoUrl: null },
  { id: 3, name: "K&N", slug: "kn", description: "High-flow air filters", logoUrl: null },
  { id: 4, name: "Michelin", slug: "michelin", description: "Premium tires", logoUrl: null },
  { id: 5, name: "Pioneer", slug: "pioneer", description: "Car electronics and audio", logoUrl: null },
  { id: 6, name: "Mann Filter", slug: "mann-filter", description: "Filtration solutions", logoUrl: null },
  { id: 7, name: "NGK", slug: "ngk", description: "Spark plugs and ignition", logoUrl: null },
  { id: 8, name: "Bilstein", slug: "bilstein", description: "Premium shock absorbers", logoUrl: null },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Performance Brake Disc Rotor",
    slug: "performance-brake-disc-rotor",
    description: "High-performance brake disc rotor with enhanced cooling design. Made from high-carbon steel for superior durability and performance.",
    shortDescription: "High-performance brake disc with enhanced cooling",
    price: "89.99",
    originalPrice: "119.99",
    sku: "BRM-001",
    stock: 25,
    brandId: 2,
    categoryId: 2,
    vehicleType: "car",
    images: ["https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      diameter: "320mm",
      thickness: "28mm",
      material: "High-carbon steel",
      ventilated: true,
      coating: "Zinc plated"
    }),
    compatibility: JSON.stringify({
      makes: ["BMW", "Mercedes", "Audi"],
      models: ["3 Series", "C-Class", "A4"],
      years: ["2015-2023"]
    }),
    rating: "4.8",
    reviewCount: 127,
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "High-Flow Air Filter",
    slug: "high-flow-air-filter",
    description: "K&N high-flow air filter designed to increase horsepower and acceleration while providing excellent filtration.",
    shortDescription: "High-flow air filter for increased performance",
    price: "45.99",
    originalPrice: null,
    sku: "KN-002",
    stock: 50,
    brandId: 3,
    categoryId: 1,
    vehicleType: "car",
    images: ["https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      type: "Cotton gauze",
      shape: "Panel",
      washable: true,
      oilTreatment: "Pre-oiled"
    }),
    compatibility: JSON.stringify({
      makes: ["Ford", "Chevrolet", "Toyota"],
      models: ["F-150", "Silverado", "Camry"],
      years: ["2018-2023"]
    }),
    rating: "4.6",
    reviewCount: 89,
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Sport Performance Tire",
    slug: "sport-performance-tire",
    description: "Michelin sport performance tire with advanced compound for superior grip and handling in all weather conditions.",
    shortDescription: "High-performance tire for sport driving",
    price: "179.99",
    originalPrice: "199.99",
    sku: "MCH-003",
    stock: 30,
    brandId: 4,
    categoryId: 5,
    vehicleType: "car",
    images: ["https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      size: "225/45R17",
      speedRating: "W",
      loadIndex: "94",
      treadPattern: "Asymmetric",
      warranty: "50,000 miles"
    }),
    compatibility: JSON.stringify({
      makes: ["BMW", "Audi", "Mercedes"],
      models: ["3 Series", "A4", "C-Class"],
      years: ["2016-2023"]
    }),
    rating: "4.9",
    reviewCount: 234,
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Touchscreen Car Stereo",
    slug: "touchscreen-car-stereo",
    description: "Pioneer touchscreen car stereo with Apple CarPlay and Android Auto compatibility. Features high-resolution display and premium audio.",
    shortDescription: "Touchscreen stereo with smartphone integration",
    price: "299.99",
    originalPrice: null,
    sku: "PNR-004",
    stock: 15,
    brandId: 5,
    categoryId: 4,
    vehicleType: "car",
    images: ["https://images.unsplash.com/photo-1556909114-4526cd0b5d5c?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      screenSize: "7 inch",
      resolution: "1280x720",
      connectivity: ["Apple CarPlay", "Android Auto", "Bluetooth"],
      powerOutput: "50W x 4",
      inputs: ["USB", "AUX", "RCA"]
    }),
    compatibility: JSON.stringify({
      makes: ["Universal"],
      models: ["Double DIN compatible vehicles"],
      years: ["2010-2023"]
    }),
    rating: "4.4",
    reviewCount: 67,
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Premium Oil Filter",
    slug: "premium-oil-filter",
    description: "Mann Filter premium oil filter with advanced filtration technology for maximum engine protection.",
    shortDescription: "Premium oil filter for engine protection",
    price: "12.99",
    originalPrice: null,
    sku: "MAN-005",
    stock: 100,
    brandId: 6,
    categoryId: 1,
    vehicleType: "car",
    images: ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      type: "Spin-on",
      material: "Synthetic media",
      efficiency: "99.5%",
      capacity: "1.2 quarts",
      gasket: "Nitrile rubber"
    }),
    compatibility: JSON.stringify({
      makes: ["Honda", "Toyota", "Nissan"],
      models: ["Civic", "Corolla", "Sentra"],
      years: ["2015-2023"]
    }),
    rating: "4.7",
    reviewCount: 156,
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Motorcycle Performance Exhaust",
    slug: "motorcycle-performance-exhaust",
    description: "High-performance motorcycle exhaust system designed to increase power and enhance sound.",
    shortDescription: "Performance exhaust for motorcycles",
    price: "399.99",
    originalPrice: "449.99",
    sku: "EXH-006",
    stock: 8,
    brandId: 1,
    categoryId: 7,
    vehicleType: "motorcycle",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3"],
    specifications: JSON.stringify({
      material: "Stainless steel",
      finish: "Carbon fiber",
      weight: "8.5 lbs",
      powerIncrease: "12 HP",
      dBLevel: "92 dB"
    }),
    compatibility: JSON.stringify({
      makes: ["Yamaha", "Honda", "Kawasaki"],
      models: ["YZF-R6", "CBR600RR", "Ninja 636"],
      years: ["2017-2023"]
    }),
    rating: "4.6",
    reviewCount: 43,
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);

export const vehicleMakes = [
  "Audi", "BMW", "Mercedes", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia",
  "Volkswagen", "Mazda", "Subaru", "Lexus", "Infiniti", "Acura", "Volvo", "Jaguar", "Land Rover", "Porsche"
];

export const vehicleYears = Array.from({ length: 24 }, (_, i) => 2000 + i).reverse();
