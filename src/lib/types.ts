export interface ProcessingState {
  status: 'idle' | 'loading-model' | 'processing' | 'done' | 'error';
  progress: number; // 0-100
  message: string;
}

export interface OutputOptions {
  background: 'transparent' | 'white' | 'black' | 'custom' | 'blur';
  customColor: string;
  blurRadius: number;
  format: 'png' | 'jpg' | 'webp';
  quality: number;
}

export interface AffiliateProduct {
  name: string;
  slug: string;
  url: string;
  description: string;
  rating: number;
  price: string;
}
