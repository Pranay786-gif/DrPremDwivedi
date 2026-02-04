import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, initializeData } from '@/lib/storage';

// Initialize data on first load
initializeData();

/**
 * GET /api/blogs
 * Get all blog posts or a specific blog by slug
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (slug) {
      const blog = getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json(
          { success: false, error: 'Blog not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    }

    const blogs = getBlogs().sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blogs
 * Create a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBlog = createBlog({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || '',
      content: body.content,
      author: body.author || 'Author',
      featured: body.featured || false,
      image: body.image,
      tags: body.tags || [],
    });

    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blogs
 * Update a blog post
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const updatedBlog = updateBlog(id, updates);
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blogs
 * Delete a blog post
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteBlog(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
