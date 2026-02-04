'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { ArrowBack } from '@mui/icons-material';
import { marked } from 'marked';

const MotionBox = motion(Box);

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data.data);

        // Convert markdown to HTML
        const html = await marked(data.data.content);
        setHtmlContent(html);
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading article...</Typography>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ minHeight: '100vh', pt: 8, pb: 8 }}>
        <Container maxWidth="md">
          <Button
            component={Link}
            href="/blogs"
            startIcon={<ArrowBack />}
            sx={{ mb: 4 }}
          >
            Back to Articles
          </Button>
          <Typography variant="h4">Article not found</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 8, pb: 8, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/blogs"
          startIcon={<ArrowBack />}
          sx={{ mb: 4 }}
        >
          Back to Articles
        </Button>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ backgroundColor: 'white', borderRadius: '12px', p: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {blog.title}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
              {blog.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" size="small" />
              ))}
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mb: 4, pb: 4 }}>
              <Stack direction="column" spacing={0.5}>
                <Typography variant="body2" color="textSecondary">
                  By <strong>{blog.author}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Published on {formatDate(blog.publishDate)}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Box
              sx={{
                '& h1': { fontSize: '2.5rem', fontWeight: 700, mt: 3, mb: 2 },
                '& h2': { fontSize: '2rem', fontWeight: 700, mt: 3, mb: 2 },
                '& h3': { fontSize: '1.5rem', fontWeight: 600, mt: 2, mb: 1.5 },
                '& p': { fontSize: '1.1rem', lineHeight: 1.8, mb: 2, color: '#555' },
                '& strong': { fontWeight: 600 },
                '& em': { fontStyle: 'italic' },
                '& ul': { mb: 2, pl: 3 },
                '& ol': { mb: 2, pl: 3 },
                '& li': { mb: 1, lineHeight: 1.7 },
                '& code': {
                  backgroundColor: '#f5f5f5',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                },
                '& pre': {
                  backgroundColor: '#1a1a2e',
                  color: '#fff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  mb: 2,
                },
                '& blockquote': {
                  borderLeft: '4px solid #e94560',
                  paddingLeft: '1.5rem',
                  marginLeft: 0,
                  marginRight: 0,
                  my: 2,
                  fontStyle: 'italic',
                  color: '#666',
                },
                '& a': {
                  color: '#e94560',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
