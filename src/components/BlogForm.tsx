'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';

interface BlogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (blog: Omit<BlogPost, 'id' | 'publishDate' | 'updatedDate'>) => Promise<void>;
  initialData?: BlogPost;
  loading?: boolean;
}

export function BlogForm({ open, onClose, onSubmit, initialData, loading = false }: BlogFormProps) {
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'publishDate' | 'updatedDate'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Author Name',
    featured: false,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      const { id, publishDate, updatedDate, ...data } = initialData;
      setFormData(data);
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Author Name',
        featured: false,
        tags: [],
      });
    }
    setTagInput('');
  }, [initialData, open]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
        {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Slug"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          fullWidth
          required
          helperText="URL-friendly version of the title"
        />
        <TextField
          label="Excerpt"
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Content (Markdown supported)"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          fullWidth
          multiline
          rows={8}
          required
        />
        <TextField
          label="Author"
          value={formData.author}
          onChange={(e) => handleChange('author', e.target.value)}
          fullWidth
        />

        <Box>
          <Stack direction="row" gap={1} sx={{ mb: 1 }}>
            <TextField
              label="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag();
                }
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button
              onClick={handleAddTag}
              variant="outlined"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Tag
            </Button>
          </Stack>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
