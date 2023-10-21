"use client";
import React from "react";
import YouTube from "react-youtube";

function VideoPlayer({ id }: { id: string }) {
  const opts = {
    width: "100%", // Make width 100% for responsiveness
    maxWidth: 350, // Set a maximum width for large screens
    height: "auto", // Automatically adjust the height
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, // Auto-play the video
    },
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <YouTube videoId={id} opts={opts} />
    </div>
  );
}

export default VideoPlayer;
