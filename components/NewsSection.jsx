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
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import NewsCard from "./NewsCard";
import { fetchNews } from "../utils/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const [newsPerPage, setNewsPerPage] = useState(12);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const loadNews = async (pageNum) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.innsights.in/news?page=${pageNum}`,
        {
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();

      // Check the actual response structure
      console.log("News API Response:", data);

      // Handle different possible response structures
      if (data.news && Array.isArray(data.news)) {
        setNews(data.news);
      } else if (Array.isArray(data)) {
        setNews(data);
      } else if (data.data && Array.isArray(data.data)) {
        setNews(data.data);
      } else {
        setNews([]);
      }

      // Extract pagination info from response
      // The actual structure might vary, adjust based on your API response
      const pagination = data.pagination || data.meta || {};
      setPaginationInfo({
        currentPage: pagination.currentPage || pagination.page || pageNum,
        totalPages: pagination.totalPages || pagination.pages || 10, // Default fallback
        totalItems:
          pagination.totalItems ||
          pagination.total ||
          (data.news ? data.news.length : 0),
        hasNextPage:
          pagination.hasNextPage ||
          (pagination.currentPage || pageNum) < (pagination.totalPages || 10),
        hasPrevPage:
          pagination.hasPrevPage || (pagination.currentPage || pageNum) > 1,
      });

      // Set total pages for pagination component
      const pages = pagination.totalPages || 10; // Default to 10 if not provided
      setTotalPages(pages);
    } catch (err) {
      setError(`Failed to load news: ${err.message}`);
      console.error("Error loading news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleNewsPerPageChange = (event) => {
    setNewsPerPage(event.target.value);
    // You might need to adjust this based on API support for page size
  };

  // Skeleton loader for news cards
  const renderSkeletons = () => (
    <Grid container spacing={3}>
      {Array.from(new Array(newsPerPage)).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: "100%" }}>
            <Box sx={{ pt: 0.5, px: 2 }}>
              <CircularProgress size={24} />
            </Box>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 20,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: "80%",
                    height: 20,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: "60%",
                    height: 20,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          📰 Latest News
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Stay updated with breaking news, features, and analysis from around
          the world
        </Typography>

        {/* News Stats */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Chip
            label={`Page ${page} of ${totalPages}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${paginationInfo.totalItems || news.length} articles total`}
            variant="outlined"
          />
          {paginationInfo.currentPage && (
            <Chip
              label={`Currently viewing page ${paginationInfo.currentPage}`}
              variant="outlined"
            />
          )}
        </Stack>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => loadNews(page)}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* News Content */}
      {loading && news.length === 0 ? (
        renderSkeletons()
      ) : news.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No news articles available at the moment.
          <Button size="small" onClick={() => loadNews(1)} sx={{ ml: 2 }}>
            Refresh
          </Button>
        </Alert>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {news.map((item) => (
              <Grid
                item
                key={item._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display="flex"
                justifyContent="center"
              >
                <NewsCard news={item} />
              </Grid>
            ))}
          </Grid>

          {/* Enhanced Pagination Controls */}
          {totalPages > 1 && (
            <Box
              sx={{
                mt: 6,
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Stack spacing={3} alignItems="center">
                {/* Page Navigation Info */}
                <Typography variant="body1" color="text.secondary">
                  Showing page {page} of {totalPages} • Total articles:{" "}
                  {paginationInfo.totalItems || "Unknown"}
                </Typography>

                {/* Main Pagination */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {/* First Page */}
                  <Button
                    variant="outlined"
                    onClick={handleFirstPage}
                    disabled={page === 1 || loading}
                    startIcon={<FirstPageIcon />}
                    size="small"
                  >
                    First
                  </Button>

                  {/* Previous Page */}
                  <Button
                    variant="outlined"
                    onClick={handlePrevPage}
                    disabled={page === 1 || loading}
                    startIcon={<ArrowBackIosIcon />}
                    size="small"
                  >
                    Prev
                  </Button>

                  {/* Numeric Pagination */}
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    siblingCount={1}
                    boundaryCount={1}
                    disabled={loading}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />

                  {/* Next Page */}
                  <Button
                    variant="outlined"
                    onClick={handleNextPage}
                    disabled={page === totalPages || loading}
                    endIcon={<ArrowForwardIosIcon />}
                    size="small"
                  >
                    Next
                  </Button>

                  {/* Last Page */}
                  <Button
                    variant="outlined"
                    onClick={handleLastPage}
                    disabled={page === totalPages || loading}
                    endIcon={<LastPageIcon />}
                    size="small"
                  >
                    Last
                  </Button>
                </Stack>

                {/* Quick Jump Controls */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Jump to page:
                  </Typography>
                  <Select
                    value={page}
                    onChange={(e) => setPage(Number(e.target.value))}
                    size="small"
                    sx={{ minWidth: 80 }}
                    disabled={loading}
                  >
                    {Array.from(
                      { length: Math.min(totalPages, 20) },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <MenuItem key={pageNum} value={pageNum}>
                        {pageNum}
                      </MenuItem>
                    ))}
                    {totalPages > 20 && (
                      <MenuItem value={totalPages}>
                        Last ({totalPages})
                      </MenuItem>
                    )}
                  </Select>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>News per page</InputLabel>
                    <Select
                      value={newsPerPage}
                      label="News per page"
                      onChange={handleNewsPerPageChange}
                      disabled // Disable if API doesn't support page size
                    >
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={48}>48</MenuItem>
                      <MenuItem value={96}>96</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                {/* Page Range Display */}
                <Typography variant="caption" color="text.secondary">
                  Pages: 1 ... {Math.max(1, page - 2)} {page > 3 && "..."}
                  <strong> {page} </strong>
                  {page < totalPages - 2 && "..."}{" "}
                  {Math.min(totalPages, page + 2)} ... {totalPages}
                </Typography>
              </Stack>
            </Box>
          )}
        </>
      )}

      {/* Loading indicator at bottom when loading more */}
      {loading && news.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading more news...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default NewsSection;
