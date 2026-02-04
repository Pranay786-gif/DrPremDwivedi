'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { Book } from '@/types';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BookGridProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const MotionCard = motion(Card);

export function BookGrid({ books, onEdit, onDelete, loading = false }: BookGridProps) {
  if (books.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="textSecondary">
          No books added yet. Add your first book!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
      {books.map((book, index) => (
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="div"
              sx={{
                width: '100%',
                paddingTop: '130%',
                backgroundColor: '#f0f0f0',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </CardMedia>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  minHeight: '3em',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {book.title}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {book.description}
              </Typography>

              {book.genres.length > 0 && (
                <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                  {book.genres.map((genre) => (
                    <Chip key={genre} label={genre} size="small" variant="outlined" />
                  ))}
                </Stack>
              )}

              {book.rating && (
                <Typography variant="body2" sx={{ mb: 2, color: '#f39c12' }}>
                  ⭐ {book.rating.toFixed(1)}/5
                </Typography>
              )}

              <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => onEdit(book)}
                  disabled={loading}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => onDelete(book.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </MotionCard>
      ))}
    </Box>
  );
}
