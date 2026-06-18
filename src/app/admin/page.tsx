"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { Article, MenuBook, Dashboard } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function AdminPage() {
  const [stats, setStats] = useState({ blogs: 0, books: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, booksRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/books"),
      ]);

      if (blogsRes.ok && booksRes.ok) {
        const blogsData = await blogsRes.json();
        const booksData = await booksRes.json();
        setStats({
          blogs: blogsData.data?.length || 0,
          books: booksData.data?.length || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const adminCards = [
    {
      title: "Blog Management",
      description: "Create, edit, and manage your blog posts",
      icon: Article,
      href: "/admin/blogs",
      stats: `${stats.blogs} posts`,
      color: "#8EE53F",
    },
    {
      title: "Book Management",
      description: "Manage your books and purchase links",
      icon: MenuBook,
      href: "/admin/books",
      stats: `${stats.books} books`,
      color: "#1a1a2e",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 6 }}
      >
        <Stack
          alignItems="center"
          spacing={2}
          sx={{ mb: 6, textAlign: "center" }}
        >
          <Dashboard sx={{ fontSize: "3rem", color: "#8EE53F" }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ maxWidth: "600px" }}
          >
            Welcome to your author portfolio management dashboard. Manage your
            blog posts and books from here.
          </Typography>
        </Stack>
      </MotionBox>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {adminCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Box key={card.href} sx={{ flex: 1 }}>
              <Link href={card.href} style={{ textDecoration: "none" }}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
                    borderLeft: `4px solid ${card.color}`,
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: "2.5rem",
                        color: card.color,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {card.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: card.color,
                        alignSelf: "flex-start",
                      }}
                    >
                      {card.stats}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Link>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}
