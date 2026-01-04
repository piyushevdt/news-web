'use client';

import React from 'react';
import {
  Box,
  Stack,
  Button,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Chip,
} from '@mui/material';
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';

const PaginationControls = ({
  page,
  totalPages,
  loading,
  onPageChange,
  onFirstPage,
  onLastPage,
  onPrevPage,
  onNextPage,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  // Calculate visible page range
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Stack spacing={3} alignItems="center">
        {/* Stats */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="center">
          <Chip 
            label={`Page ${page} of ${totalPages}`}
            color="primary"
            variant="outlined"
          />
          {totalItems && (
            <Chip 
              label={`${totalItems} total items`}
              variant="outlined"
            />
          )}
          <Typography variant="body2" color="text.secondary">
            Showing {itemsPerPage} items per page
          </Typography>
        </Stack>

        {/* Navigation Buttons */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent="center">
          <Button
            variant="outlined"
            onClick={onFirstPage}
            disabled={page === 1 || loading}
            startIcon={<FirstPage />}
            size="small"
          >
            First
          </Button>
          
          <Button
            variant="outlined"
            onClick={onPrevPage}
            disabled={page === 1 || loading}
            startIcon={<NavigateBefore />}
            size="small"
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <Stack direction="row" spacing={1}>
            {startPage > 1 && (
              <>
                <Button
                  variant={page === 1 ? "contained" : "outlined"}
                  onClick={() => onPageChange(1)}
                  disabled={loading}
                  size="small"
                >
                  1
                </Button>
                {startPage > 2 && <Typography sx={{ px: 1 }}>...</Typography>}
              </>
            )}
            
            {pageNumbers.map((pageNum) => (
              <Button
                key={pageNum}
                variant={page === pageNum ? "contained" : "outlined"}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
                size="small"
              >
                {pageNum}
              </Button>
            ))}
            
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <Typography sx={{ px: 1 }}>...</Typography>}
                <Button
                  variant={page === totalPages ? "contained" : "outlined"}
                  onClick={() => onPageChange(totalPages)}
                  disabled={loading}
                  size="small"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </Stack>

          <Button
            variant="outlined"
            onClick={onNextPage}
            disabled={page === totalPages || loading}
            endIcon={<NavigateNext />}
            size="small"
          >
            Next
          </Button>
          
          <Button
            variant="outlined"
            onClick={onLastPage}
            disabled={page === totalPages || loading}
            endIcon={<LastPage />}
            size="small"
          >
            Last
          </Button>
        </Stack>

        {/* Quick Navigation */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="center">
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Go to page</InputLabel>
            <Select
              value={page}
              onChange={(e) => onPageChange(Number(e.target.value))}
              label="Go to page"
              disabled={loading}
            >
              {Array.from({ length: Math.min(totalPages, 50) }, (_, i) => i + 1).map((pageNum) => (
                <MenuItem key={pageNum} value={pageNum}>
                  {pageNum}
                </MenuItem>
              ))}
              {totalPages > 50 && (
                <MenuItem value={totalPages}>
                  Page {totalPages} (Last)
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {onItemsPerPageChange && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                label="Items per page"
                disabled={loading}
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={96}>96</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PaginationControls;