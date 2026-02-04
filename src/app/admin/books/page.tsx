'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Stack, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { BookForm } from '@/components/BookForm';
import { BookGrid } from '@/components/BookGrid';
import { Book } from '@/types';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function BookAdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setMessage({ type: 'error', text: 'Failed to fetch books' });
    }
  };

  const handleOpenForm = () => {
    setSelectedBook(undefined);
    setFormOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedBook(undefined);
  };

  const handleFormSubmit = async (book: Omit<Book, 'id' | 'publishDate'>) => {
    setLoading(true);
    try {
      let response;
      if (selectedBook) {
        response = await fetch('/api/books', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedBook.id, ...book }),
        });
      } else {
        response = await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        });
      }

      if (response.ok) {
        setMessage({ type: 'success', text: selectedBook ? 'Book updated!' : 'Book added!' });
        await fetchBooks();
        handleFormClose();
      } else {
        setMessage({ type: 'error', text: 'Failed to save book' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving book' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/books?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Book deleted!' });
        await fetchBooks();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete book' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting book' });
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
              Book Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your books and purchase links
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={handleOpenForm}
          >
            Add Book
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

        <BookGrid
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          loading={loading}
        />
      </MotionBox>

      <BookForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedBook}
        loading={loading}
      />
    </Container>
  );
}
