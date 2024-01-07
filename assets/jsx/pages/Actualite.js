import React, { useEffect, useState } from "react";
import Box from "../components/Box/Box";
import { useDispatch, useSelector } from "react-redux";
import ResourceCard from "../components/cards/ResourceCard";
import TutoCard from "../components/cards/TutoCard";
import { fetchResource } from "../../store/actions/ResourceActions";
import API_KEY from "../../../src/apiYoutube";
const Actualite = () => {
  // video Tuto
  //const API_KEY = "AIzaSyBWaFvfy_QXRmnuPRA-mYybQTXRRf72iIE";
  const CHANNEL_ID = "UC6At57DnjCq_ZzXw3WB7-9A";
  const MAX_RESULTS = 20;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const cachedData = localStorage.getItem("youtubeVideos");

        if (cachedData) {
          // Use cached data if available
          setVideos(JSON.parse(cachedData));
        } else {
          // Fetch data from the API
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
          );

          const data = await response.json();
          setVideos(data.items);

          // Cache the API response
          localStorage.setItem("youtubeVideos", JSON.stringify(data.items));
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, []);
  // Ressources
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResource());
  }, [dispatch]);
  const { resourceData } = useSelector((state) => state.resource);
  //Category Filter

  // Get unique category names
  const uniqueCategories = [
    ...new Set(resourceData.map((resource) => resource.category)),
  ];

  // Create an object to store the occurrence count for each category
  const categoryCounts = {};
  resourceData.forEach((resource) => {
    categoryCounts[resource.category] =
      (categoryCounts[resource.category] || 0) + 1;
  });

  // Filter resources based on selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredResources = selectedCategory
    ? resourceData.filter((resource) => resource.category === selectedCategory)
    : resourceData;
  return (
    <div className="p-2">
      <Box title={"Actualités"} />
      <div className="bmc-container flex flex-col p-2">
        <div className="flex justify-end"></div>
        <div className="grid grid-cols-6 divide-x overflow-auto max-h-screen gap-8">
          <div className="col-span-3">
            {filteredResources.map((resource, index) => {
              return (
                <div key={index} className="mt-4 mb-4">
                  <ResourceCard
                    key={index}
                    title={resource.title}
                    author={resource.creator}
                    link={resource.link}
                    description={resource.description}
                    publicationDate={resource.pubDate}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-span-2">
            {videos?.map((video) => (
              <TutoCard
                key={video.id.videoId}
                video={video}
                channelLogoUrl={video.snippet.thumbnails.default.url}
              />
            ))}
          </div>
          <div className="pl-8 col-span-1 pt-4">
            <h5 className="font-semibold">Catégories</h5>
            <div className="mt-4 mb-4 py-2">
              {uniqueCategories.map((category) => (
                <div
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category ? "font-semibold" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {`${category} (${categoryCounts[category] || 0})`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Actualite;
