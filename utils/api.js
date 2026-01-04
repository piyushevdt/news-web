const NEWS_API_BASE = 'https://api.innsights.in';
const VIDEO_API_BASE = 'https://api.innsights.in';

// Enhanced fetch function with retry logic
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        if (response.status === 429 && i < retries - 1) {
          // Rate limited, wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

export const fetchNews = async (page = 1, limit = 12) => {
  try {
    const data = await fetchWithRetry(`${NEWS_API_BASE}/news?page=${page}&limit=${limit}`);
    
    // Log the response structure for debugging
    console.log(`News API Response for page ${page}:`, {
      hasNews: !!data.news,
      newsCount: data.news?.length || 0,
      dataKeys: Object.keys(data),
      pagination: data.pagination || data.meta,
    });
    
    return {
      news: data.news || data.data || [],
      pagination: data.pagination || data.meta || {
        page: page,
        totalPages: 10, // Default fallback
        totalItems: data.news?.length || 0,
      }
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchVideos = async () => {
  try {
    const data = await fetchWithRetry(`${VIDEO_API_BASE}/video`);
    
    // Handle different response structures
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.videos)) {
      return data.videos;
    } else if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('Unexpected video data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Function to fetch pagination info only
export const fetchNewsPaginationInfo = async () => {
  try {
    // Fetch first page to get pagination info
    const data = await fetchWithRetry(`${NEWS_API_BASE}/news?page=1&limit=1`);
    
    return {
      totalPages: data.pagination?.totalPages || 10,
      totalItems: data.pagination?.totalItems || 0,
    };
  } catch (error) {
    console.error('Error fetching pagination info:', error);
    return { totalPages: 10, totalItems: 0 };
  }
};