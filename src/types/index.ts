/**
 * Blog Post Interface
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  updatedDate: string;
  featured: boolean;
  image?: string;
  tags: string[];
}

/**
 * Book Interface
 */
export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: string;
  publishDate: string;
  purchaseLink: string;
  featured: boolean;
  genres: string[];
  rating?: number;
}

/**
 * Author Information
 */
export interface AuthorInfo {
  name: string;
  bio: string;
  email: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
