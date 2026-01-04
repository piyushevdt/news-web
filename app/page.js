import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import NewsSection from '../components/NewsSection';
import VideoSection from '../components/VideoSection';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <NewspaperIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                News & Video Portal
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <NewspaperIcon sx={{ mr: 0.5, fontSize: 20 }} />
                News
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <OndemandVideoIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Videos
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main">
        <NewsSection />
        <VideoSection />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} News & Video Portal. All rights reserved.
          </Typography>
          <Typography variant="caption" align="center" sx={{ display: 'block', mt: 1 }}>
            Data fetched from external APIs
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}