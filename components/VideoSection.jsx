"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Tabs,
  Tab,
  Chip,
  Stack,
} from "@mui/material";
import VideoCard from "./VideoCard";
import { fetchVideos } from "../utils/api";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const loadVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const videoData = await fetchVideos();

      // Check if videoData is an array
      if (Array.isArray(videoData)) {
        setVideos(videoData);
        setFilteredVideos(videoData.slice(0, 12)); // Show 12 videos initially

        // Extract unique categories
        const uniqueCategories = [
          "all",
          ...new Set(
            videoData.filter((v) => v.category).map((v) => v.category)
          ),
        ];
        setCategories(uniqueCategories);
      } else {
        throw new Error("Invalid video data format");
      }
    } catch (err) {
      setError("Failed to load videos. Please try again later.");
      console.error("Error loading videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredVideos(videos.slice(0, 12));
    } else {
      const filtered = videos
        .filter((video) => video.category === selectedCategory)
        .slice(0, 12);
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  if (loading && videos.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading videos...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Featured Videos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Watch the latest videos from various sources
        </Typography>

        {categories.length > 1 && (
          <Box sx={{ width: "100%", mb: 4 }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="video categories"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "medium",
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  label={category}
                  value={category}
                  icon={
                    category === "all" ? null : (
                      <Chip label={category} size="small" />
                    )
                  }
                  iconPosition="end"
                />
              ))}
            </Tabs>
          </Box>
        )}
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={loadVideos}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {filteredVideos.length === 0 && !loading ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No videos available in this category.
          {selectedCategory !== "all" && (
            <Button
              size="small"
              onClick={() => setSelectedCategory("all")}
              sx={{ ml: 2 }}
            >
              View all videos
            </Button>
          )}
        </Alert>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {filteredVideos.map((video) => (
              <Grid
                item
                key={video._id || video.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display="flex"
                justifyContent="center"
              >
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>

          {selectedCategory === "all" && videos.length > 12 && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() =>
                  setFilteredVideos(videos.slice(0, filteredVideos.length + 12))
                }
              >
                Load More Videos
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1 }}
              >
                Showing {filteredVideos.length} of {videos.length} videos
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* Video Statistics */}
      {videos.length > 0 && (
        <Box
          sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Chip label={`Total Videos: ${videos.length}`} variant="outlined" />
            <Chip
              label={`Categories: ${categories.length - 1}`}
              variant="outlined"
            />
            {selectedCategory !== "all" && (
              <Chip
                label={`Current Category: ${selectedCategory}`}
                color="primary"
              />
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default VideoSection;
