'use client';

import { Box, Container, Stack, Typography, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Books', href: '/books' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a2e',
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Links Section */}
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4}>
            {/* Logo and Description */}
            <Stack spacing={2} sx={{ maxWidth: '300px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #e94560 0%, #ff6b7a 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                  }}
                >
                  A
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Author Site
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                A personal portfolio showcasing my blog articles and published books. Dive into my creative world.
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
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#e94560',
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
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Email: dwivedi.prem@gamil.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Location: Adelaide, Australia
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Copyright */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {currentYear} Author Portfolio. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <MuiLink
                href="#"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#e94560' },
                }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                href="#"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#e94560' },
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
