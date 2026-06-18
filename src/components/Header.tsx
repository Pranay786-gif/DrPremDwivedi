"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { useState } from "react";

const MotionAppBar = motion(AppBar);

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" },
    { label: "Books", href: "/books" },
    { label: "Contact", href: "/contact" },
  ];

  const handleAdminMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAdminMenuAnchor(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchor(null);
  };

  return (
    <MotionAppBar
      position="sticky"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        backgroundColor: "#fff",
        color: "#1a1a2e",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
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
                    "linear-gradient(135deg, #1a1a2e 0%, #8EE53F 100%)",
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
          </Link>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: isActive(link.href) ? "#8EE53F" : "#1a1a2e",
                  fontWeight: isActive(link.href) ? 600 : 500,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: isActive(link.href) ? "100%" : "0%",
                    height: "2px",
                    backgroundColor: "#8EE53F",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}

            {/* Admin Menu */}
            <Button
              onClick={handleAdminMenuOpen}
              sx={{
                color: pathname.includes("/admin") ? "#8EE53F" : "#1a1a2e",
                fontWeight: pathname.includes("/admin") ? 600 : 500,
              }}
            >
              Admin
            </Button>
            <Menu
              anchorEl={adminMenuAnchor}
              open={Boolean(adminMenuAnchor)}
              onClose={handleAdminMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <MenuItem
                component={Link}
                href="/admin"
                onClick={handleAdminMenuClose}
                sx={{ color: "#1a1a2e" }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={Link}
                href="/admin/blogs"
                onClick={handleAdminMenuClose}
                sx={{ color: "#1a1a2e" }}
              >
                Manage Blogs
              </MenuItem>
              <MenuItem
                component={Link}
                href="/admin/books"
                onClick={handleAdminMenuClose}
                sx={{ color: "#1a1a2e" }}
              >
                Manage Books
              </MenuItem>
            </Menu>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Close /> : <MenuIcon />}
          </IconButton>
        </Stack>
      </Container>

      {/* Mobile Navigation */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { mt: 7, borderRadius: "0 0 12px 12px" },
        }}
      >
        <List sx={{ width: "100%", py: 2 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                color: isActive(link.href) ? "#8EE53F" : "#1a1a2e",
                fontWeight: isActive(link.href) ? 600 : 500,
                py: 1.5,
                px: 3,
                "&:hover": { backgroundColor: "rgba(233, 69, 96, 0.05)" },
              }}
            >
              {link.label}
            </ListItem>
          ))}
          <ListItem
            component={Link}
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              color: pathname.includes("/admin") ? "#8EE53F" : "#1a1a2e",
              fontWeight: pathname.includes("/admin") ? 600 : 500,
              py: 1.5,
              px: 3,
              "&:hover": { backgroundColor: "rgba(233, 69, 96, 0.05)" },
            }}
          >
            Admin Dashboard
          </ListItem>
          <ListItem
            component={Link}
            href="/admin/blogs"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              color: "#1a1a2e",
              py: 1.5,
              px: 3,
              pl: 6,
              "&:hover": { backgroundColor: "rgba(233, 69, 96, 0.05)" },
            }}
          >
            Manage Blogs
          </ListItem>
          <ListItem
            component={Link}
            href="/admin/books"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              color: "#1a1a2e",
              py: 1.5,
              px: 3,
              pl: 6,
              "&:hover": { backgroundColor: "rgba(233, 69, 96, 0.05)" },
            }}
          >
            Manage Books
          </ListItem>
        </List>
      </Drawer>
    </MotionAppBar>
  );
}
