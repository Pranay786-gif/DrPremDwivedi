"use client";

import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" },
    { label: "Books", href: "/books" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a2e",
        color: "white",
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Links Section */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={4}
          >
            {/* Logo and Description */}
            <Stack spacing={2} sx={{ maxWidth: "300px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  style={{
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                  priority
                  unoptimized
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    display: { xs: "none", sm: "block" },
                    background:
                      "linear-gradient(135deg, #b6b6cb 0%, #8EE53F 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      textShadow: "0 0 20px rgba(233, 69, 96, 0.4)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Dr Prem Dwivedi
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                A personal portfolio showcasing my blog articles and published
                books. Dive into my creative world.
              </Typography>
            </Stack>

            {/* Navigation Links */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Navigation
              </Typography>
              {links.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.95rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#8EE53F",
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>

            {/* Contact */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Contact
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Email: premdwivedi.writer@outlook.com.au
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Location: Adelaide, Australia
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Copyright */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={0.5}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)" }}
              >
                © Dr Prem Dwivedi. All rights reserved.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)" }}
              >
                Country - Australia
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <MuiLink
                href="#"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#8EE53F" },
                }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                href="#"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#8EE53F" },
                }}
              >
                Terms of Service
              </MuiLink>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
