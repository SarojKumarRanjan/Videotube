export default function formatVideoDuration(duration: number): string {
    if (isNaN(duration) || duration < 0) {
      throw new Error("Invalid duration value");
    }
  
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
  
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }