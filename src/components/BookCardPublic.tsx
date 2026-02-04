'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Book } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { OpenInNew } from '@mui/icons-material';

interface BookCardProps {
  book: Book;
  index?: number;
}

const MotionCard = motion(Card);

export function BookCardPublic({ book, index = 0 }: BookCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -12 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3em',
          }}
        >
          {book.title}
        </Typography>

        {book.genres.length > 0 && (
          <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
            {book.genres.map((genre) => (
              <Chip key={genre} label={genre} size="small" variant="outlined" />
            ))}
          </Stack>
        )}

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {book.description}
        </Typography>

        {book.rating && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating value={book.rating} readOnly size="small" />
            <Typography variant="body2" color="textSecondary">
              {book.rating.toFixed(1)}/5
            </Typography>
          </Stack>
        )}

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          endIcon={<OpenInNew />}
          href={book.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 'auto',
          }}
        >
          Buy Now
        </Button>
      </CardContent>
    </MotionCard>
  );
}
