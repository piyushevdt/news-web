export const getVideoThumbnail = (videoUrl) => {
  // You can implement thumbnail generation logic here
  // For now, return a placeholder or extract from video service
  return '/video-thumbnail-placeholder.jpg';
};

export const formatVideoTitle = (title) => {
  if (!title) return 'Untitled Video';
  
  // Clean up text - remove any non-printable characters
  const cleaned = title.replace(/[^\x20-\x7E]/g, ' ').trim();
  
  // Decode if it's URL encoded
  try {
    return decodeURIComponent(cleaned);
  } catch {
    return cleaned;
  }
};

export const getVideoDuration = (videoUrl) => {
  // This would require server-side processing or a separate API
  return '--:--';
};

export const groupVideosByCategory = (videos) => {
  return videos.reduce((groups, video) => {
    const category = video.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(video);
    return groups;
  }, {});
};