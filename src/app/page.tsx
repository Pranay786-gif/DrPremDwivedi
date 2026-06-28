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
    <Box sx={{ width: "100%", overflow: "hidden", backgroundColor: "#fcfbfc" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1621944190272-ec775aad58d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "white",
          position: "relative",
          overflow: "hidden",
          pt: { xs: 12, md: 8 },
          pb: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            background:
              "linear-gradient(135deg, rgba(20, 30, 26, 0.85) 0%, rgba(35, 25, 20, 0.75) 100%)",
          },
        }}
      >
        {/* Modern Morphing Abstract Background Blurs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            borderRadius: [
              "42% 58% 70% 30% / 45% 45% 55% 55%",
              "70% 30% 52% 48% / 60% 40% 60% 40%",
              "42% 58% 70% 30% / 45% 45% 55% 55%",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "rgba(47, 111, 79, 0.25)",
            filter: "blur(60px)",
            zIndex: 1,
          }}
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            borderRadius: [
              "50% 50% 30% 70% / 50% 60% 40% 50%",
              "30% 70% 70% 30% / 50% 30% 70% 50%",
              "50% 50% 30% 70% / 50% 60% 40% 50%",
            ],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            position: "absolute",
            bottom: "5%",
            left: "2%",
            width: "350px",
            height: "350px",
            background: "rgba(197, 245, 180, 0.15)",
            filter: "blur(50px)",
            zIndex: 1,
          }}
        />

        {/* Floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.sin(i) * 60, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + i * 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              background: "#c5f5b4",
              borderRadius: "50%",
              top: `${25 + i * 12}%`,
              left: `${15 + i * 15}%`,
              zIndex: 1,
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Stack
              spacing={4}
              alignItems="flex-start"
              sx={{ maxWidth: "800px" }}
            >
              <Box>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#c5f5b4",
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Welcome to My Digital Space
                  </Typography>
                </motion.div>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.8rem", sm: "4rem", md: "5rem" },
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  The Author's Memory Lantern
                </Typography>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1.35rem", md: "1.75rem" },
                      fontWeight: 300,
                      mb: 5,
                      maxWidth: "650px",
                      lineHeight: 1.4,
                      color: "rgba(255, 255, 255, 0.85)",
                    }}
                  >
                    Memoirs, Reflections and Stories of Belonging
                  </Typography>
                </motion.div>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                sx={{ width: "100%", maxWidth: "500px" }}
              >
                <motion.div
                  style={{ width: "100%", flex: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component={Link}
                    href="/blogs"
                    variant="contained"
                    size="large"
                    sx={{
                      width: "100%",
                      background: "#2F6F4F",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      py: 2,
                      px: 4,
                      borderRadius: "12px",
                      boxShadow: "0 8px 25px rgba(47, 111, 79, 0.4)",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "#23533b",
                        boxShadow: "0 12px 30px rgba(47, 111, 79, 0.5)",
                      },
                    }}
                    endIcon={<ArrowRight />}
                  >
                    Read Blog
                  </Button>
                </motion.div>

                <motion.div
                  style={{ width: "100%", flex: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component={Link}
                    href="/books"
                    variant="outlined"
                    size="large"
                    sx={{
                      width: "100%",
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      py: 2,
                      px: 4,
                      borderRadius: "12px",
                      textTransform: "none",
                      backdropFilter: "blur(4px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                        boxShadow: "0 0 25px rgba(255, 255, 255, 0.2)",
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
      <Box sx={{ py: 12, backgroundColor: "#ffffff", position: "relative" }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#141e1a",
                letterSpacing: "-0.01em",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -12,
                  left: "25%",
                  width: "50%",
                  height: "4px",
                  backgroundColor: "#2F6F4F",
                  borderRadius: "2px",
                },
              }}
            >
              About Dr. Prem Dwivedi
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "45% 55%" },
              gap: 6,
              alignItems: "start",
            }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              sx={{
                height: { xs: "400px", sm: "500px", md: "580px" },
                position: "sticky",
                top: "40px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(20,30,26,0.12)",
                  height: "100%",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src="/author-photo.png"
                  alt="Dr. Prem Dwivedi - Author"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(20, 30, 26, 0.85) 60%, rgba(10, 15, 13, 0.98) 100%)",
                    padding: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "white", mb: 0.5 }}
                  >
                    Dr. Prem Dwivedi
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#c5f5b4",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Scientist & Storyteller
                  </Typography>
                </Box>
              </Box>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Stack spacing={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: 1.85,
                    color: "#3A4742",
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
                    fontSize: "1.125rem",
                    lineHeight: 1.85,
                    color: "#3A4742",
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
                    fontSize: "1.125rem",
                    lineHeight: 1.85,
                    color: "#3A4742",
                  }}
                >
                  Alongside his scientific achievements, Dr Dwivedi has
                  developed a passion for storytelling rooted in memory,
                  migration, and lived experience. His writing journey was
                  nurtured through the Burnside Writers Group in Adelaide, and
                  his first nonfiction stories appeared in the 2025 anthology{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "#2F6F4F" }}
                  >
                    Tall Tales & True.
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: 1.85,
                    color: "#3A4742",
                    p: 3,
                    backgroundColor: "#f4fcf7",
                    borderRadius: "16px",
                    borderLeft: "5px solid #2F6F4F",
                  }}
                >
                  In 2026, his autobiography, The Unlikely Indian Migrant,
                  became a{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "#2F6F4F" }}
                  >
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
                    fontSize: "1.125rem",
                    lineHeight: 1.85,
                    color: "#3A4742",
                  }}
                >
                  Through both science and storytelling, Dr Dwivedi explores
                  universal themes of identity, perseverance, cultural
                  transition, and the enduring connection between people and
                  their roots. Thank you for visiting and sharing this journey.
                </Typography>
              </Stack>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* CTA Section (Dynamic Mid-Break) */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #ffffff 0%, #24352f 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", position: "relative", zIndex: 2 }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.01em" }}
            >
              Let's Connect
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 5,
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "700px",
                mx: "auto",
                fontWeight: 300,
              }}
            >
              Interested in my work? Explore my articles and books, or get in
              touch to discuss collaborations and opportunities.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                sx={{
                  background: "#2F6F4F",
                  color: "white",
                  px: 5,
                  py: 1.8,
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { background: "#23533b" },
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
                  px: 5,
                  py: 1.8,
                  borderRadius: "10px",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#141e1a",
                    borderColor: "white",
                    transform: "translateY(-2px)",
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
      <Box sx={{ py: 12, backgroundColor: "#f8fbf9" }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2, color: "#141e1a" }}
            >
              What You'll Find Here
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "600px",
                mx: "auto",
                color: "#60726a",
                fontSize: "1.1rem",
              }}
            >
              Explore a carefully curated collection of my thoughts, works, and
              creative endeavors
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 4,
            }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(47,111,79,0.08)",
                  }}
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    borderRadius: "20px",
                    border: "1px solid rgba(47,111,79,0.05)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: "#ffffff",
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    <Box
                      sx={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "#f4fcf7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: "2.25rem",
                          color: "#2F6F4F",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#141e1a" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#60726a",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
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
        <Box sx={{ py: 12, backgroundColor: "#ffffff" }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mb: 6,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, mb: 1, color: "#141e1a" }}
                >
                  Latest Articles
                </Typography>
                <Typography variant="body1" sx={{ color: "#60726a" }}>
                  Thoughts and insights from my writing journey
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/blogs"
                variant="text"
                endIcon={<ArrowRight />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "#2F6F4F",
                  fontWeight: 600,
                  "&:hover": { background: "rgba(47,111,79,0.05)" },
                }}
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
                gap: 4,
              }}
            >
              {featuredBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 5,
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                sx={{ background: "#2F6F4F", borderRadius: "10px", px: 4 }}
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
        <Box sx={{ py: 12, backgroundColor: "#f8fbf9" }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mb: 6,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, mb: 1, color: "#141e1a" }}
                >
                  My Books
                </Typography>
                <Typography variant="body1" sx={{ color: "#60726a" }}>
                  Check out my published works
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/books"
                variant="text"
                endIcon={<ArrowRight />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "#2F6F4F",
                  fontWeight: 600,
                  "&:hover": { background: "rgba(47,111,79,0.05)" },
                }}
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
                gap: 4,
              }}
            >
              {featuredBooks.map((book, index) => (
                <BookCardPublic key={book.id} book={book} index={index} />
              ))}
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 5,
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                component={Link}
                href="/books"
                variant="contained"
                sx={{ background: "#2F6F4F", borderRadius: "10px", px: 4 }}
                endIcon={<ArrowRight />}
              >
                View All Books
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* Bottom CTA Section */}
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, #ffffff 0%, #112620 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2.5, letterSpacing: "-0.01em" }}
            >
              Start Exploring Today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 5,
                fontSize: "1.15rem",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 300,
              }}
            >
              Dive into my collection of articles and books
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/blogs"
                variant="contained"
                size="large"
                sx={{
                  background: "#2F6F4F",
                  fontSize: "1rem",
                  fontWeight: 600,
                  py: 1.6,
                  px: 4,
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": { background: "#23533b" },
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
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  py: 1.6,
                  px: 4,
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
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
