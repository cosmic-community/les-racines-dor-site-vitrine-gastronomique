import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling with Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get restaurant information (singleton)
export async function getRestaurantInfo() {
  try {
    const response = await cosmic.objects
      .find({ type: 'restaurant-info' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects[0] || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching restaurant info:', error);
    throw new Error('Failed to fetch restaurant information');
  }
}

// Get chef information
export async function getChef() {
  try {
    const response = await cosmic.objects
      .find({ type: 'chef' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects[0] || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching chef:', error);
    throw new Error('Failed to fetch chef information');
  }
}

// Get menu items with optional category filter
export async function getMenuItems(category?: string) {
  try {
    const query: Record<string, any> = { type: 'menu' };
    
    if (category) {
      query['metadata.category'] = category;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items');
  }
}

// Get all menu items organized by category
export async function getMenuByCategory() {
  try {
    const allMenuItems = await getMenuItems();
    
    const categorizedMenu = {
      entrees: [],
      plats: [],
      desserts: []
    } as Record<string, any[]>;
    
    allMenuItems.forEach(item => {
      const categoryKey = item.metadata?.category?.key;
      if (categoryKey && categorizedMenu[categoryKey]) {
        categorizedMenu[categoryKey].push(item);
      }
    });
    
    return categorizedMenu;
  } catch (error) {
    console.error('Error organizing menu by category:', error);
    throw new Error('Failed to organize menu by category');
  }
}

// Get wines
export async function getWines() {
  try {
    const response = await cosmic.objects
      .find({ type: 'wines' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching wines:', error);
    throw new Error('Failed to fetch wines');
  }
}

// Get team members
export async function getTeam() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching team:', error);
    throw new Error('Failed to fetch team');
  }
}

// Get testimonials
export async function getTestimonials() {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    // Sort testimonials by rating (highest first) and then by date
    const testimonials = response.objects || [];
    return testimonials.sort((a, b) => {
      const ratingA = parseInt(a.metadata?.rating?.key || '0');
      const ratingB = parseInt(b.metadata?.rating?.key || '0');
      
      if (ratingA !== ratingB) {
        return ratingB - ratingA; // Higher rating first
      }
      
      // If ratings are equal, sort by date (newest first)
      const dateA = new Date(a.metadata?.visit_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.visit_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
}