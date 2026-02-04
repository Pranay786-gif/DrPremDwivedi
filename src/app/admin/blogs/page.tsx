'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Stack, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { BlogForm } from '@/components/BlogForm';
import { BlogList } from '@/components/BlogList';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | undefined>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setMessage({ type: 'error', text: 'Failed to fetch blogs' });
    }
  };

  const handleOpenForm = () => {
    setSelectedBlog(undefined);
    setFormOpen(true);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedBlog(undefined);
  };

  const handleFormSubmit = async (blog: Omit<BlogPost, 'id' | 'publishDate' | 'updatedDate'>) => {
    setLoading(true);
    try {
      let response;
      if (selectedBlog) {
        response = await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedBlog.id, ...blog }),
        });
      } else {
        response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog),
        });
      }

      if (response.ok) {
        setMessage({ type: 'success', text: selectedBlog ? 'Blog updated!' : 'Blog created!' });
        await fetchBlogs();
        handleFormClose();
      } else {
        setMessage({ type: 'error', text: 'Failed to save blog' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving blog' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog deleted!' });
        await fetchBlogs();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete blog' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting blog' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Blog Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Create, edit, and manage your blog posts
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={handleOpenForm}
          >
            New Blog Post
          </Button>
        </Stack>

        {message && (
          <Alert
            severity={message.type}
            onClose={() => setMessage(null)}
            sx={{ mb: 3 }}
          >
            {message.text}
          </Alert>
        )}

        <BlogList
          blogs={blogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          loading={loading}
        />
      </MotionBox>

      <BlogForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedBlog}
        loading={loading}
      />
    </Container>
  );
}
