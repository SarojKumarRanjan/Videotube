export function timeAgo(createdAt:string) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const secondsAgo = Math.floor((now - createdDate) / 1000);
  
    const minutes = 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const weeks = days * 7;
    const months = days * 30; // Approximation
    const years = days * 365; // Approximation
  
    if (secondsAgo < minutes) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < hours) {
      return `${Math.floor(secondsAgo / minutes)} minutes ago`;
    } else if (secondsAgo < days) {
      return `${Math.floor(secondsAgo / hours)} hours ago`;
    } else if (secondsAgo < weeks) {
      return `${Math.floor(secondsAgo / days)} days ago`;
    } else if (secondsAgo < months) {
      return `${Math.floor(secondsAgo / weeks)} weeks ago`;
    } else if (secondsAgo < years) {
      return `${Math.floor(secondsAgo / months)} months ago`;
    } else {
      return `${Math.floor(secondsAgo / years)} years ago`;
    }
  }
  