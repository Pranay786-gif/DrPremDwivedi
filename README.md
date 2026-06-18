# Author Portfolio - Blog & Books Showcase

A professional, modern author portfolio website built with Next.js, TypeScript, and Material UI. This website allows authors to showcase their blog articles and published books with a beautiful, animated user interface.

## 🌟 Features

### For Authors (Admin Panel)

- **Blog Management**: Create, edit, and delete blog posts with rich markdown support
- **Book Management**: Add and manage published books with cover images and purchase links
- **Tag System**: Organize blog posts with custom tags for easy filtering
- **Beautiful Admin Dashboard**: Intuitive interface for managing all content

### For Visitors

- **Home Page**: Eye-catching landing page with featured articles and books
- **Blog Section**: Browse all articles with search and tag filtering capabilities
- **Books Section**: Discover published works with genre filtering and ratings
- **Individual Article Pages**: Full markdown rendering with beautiful typography
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations throughout for an engaging experience

## 🛠 Tech Stack

- **Frontend Framework**: [Next.js 16.1.6](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **UI Library**: [Material UI (MUI) v5](https://mui.com)
- **Styling**: Emotion (CSS-in-JS) with MUI theming
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Markdown**: [marked](https://marked.js.org) for markdown rendering
- **Package Manager**: npm

## 📋 Project Structure

```
auther-site/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── blogs/
│   │   │   │   └── route.ts       # Blog CRUD API
│   │   │   └── books/
│   │   │       └── route.ts       # Books CRUD API
│   │   ├── admin/
│   │   │   ├── blogs/
│   │   │   │   └── page.tsx       # Blog management page
│   │   │   ├── books/
│   │   │   │   └── page.tsx       # Books management page
│   │   │   └── page.tsx           # Admin dashboard
│   │   ├── blogs/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx       # Individual blog post
│   │   │   └── page.tsx           # Blog listing page
│   │   ├── books/
│   │   │   └── page.tsx           # Books showcase page
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Footer.tsx             # Footer component
│   │   ├── BlogCard.tsx           # Blog article card (public)
│   │   ├── BlogForm.tsx           # Blog creation/edit form
│   │   ├── BlogList.tsx           # Blog management table
│   │   ├── BookCardPublic.tsx     # Book showcase card
│   │   ├── BookGrid.tsx           # Books management grid
│   │   ├── BookForm.tsx           # Book creation/edit form
│   │   └── MuiThemeProvider.tsx   # Theme wrapper
│   ├── lib/
│   │   ├── storage.ts             # Data persistence layer (JSON files)
│   │   ├── theme.ts               # MUI custom theme
│   │   └── utils.ts               # Utility functions
│   └── types/
│       └── index.ts               # TypeScript interfaces and types
├── public/
│   ├── data/                      # Blog and book data (auto-generated)
│   │   ├── blogs.json
│   │   └── books.json
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or enter the project directory**:

```bash
cd auther-site
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the development server**:

```bash
npm run dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

### Admin Dashboard

Access the admin panel at `/admin` to manage your content.

#### Adding a Blog Post

1. Go to `/admin/blogs`
2. Click "New Blog Post"
3. Fill in the form with:
   - **Title**: Article title
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Excerpt**: Brief summary
   - **Content**: Full article content (Markdown supported)
   - **Author**: Author name
   - **Tags**: Add relevant tags
4. Click "Save"

#### Adding a Book

1. Go to `/admin/books`
2. Click "Add Book"
3. Fill in the form with:
   - **Title**: Book title
   - **Slug**: URL-friendly version
   - **Description**: Book summary
   - **Cover Image**: Image URL
   - **Genres**: Book genres
   - **Purchase Link**: Amazon or retailer link
   - **Rating**: (Optional) Star rating
4. Click "Save"

## 🎨 Customization

### Theme Colors

Edit `src/lib/theme.ts` to customize colors:

- Primary color: `#1a1a2e` (dark blue)
- Secondary color: `#8EE53F` (kiwi green)

### Typography

Customize fonts and sizes in the theme file. Currently uses:

- **Headers**: Playfair Display (elegant serif)
- **Body**: Poppins (modern sans-serif)

### Content Storage

By default, data is stored in JSON files at `public/data/`. To use a database:

1. Modify `src/lib/storage.ts` to use your database
2. Update API routes in `src/app/api/`

## 🔧 Available Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Run production build
npm run start

# Linting
npm run lint
```

## 📊 Data Management

### Blog Posts Structure

```typescript
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // Markdown supported
  author: string;
  publishDate: string;
  updatedDate: string;
  featured: boolean;
  image?: string;
  tags: string[];
}
```

### Books Structure

```typescript
{
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: string;
  publishDate: string;
  purchaseLinkAmazon: string;
  purchaseLinkPothi: string;
  featured: boolean;
  genres: string[];
  rating?: number;
}
```

## 🎯 Features Highlight

### Animations

- Smooth page transitions with Framer Motion
- Card hover effects that lift up
- Staggered animations on item lists
- Gradient text animations

### Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation

### Performance

- Next.js optimizations (Code splitting, Image optimization)
- Static generation where possible
- Efficient API routes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

For issues or questions, please create an issue in the project repository.

---

**Happy blogging! 📝📚**
