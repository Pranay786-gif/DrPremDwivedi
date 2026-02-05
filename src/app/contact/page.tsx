'use client';

import { Box, Container, Typography, Stack, IconButton, Link as MuiLink, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';

export default function ContactPage() {
  return (
    <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
          pt: 12,
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          {/* Page Title */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              animation: 'fadeInDown 1s ease-out',
              '@keyframes fadeInDown': {
                from: { opacity: 0, transform: 'translateY(-30px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #ffffff 0%, #e94560 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Let&apos;s connect and create something amazing together
            </Typography>
          </Box>

          {/* Contact Card */}
          <Paper
            elevation={24}
            sx={{
              background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.15) 0%, rgba(26, 26, 46, 0.8) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(233, 69, 96, 0.3)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              transition: 'all 0.5s ease',
              animation: 'fadeInUp 1.2s ease-out',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(40px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 20px 60px rgba(233, 69, 96, 0.4)',
                border: '2px solid rgba(233, 69, 96, 0.6)',
              },
            }}
          >
            {/* Profile Icon with Animation */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e94560 0%, #0f3460 100%)',
                mb: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(233, 69, 96, 0.7)' },
                  '50%': { boxShadow: '0 0 0 20px rgba(233, 69, 96, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(233, 69, 96, 0)' },
                },
              }}
            >
              <PersonIcon sx={{ fontSize: 60, color: 'white' }} />
            </Box>

            {/* Author Name */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 1,
                animation: 'slideInLeft 1s ease-out',
                '@keyframes slideInLeft': {
                  from: { opacity: 0, transform: 'translateX(-50px)' },
                  to: { opacity: 1, transform: 'translateX(0)' },
                },
              }}
            >
              Dr. Prem Dwivedi
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                mb: 4,
                fontStyle: 'italic',
              }}
            >
              Author • Writer • Thought Leader
            </Typography>

            {/* Email Section */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                mb: 5,
                p: 2,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                animation: 'slideInRight 1.2s ease-out',
                '@keyframes slideInRight': {
                  from: { opacity: 0, transform: 'translateX(50px)' },
                  to: { opacity: 1, transform: 'translateX(0)' },
                },
                '&:hover': {
                  background: 'rgba(233, 69, 96, 0.1)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <EmailIcon sx={{ fontSize: 28, color: '#e94560' }} />
              <MuiLink
                href="mailto:dwivedi.prem@gmail.com"
                sx={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#e94560',
                    textDecoration: 'underline',
                  },
                }}
              >
                dwivedi.prem@gmail.com
              </MuiLink>
            </Stack>

            {/* Divider */}
            <Box
              sx={{
                width: '80%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #e94560 50%, transparent 100%)',
                mx: 'auto',
                mb: 4,
              }}
            />

            {/* Social Media Section */}
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 3,
                fontWeight: 600,
              }}
            >
              Connect With Me
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{
                animation: 'bounceIn 1.5s ease-out',
                '@keyframes bounceIn': {
                  '0%': { opacity: 0, transform: 'scale(0.3)' },
                  '50%': { opacity: 1, transform: 'scale(1.1)' },
                  '70%': { transform: 'scale(0.9)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              {/* Facebook */}
              <IconButton
                component="a"
                href="https://www.facebook.com/share/18WAqpo7Yc/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    backgroundColor: '#1877F2',
                    transform: 'translateY(-10px) rotate(360deg)',
                    boxShadow: '0 15px 40px rgba(24, 119, 242, 0.5)',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 35 }} />
              </IconButton>

              {/* Instagram */}
              <IconButton
                component="a"
                href="https://www.instagram.com/premdwivedi21?igsh=dWY1ZDR6ZXdkZDlu&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    transform: 'translateY(-10px) rotate(360deg)',
                    boxShadow: '0 15px 40px rgba(225, 48, 108, 0.5)',
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: 35 }} />
              </IconButton>

              {/* LinkedIn */}
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/dr-prem-dwivedi-7b209457?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    backgroundColor: '#0A66C2',
                    transform: 'translateY(-10px) rotate(360deg)',
                    boxShadow: '0 15px 40px rgba(10, 102, 194, 0.5)',
                  },
                }}
              >
                <LinkedInIcon sx={{ fontSize: 35 }} />
              </IconButton>
            </Stack>

            {/* Additional Info */}
            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  mb: 1,
                }}
              >
                📍 Adelaide, Australia
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Available for collaborations and speaking engagements
              </Typography>
            </Box>
          </Paper>

          {/* Additional Floating Elements */}
          <Box
            sx={{
              mt: 4,
              textAlign: 'center',
              animation: 'fadeIn 2s ease-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontStyle: 'italic',
              }}
            >
              &quot;Let&apos;s start a conversation that matters&quot;
            </Typography>
          </Box>
        </Container>
      </Box>
  );
}
