import React, { useState } from "react";
import thumbnailImg from "../../../../images/dashboard/news-thumbnail.png";

const NewsItem = ({ title, description }) => {
  const maxDescriptionLength = 120;
  const [thumbnail, setThumbnail] = useState(thumbnailImg);
  // Truncate or ellipsize the description if it's longer than maxDescriptionLength
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;
  return (
    <div className="news-item-container">
      <div className="news-thumbnail">
        <img src={thumbnail} alt="News thumbnail" width={200} />
      </div>
      <div>
        <div className="news-item-text-container">
          <div className="news-item-title">
            <span>{title}</span>
          </div>
          <div className="news-item-subtitle">
            <p>{truncatedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
