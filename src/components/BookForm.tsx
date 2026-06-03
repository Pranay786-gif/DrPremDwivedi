"use client";

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
  Rating,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Book } from "@/types";

interface BookFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, "id" | "publishDate">) => Promise<void>;
  initialData?: Book;
  loading?: boolean;
}

export function BookForm({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}: BookFormProps) {
  const [formData, setFormData] = useState<Omit<Book, "id" | "publishDate">>({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    author: "Author Name",
    purchaseLinkAmazon: "",
    purchaseLinkPothi: "",
    featured: false,
    genres: [],
    rating: 5,
  });
  const [genreInput, setGenreInput] = useState("");

  useEffect(() => {
    if (initialData) {
      const { id, publishDate, ...data } = initialData;
      setFormData(data);
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        coverImage: "",
        author: "Author Name",
        purchaseLinkAmazon: "",
        purchaseLinkPothi: "",
        featured: false,
        genres: [],
        rating: 5,
      });
    }
    setGenreInput("");
  }, [initialData, open]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genreInput.trim()],
      }));
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.slug ||
      !formData.coverImage ||
      !formData.purchaseLinkAmazon ||
      !formData.purchaseLinkPothi
    ) {
      alert("Please fill in all required fields");
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {initialData ? "Edit Book" : "Add New Book"}
      </DialogTitle>
      <DialogContent
        sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Slug"
          value={formData.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Cover Image URL"
          value={formData.coverImage}
          onChange={(e) => handleChange("coverImage", e.target.value)}
          fullWidth
          required
          helperText="URL to book cover image"
        />
        <TextField
          label="Purchase Link"
          value={formData.purchaseLinkAmazon}
          onChange={(e) => handleChange("purchaseLinkAmazon", e.target.value)}
          fullWidth
          required
          helperText="Amazon link"
        />
        <TextField
          label="Purchase Link"
          value={formData.purchaseLinkPothi}
          onChange={(e) => handleChange("purchaseLinkPothi", e.target.value)}
          fullWidth
          required
          helperText="Pothi Link"
        />
        <TextField
          label="Author"
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          fullWidth
        />

        <Box>
          <Stack direction="row" gap={1} sx={{ mb: 2, alignItems: "center" }}>
            <span>Rating:</span>
            <Rating
              value={formData.rating || 5}
              onChange={(e, value) => handleChange("rating", value)}
              size="large"
            />
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" gap={1} sx={{ mb: 1 }}>
            <TextField
              label="Add genre"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddGenre();
                }
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button
              onClick={handleAddGenre}
              variant="outlined"
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Genre
            </Button>
          </Stack>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {formData.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onDelete={() => handleRemoveGenre(genre)}
                color="secondary"
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
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
