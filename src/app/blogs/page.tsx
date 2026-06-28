"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import { BlogCard } from "@/components/BlogCard";
import { BlogPost } from "@/types";
import { motion } from "framer-motion";
import { Search } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (response.ok) {
        const data = await response.json();
        const blogsData = data.data || [];
        setBlogs(blogsData);

        // Extract unique tags
        const tags = Array.from(
          new Set(blogsData.flatMap((blog: BlogPost) => blog.tags)),
        ) as string[];
        setAllTags(tags);

        filterBlogs(blogsData, "", null);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = (
    blogsToFilter: BlogPost[],
    search: string,
    tag: string | null,
  ) => {
    let result = blogsToFilter;

    if (search) {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (tag) {
      result = result.filter((blog) => blog.tags.includes(tag));
    }

    setFilteredBlogs(result);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterBlogs(blogs, value, selectedTag);
  };

  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    filterBlogs(blogs, searchTerm, newTag);
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: 8, pb: 8, backgroundColor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, textAlign: "center" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #1a1a2e 0%, #2F6F4F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Blog Articles
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            Explore my latest thoughts, insights, and stories about writing and
            creativity
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
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 2, color: "#2F6F4F" }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
                fontSize: "1.1rem",
              },
            }}
          />
        </MotionBox>

        {allTags.length > 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{ mb: 6 }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Filter by Tags:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagSelect(tag)}
                  color={selectedTag === tag ? "primary" : "default"}
                  variant={selectedTag === tag ? "filled" : "outlined"}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Stack>
          </MotionBox>
        )}

        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography>Loading articles...</Typography>
          </Box>
        ) : filteredBlogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="textSecondary">
              No articles found. Try adjusting your search filters.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
