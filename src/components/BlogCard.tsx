"use client";

import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { BlogPost } from "@/types";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "@mui/icons-material";

interface BlogCardProps {
  blog: BlogPost;
  index?: number;
}

const MotionCard = motion(Card);

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8 }}
        sx={{
          height: "100%",
          textDecoration: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #8EE53F 0%, #ff6b7a 100%)",
            height: "4px",
          }}
        />
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
          >
            {blog.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3em",
            }}
          >
            {blog.title}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            {blog.excerpt}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: "auto" }}
          >
            <Stack direction="column" spacing={0.5}>
              <Typography variant="caption" color="textSecondary">
                {blog.author}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatDate(blog.publishDate)}
              </Typography>
            </Stack>
            <ArrowRight
              sx={{
                color: "#8EE53F",
                transition: "transform 0.3s ease",
              }}
            />
          </Stack>
        </CardContent>
      </MotionCard>
    </Link>
  );
}
