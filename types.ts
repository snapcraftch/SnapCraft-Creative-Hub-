
export type ModuleType = 'visuals' | 'posters' | 'videos';

export type SubCategoryType = 'garments' | 'accessories' | 'footwear' | 'cosmetics' | 'food' | 'baby';

export interface BrandAsset {
  id: string;
  module: ModuleType;
  subCategory: SubCategoryType;
  style?: 'studio' | 'lifestyle';
  title: string;
  description: string;
  imageUrl?: string; // This serves as the main "Output" image
  outputVariations?: string[]; // Additional output variations
  inputImageUrl?: string; // This serves as the "Before" or Input image
  videoUrl?: string;
  width?: number;
  height?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}