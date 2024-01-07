import React from "react";
import Box from "../components/Box/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResourceCard from "../components/cards/ResourceCard";
import TutoCard from "../components/cards/TutoCard";
import { fetchResource } from "../../store/actions/ResourceActions";
import API_KEY from "../../../src/apiYoutube";
const ResourceTuto = () => {
  //search videos
  const [searchTerm, setSearchTerm] = useState("");
  // video Tuto
  //const API_KEY = "AIzaSyBWaFvfy_QXRmnuPRA-mYybQTXRRf72iIE";
  const CHANNEL_ID = "UC6At57DnjCq_ZzXw3WB7-9A";
  const MAX_RESULTS = 10;
  const [videos, setVideos] = useState([]);
  //use localStorage as Caching Mechanism
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
  // Ressources des informations
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResource());
  }, [dispatch]);
  const { resourceData } = useSelector((state) => state.resource);
  return (
    <div className="p-2">
      <Box title={"Ressources & Tutos"} />
      <div className="bmc-container flex p-2">
        <div className="flex justify-end">
          <div className="flex text-gray-600 p-1 w-1/4 rounded border border-slate-300">
            <button type="submit" className="p-[2px]">
              <svg
                className="h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                xmlSpace="preserve"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>

            <input
              type="search"
              name="search"
              placeholder="Rechercher"
              className="bg-transparent h-10 rounded-full text-sm focus:outline-none px-4 w-full md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 divide-x overflow-auto max-h-screen gap-8">
          <div className="col-span-3">
            {resourceData.map((resource, index) => {
              return (
                <div className="m-2">
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
          <div className="col-span-3">
            {videos
              ?.filter((video) =>
                video.snippet.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((video) => (
                <TutoCard
                  key={video.id.videoId}
                  video={video}
                  channelLogoUrl={video.snippet.thumbnails.default.url}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourceTuto;
