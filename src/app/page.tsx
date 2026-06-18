"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Article, MenuBook, Lightbulb } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { BookCardPublic } from "@/components/BookCardPublic";
import { BlogPost, Book } from "@/types";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const [blogsRes, booksRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/books"),
      ]);

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        const blogs = (blogsData.data || []).slice(0, 3);
        setFeaturedBlogs(blogs);
      }

      if (booksRes.ok) {
        const booksData = await booksRes.json();
        const books = (booksData.data || []).slice(0, 3);
        setFeaturedBooks(books);
      }
    } catch (error) {
      console.error("Failed to fetch featured content:", error);
    }
  };

  const features = [
    {
      icon: Article,
      title: "Fresh Content",
      description:
        "Regularly updated blog posts about writing, creativity, and storytelling",
    },
    {
      icon: MenuBook,
      title: "Published Works",
      description:
        "Browse and purchase my published books from your favorite retailer",
    },
    {
      icon: Lightbulb,
      title: "Inspiring Stories",
      description: "Discover insights and experiences from my writing journey",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          // background: "white",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1621944190272-ec775aad58d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "white",
          position: "relative",
          overflow: "hidden",
          pt: 8,
          pb: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          },
        }}
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            background: "rgba(233, 69, 96, 0.1)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "250px",
            height: "250px",
            background: "rgba(255, 107, 122, 0.1)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />

        {/* Floating particles effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#8EE53F",
              borderRadius: "50%",
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={4} alignItems="flex-start">
              <Box>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#654321",
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "2rem",
                    }}
                  >
                    Welcome to My Digital Space
                  </Typography>
                </motion.div>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.1,
                    textShadow: "0 2px 10px rgba(186, 186, 186, 0.3)",
                    background: "#8EE53F",
                    backgroundSize: "200% 200%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradientShift 4s ease infinite",
                  }}
                  style={{
                    animation: "gradientShift 4s ease infinite",
                  }}
                >
                  The Author's Memory Lantern
                </Typography>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "2rem", md: "2rem" },
                      fontWeight: 300,
                      mb: 4,
                      maxWidth: "600px",
                      lineHeight: 1.6,
                      color: "#654321",
                    }}
                  >
                    Memoirs, Reflections and Stories of Belonging
                  </Typography>
                </motion.div>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: "100%", maxWidth: "500px" }}
              >
                <motion.div
                  style={{ width: "100%", flex: 1 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    component={Link}
                    href="/blogs"
                    variant="contained"
                    size="large"
                    sx={{
                      width: "100%",
                      background: "#8EE53F",
                      color: "white",
                      fontSize: "1.1rem",
                      py: 1.5,
                      px: 4,
                      borderRadius: "8px",
                      boxShadow: "0 8px 24px rgba(197, 245, 180, 0.4)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: "0 12px 32px rgba(197, 245, 180, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "0",
                        height: "0",
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "width 0.6s, height 0.6s",
                      },
                      "&:active::before": {
                        width: "300px",
                        height: "300px",
                      },
                    }}
                    endIcon={<ArrowRight />}
                  >
                    Read Blog
                  </Button>
                </motion.div>

                <motion.div
                  style={{ width: "100%", flex: 1 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    component={Link}
                    href="/books"
                    variant="outlined"
                    size="large"
                    sx={{
                      width: "100%",
                      borderColor: "#8EE53F",
                      color: "#8EE53F",
                      fontSize: "1.1rem",
                      py: 1.5,
                      px: 4,
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(197, 245, 180, 0.4)",
                        borderColor: "#8EE53F",
                        color: "#8EE53F",
                        boxShadow: "0 0 20px rgba(197, 245, 180, 0.4)",
                      },
                    }}
                    endIcon={<ArrowRight />}
                  >
                    View Books
                  </Button>
                </motion.div>
              </Stack>
            </Stack>
          </MotionBox>
        </Container>
      </Box>

      {/* Author Bio Section */}
      <Box
        sx={{ py: 8, backgroundColor: "white", borderTop: "1px solid #e0e0e0" }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#1a1a2e",
              }}
            >
              About Dr. Prem Dwivedi
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              height={"100%"}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                }}
              >
                <Image
                  src="/author-photo.png"
                  alt="Dr. Prem Dwivedi - Author"
                  fill
                  style={{ objectFit: "fill" }}
                  unoptimized
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(26, 26, 46, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)",
                    padding: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "white" }}
                  >
                    Dr. Prem Dwivedi
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    Scientist & Storyteller
                  </Typography>
                </Box>
              </Box>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#555",
                  }}
                >
                  Dr Prem Dwivedi is an Australian-based biomedical scientist,
                  storyteller, and immigrant whose remarkable journey from a
                  small village in Uttar Pradesh, India, to an accomplished
                  scientific career in Australia has inspired readers across
                  continents.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#555",
                  }}
                >
                  Over a career spanning more than three decades, Dr Dwivedi has
                  made significant contributions to biomedical research in New
                  Zealand and Australia, particularly in the fields of gene
                  regulation, vitamin D biology, bone health, osteoporosis, and
                  cancer. His work has been published internationally, and he
                  has supervised postgraduate and PhD students while
                  collaborating with leading researchers around the world.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#555",
                  }}
                >
                  Alongside his scientific achievements, Dr Dwivedi has
                  developed a passion for storytelling rooted in memory,
                  migration, and lived experience. His writing journey was
                  nurtured through the Burnside Writers Group in Adelaide, and
                  his first nonfiction stories appeared in the 2025 anthology{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Tall Tales & True.
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#555",
                  }}
                >
                  In 2026, his autobiography, The Unlikely Indian Migrant,
                  became a{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {" "}
                    #1 Amazon Bestseller in Australia.
                  </Box>{" "}
                  The book tells the inspiring story of a village boy who
                  overcame social, educational, and cultural barriers to build a
                  successful life in New Zealand and Australia. It is a moving
                  account of resilience, family sacrifice, migration, and the
                  search for belonging—an experience shared by many migrants who
                  have helped shape modern Australia.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#555",
                  }}
                >
                  Through both science and storytelling, Dr Dwivedi explores
                  universal themes of identity, perseverance, cultural
                  transition, and the enduring connection between people and
                  their roots. Thank you for visiting and sharing this journey.
                </Typography>
              </Box>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Let's Connect
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }}
            >
              Interested in my work? Explore my articles and books, or get in
              touch to discuss collaborations and opportunities.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                sx={{
                  background: "#8EE53F",
                  color: "white",
                  px: 4,
                  py: 1.5,
                }}
                endIcon={<ArrowRight />}
              >
                Read My Blog
              </Button>
              <Button
                component={Link}
                href="/books"
                variant="outlined"
                sx={{
                  borderColor: "white",
                  borderWidth: "2px",
                  color: "white",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1a1a2e",
                    borderColor: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(255,255,255,0.3)",
                  },
                }}
                endIcon={<ArrowRight />}
              >
                Explore Books
              </Button>
            </Stack>
          </MotionBox>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              What You'll Find Here
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ maxWidth: "600px", mx: "auto" }}
            >
              Explore a carefully curated collection of my thoughts, works, and
              creative endeavors
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  sx={{
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ pt: 4, pb: 4 }}>
                    <IconComponent
                      sx={{
                        fontSize: "3rem",
                        color: "#8EE53F",
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 && (
        <Box sx={{ py: 8, backgroundColor: "white" }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 6,
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  Latest Articles
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Thoughts and insights from my writing journey
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/blogs"
                variant="outlined"
                endIcon={<ArrowRight />}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                View All
              </Button>
            </MotionBox>

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
              {featuredBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 4,
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
              >
                View All Articles
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* Featured Books Section */}
      {featuredBooks.length > 0 && (
        <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 6,
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  My Books
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Check out my published works
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/books"
                variant="outlined"
                endIcon={<ArrowRight />}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                View All
              </Button>
            </MotionBox>

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
              {featuredBooks.map((book, index) => (
                <BookCardPublic key={book.id} book={book} index={index} />
              ))}
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 4,
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                component={Link}
                href="/books"
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
              >
                View All Books
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Start Exploring Today
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }}
            >
              Dive into my collection of articles and books, or visit the admin
              panel to manage content
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                size="large"
                sx={{
                  background: "#8EE53F",
                  fontSize: "1rem",
                  py: 1.2,
                  px: 3,
                }}
              >
                Read Articles
              </Button>
              <Button
                component={Link}
                href="/books"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontSize: "1rem",
                  py: 1.2,
                  px: 3,
                }}
              >
                Browse Books
              </Button>
            </Stack>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
