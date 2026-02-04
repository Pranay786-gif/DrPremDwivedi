'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  Stack,
  Chip,
  Typography,
} from '@mui/material';
import { BookCardPublic } from '@/components/BookCardPublic';
import { Book } from '@/types';
import { motion } from 'framer-motion';
import { Search } from '@mui/icons-material';

const MotionBox = motion(Box);

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        const booksData = data.data || [];
        setBooks(booksData);

        // Extract unique genres
        const genres = Array.from(
          new Set(booksData.flatMap((book: Book) => book.genres))
        ) as string[];
        setAllGenres(genres);

        filterBooks(booksData, '', null);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = (
    booksToFilter: Book[],
    search: string,
    genre: string | null
  ) => {
    let result = booksToFilter;

    if (search) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      result = result.filter((book) => book.genres.includes(genre));
    }

    setFilteredBooks(result);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterBooks(books, value, selectedGenre);
  };

  const handleGenreSelect = (genre: string) => {
    const newGenre = selectedGenre === genre ? null : genre;
    setSelectedGenre(newGenre);
    filterBooks(books, searchTerm, newGenre);
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 8, pb: 8, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Books
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Discover my published works and get your copies from your favorite retailer
          </Typography>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          sx={{ mb: 6 }}
        >
          <TextField
            fullWidth
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 2, color: '#e94560' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'white',
                fontSize: '1.1rem',
              },
            }}
          />
        </MotionBox>

        {allGenres.length > 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{ mb: 6 }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Filter by Genres:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {allGenres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onClick={() => handleGenreSelect(genre)}
                  color={selectedGenre === genre ? 'primary' : 'default'}
                  variant={selectedGenre === genre ? 'filled' : 'outlined'}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Stack>
          </MotionBox>
        )}

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography>Loading books...</Typography>
          </Box>
        ) : filteredBooks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="textSecondary">
              No books found. Try adjusting your search filters.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {filteredBooks.map((book, index) => (
              <BookCardPublic key={book.id} book={book} index={index} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
