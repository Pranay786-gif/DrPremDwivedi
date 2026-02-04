'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import { BlogPost } from '@/types';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface BlogListProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const MotionTableRow = motion(TableRow);

export function BlogList({ blogs, onEdit, onDelete, loading = false }: BlogListProps) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Slug</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Published</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                No blogs yet. Create your first blog post!
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog, index) => (
              <MotionTableRow
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(233, 69, 96, 0.05)',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ fontWeight: 500, color: '#1a1a2e' }}>{blog.title}</Box>
                </TableCell>
                <TableCell sx={{ color: '#777' }}>{blog.slug}</TableCell>
                <TableCell sx={{ color: '#777' }}>{blog.author}</TableCell>
                <TableCell sx={{ color: '#777' }}>
                  {new Date(blog.publishDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => onEdit(blog)}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => onDelete(blog.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </MotionTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
