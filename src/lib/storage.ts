import { BlogPost, Book } from "@/types";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "public", "data");
const blogsFile = path.join(dataDir, "blogs.json");
const booksFile = path.join(dataDir, "books.json");

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Initialize default data files if they don't exist
 */
export function initializeData() {
  ensureDataDir();

  // Initialize blogs
  if (!fs.existsSync(blogsFile)) {
    const defaultBlogs: BlogPost[] = [
      {
        id: "1",
        title: "Welcome to My Blog",
        slug: "welcome-to-my-blog",
        excerpt:
          "This is my first blog post introducing my new author website.",
        content: `# Welcome to My Blog

I'm excited to share my thoughts, experiences, and insights with you through this blog. 

## What to Expect

On this blog, you'll find:
- In-depth articles about writing and storytelling
- Personal reflections on the writing journey
- Updates about my latest book releases
- Writing tips and creative inspiration

Thank you for visiting!`,
        author: "Author Name",
        publishDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        featured: true,
        tags: ["welcome", "introduction", "blog"],
      },
    ];
    fs.writeFileSync(blogsFile, JSON.stringify(defaultBlogs, null, 2));
  }

  // Initialize books
  if (!fs.existsSync(booksFile)) {
    const defaultBooks: Book[] = [
      {
        id: "1",
        title: "Sample Book Title",
        slug: "sample-book-title",
        description:
          "This is a sample book description. Replace this with your actual book information.",
        coverImage: "https://via.placeholder.com/300x400?text=Book+Cover",
        author: "Author Name",
        publishDate: new Date().toISOString(),
        purchaseLinkAmazon: "https://www.amazon.com",
        purchaseLinkPothi: "https://pothi.com/",
        featured: true,
        genres: ["Fiction", "Adventure"],
        rating: 4.5,
      },
    ];
    fs.writeFileSync(booksFile, JSON.stringify(defaultBooks, null, 2));
  }
}

/**
 * Get all blog posts
 */
export function getBlogs(): BlogPost[] {
  ensureDataDir();
  try {
    if (fs.existsSync(blogsFile)) {
      const data = fs.readFileSync(blogsFile, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading blogs:", error);
  }
  return [];
}

/**
 * Get a single blog post by slug
 */
export function getBlogBySlug(slug: string): BlogPost | null {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

/**
 * Create a new blog post
 */
export function createBlog(
  blog: Omit<BlogPost, "id" | "publishDate" | "updatedDate">,
): BlogPost {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: Date.now().toString(),
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };
  blogs.push(newBlog);
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  return newBlog;
}

/**
 * Update a blog post
 */
export function updateBlog(
  id: string,
  updates: Partial<BlogPost>,
): BlogPost | null {
  const blogs = getBlogs();
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    ...updates,
    id: blogs[index].id, // Prevent ID change
    publishDate: blogs[index].publishDate, // Prevent date change
    updatedDate: new Date().toISOString(),
  };
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  return blogs[index];
}

/**
 * Delete a blog post
 */
export function deleteBlog(id: string): boolean {
  const blogs = getBlogs();
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return false;

  blogs.splice(index, 1);
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  return true;
}

/**
 * Get all books
 */
export function getBooks(): Book[] {
  ensureDataDir();
  try {
    if (fs.existsSync(booksFile)) {
      const data = fs.readFileSync(booksFile, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading books:", error);
  }
  return [];
}

/**
 * Get a single book by slug
 */
export function getBookBySlug(slug: string): Book | null {
  const books = getBooks();
  return books.find((book) => book.slug === slug) || null;
}

/**
 * Create a new book
 */
export function createBook(book: Omit<Book, "id" | "publishDate">): Book {
  const books = getBooks();
  const newBook: Book = {
    ...book,
    id: Date.now().toString(),
    publishDate: new Date().toISOString(),
  };
  books.push(newBook);
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
  return newBook;
}

/**
 * Update a book
 */
export function updateBook(id: string, updates: Partial<Book>): Book | null {
  const books = getBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return null;

  books[index] = {
    ...books[index],
    ...updates,
    id: books[index].id, // Prevent ID change
    publishDate: books[index].publishDate, // Prevent date change
  };
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
  return books[index];
}

/**
 * Delete a book
 */
export function deleteBook(id: string): boolean {
  const books = getBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
  return true;
}
