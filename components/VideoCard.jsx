import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Box,
  Stack,
  Dialog,
  DialogContent,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';

const VideoCard = ({ video }) => {
  const [open, setOpen] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState('');

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Function to extract thumbnail from video URL or generate a placeholder
  useEffect(() => {
    // You can add logic here to get a thumbnail from the video
    // For now, using a placeholder or extracting from URL if possible
    const getThumbnail = () => {
      // If you have a thumbnail field in the API response, use it here
      // Otherwise, use a placeholder or extract from video URL
      return '/video-thumbnail-placeholder.jpg';
    };
    
    // setVideoThumbnail(getThumbnail());
  }, [video]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to format the title
  const formatTitle = (title) => {
    if (!title) return 'Untitled Video';
    
    // Clean up the text if it contains encoding issues
    // The title in your example seems to have encoding issues
    // You might need to handle this based on your actual data
    return title;
  };

  return (
    <>
      <Card sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
          '& .play-overlay': {
            opacity: 1,
          }
        },
        borderRadius: 4,
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-thumbnail-design-template-d16e0222c3b00dd90fc79807c6a9592b_screen.jpg?ts=1651994157"
            alt={formatTitle(video.title)}
            sx={{ 
              objectFit: 'cover',
              backgroundColor: '#e0e0e0' // Fallback background
            }}
            onError={(e) => {
              e.target.src = '/video-thumbnail-placeholder.jpg';
            }}
          />
          <Box
            className="play-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s',
              cursor: 'pointer'
            }}
            onClick={handleClickOpen}
          >
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s',
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            </IconButton>
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {video.category && (
              <Chip
                icon={<CategoryIcon />}
                label={video.category}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
            {video.source && (
              <Chip
                label={video.source}
                size="small"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
          </Stack>
          
          <Typography gutterBottom variant="h6" component="div" sx={{ 
            fontWeight: 'bold',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '64px' // Ensure consistent height for titles
          }}>
            {formatTitle(video.title)}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(video.createdAt)}
            </Typography>
            {video.notify && (
              <Chip
                label="New"
                size="small"
                color="error"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh'
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'black' }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {video.url ? (
            <Box sx={{ 
              width: '100%', 
              height: '0', 
              paddingBottom: '56.25%', // 16:9 aspect ratio
              position: 'relative'
            }}>
              <video
                controls
                autoPlay
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'black'
                }}
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '300px',
              color: 'white'
            }}>
              <Typography>Video URL not available</Typography>
            </Box>
          )}
          
          {video.title && (
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom>
                {formatTitle(video.title)}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Source: {video.source || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(video.createdAt)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;