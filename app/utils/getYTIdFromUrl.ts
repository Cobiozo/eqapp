const getYTIdFromUrl = (videoUrl: string): string => {
  if(videoUrl.includes("v=")) {
    return videoUrl.split("v=")[1];
  }
  else if(videoUrl.includes("youtu.be/")) {
    return videoUrl.split("youtu.be/")[1].split("?")[0];
  }
  else if(videoUrl.includes("live")) {
    const videoId = videoUrl.split("live/")[1];
    return videoId;
  }
  return "test";
}

export default getYTIdFromUrl;