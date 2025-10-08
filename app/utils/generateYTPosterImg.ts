const generateYTPosterImg = (videoUrl: string) => {
  if(videoUrl.includes("v=")) {
    const videoId = videoUrl.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }
  else if(videoUrl.includes("youtu.be/")) {
    const videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }
  else if(videoUrl.includes("live")) {
    const videoId = videoUrl.split("live/")[1];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }
  return `https://img.youtube.com/vi/test/0.jpg`;
}

export default generateYTPosterImg;
