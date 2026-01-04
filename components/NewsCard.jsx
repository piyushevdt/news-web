import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Chip,
  Box,
  Stack,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
      },
      borderRadius: 4,
    }}>
      <CardMedia
        component="img"
        height="200"
        image={news.image}
        alt={news.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} mb={2}>
          {news.category && (
            <Chip
              label={news.category.name}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {news.source && (
            <Chip
              icon={<NewspaperIcon />}
              label={news.source}
              size="small"
              variant="outlined"
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
          WebkitBoxOrient: 'vertical'
        }}>
          {news.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          mb: 2
        }}>
          {news.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(news.createdAt)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          href={news.hyper_link} 
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
        >
          Read Full Article
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;