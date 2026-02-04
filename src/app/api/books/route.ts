import { NextRequest, NextResponse } from 'next/server';
import { getBooks, getBookBySlug, createBook, updateBook, deleteBook, initializeData } from '@/lib/storage';

// Initialize data on first load
initializeData();

/**
 * GET /api/books
 * Get all books or a specific book by slug
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (slug) {
      const book = getBookBySlug(slug);
      if (!book) {
        return NextResponse.json(
          { success: false, error: 'Book not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: book });
    }

    const books = getBooks().sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books
 * Create a new book
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.coverImage || !body.purchaseLink) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBook = createBook({
      title: body.title,
      slug: body.slug,
      description: body.description || '',
      coverImage: body.coverImage,
      author: body.author || 'Author',
      purchaseLink: body.purchaseLink,
      featured: body.featured || false,
      genres: body.genres || [],
      rating: body.rating,
    });

    return NextResponse.json({ success: true, data: newBook }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create book' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/books
 * Update a book
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Book ID is required' },
        { status: 400 }
      );
    }

    const updatedBook = updateBook(id, updates);
    if (!updatedBook) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedBook });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/books
 * Delete a book
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Book ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteBook(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
