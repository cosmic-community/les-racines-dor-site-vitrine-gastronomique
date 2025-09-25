// Cosmic CMS type definitions for Les Racines d'Or restaurant

// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Restaurant Info (singleton)
export interface RestaurantInfo extends CosmicObject {
  type: 'restaurant-info';
  metadata: {
    name: string;
    description: string;
    hours: string;
    address: string;
    phone: string;
    email: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Chef
export interface Chef extends CosmicObject {
  type: 'chef';
  metadata: {
    full_name: string;
    title: string;
    portrait?: {
      url: string;
      imgix_url: string;
    };
    biography: string;
    specialties?: string;
  };
}

// Menu Item
export interface MenuItem extends CosmicObject {
  type: 'menu';
  metadata: {
    dish_name: string;
    category: {
      key: MenuCategory;
      value: string;
    };
    description: string;
    price: string;
    dish_image?: {
      url: string;
      imgix_url: string;
    };
    allergens?: string;
  };
}

// Wine
export interface Wine extends CosmicObject {
  type: 'wines';
  metadata: {
    wine_name: string;
    wine_type: {
      key: WineType;
      value: string;
    };
    vintage?: string;
    description: string;
    price: string;
    food_pairing?: string;
  };
}

// Team Member
export interface TeamMember extends CosmicObject {
  type: 'team';
  metadata: {
    full_name: string;
    position: string;
    portrait?: {
      url: string;
      imgix_url: string;
    };
    bio: string;
    experience?: string;
  };
}

// Testimonial
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    testimonial_text: string;
    rating: {
      key: string;
      value: string;
    };
    visit_date?: string;
  };
}

// Type literals for select-dropdown values (must match content model exactly)
export type MenuCategory = 'entrees' | 'plats' | 'desserts';
export type WineType = 'champagne' | 'blanc' | 'rouge' | 'rose';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isRestaurantInfo(obj: CosmicObject): obj is RestaurantInfo {
  return obj.type === 'restaurant-info';
}

export function isChef(obj: CosmicObject): obj is Chef {
  return obj.type === 'chef';
}

export function isMenuItem(obj: CosmicObject): obj is MenuItem {
  return obj.type === 'menu';
}

export function isWine(obj: CosmicObject): obj is Wine {
  return obj.type === 'wines';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Utility types
export type MenuItems = {
  entrees: MenuItem[];
  plats: MenuItem[];
  desserts: MenuItem[];
};

// Component prop types
export interface MenuSectionProps {
  items: MenuItem[];
  categoryName: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface TeamCardProps {
  member: TeamMember;
}

export interface WineCardProps {
  wine: Wine;
}

// Helper function for safe metadata access
export function getImageUrl(image?: { imgix_url: string }, params: string = ''): string {
  if (!image?.imgix_url) return '';
  return params ? `${image.imgix_url}?${params}` : image.imgix_url;
}

// Rating helper
export function getRatingNumber(rating: { key: string; value: string }): number {
  return parseInt(rating.key) || 5;
}