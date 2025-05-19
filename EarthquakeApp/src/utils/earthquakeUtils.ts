export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return '#FF0000';
  if (magnitude >= 5) return '#FF6B00';
  if (magnitude >= 3) return '#FFD700';
  return '#4CAF50';
};

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}; 