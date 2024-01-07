import React from "react";
import videoThumbnail from "../../../../images/video-thumbnail.png";
const Tutorial = ({ video }) => {
  const videoThumbnailUrl = video.snippet.thumbnails.medium.url;
  const videoTitle = video.snippet.title;
  const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  return (
    <div>
      <a href="ResourceTuto">
        <div className="tutorial-item-container py-1">
          <div className="video-thumbnail-container">
            <img
              src={videoThumbnailUrl}
              alt="video-thumbnail"
              className="thumbnail"
            />
          </div>
          <div className="video-title">
            <div>
              <div className="text-violet-700 font-bold text-sm mb-2">
                {videoTitle}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Tutorial;
