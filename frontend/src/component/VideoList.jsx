import React, { useState, useEffect , useRef} from "react";
import VideoCard from "./VideoCard";
import "./VideoList.css";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchVideos(page);
//   }, [page]);

//   const fetchVideos = async (page) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3000/videos?page=${page}&limit=5`
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("Fetched videos:", data.results);

//       setVideos((prev) => [...prev, ...data.results]);

//       if (data.results.length === 0) {
//         setHasMore(false); // No more videos to load
//       }
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreVideos = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="videoList">
//       {videos.map((video, index) => (
//         <VideoCard key={index} video={video} />
//       ))}

//       {hasMore && (
//         <button
//           onClick={loadMoreVideos}
//           disabled={loading}
//           className="loadMoreButton"
//         >
//           {loading ? "Loading..." : "Load More"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default VideoList;


const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const fetchVideos = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/videos?page=${page}&limit=5`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.results.length === 0) {
        // No more videos, restart from page 1
        setPage(1);
        setHasMore(true); // Reset `hasMore` for infinite loop
      } else {
        setVideos((prev) => [...prev, ...data.results]);
        if (data.results.length < 5) {
          setHasMore(false); // Mark as no more pages if fewer results
        }
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
                        // Load more videos when the second to last video is in view
                        setPage((prevPage) => prevPage + 1);
                      }
                    },
                    { threshold: 0.9 } // Trigger when 90% of the element is visible
                  );
                }
            
                const lastVideoElement = document.getElementById(`video-${videos.length - 2}`);
                if (lastVideoElement) {
                  observerRef.current.observe(lastVideoElement);
                }
            
                return () => {
                  if (observerRef.current && lastVideoElement) {
                    observerRef.current.unobserve(lastVideoElement);
                  }
                };
              }, [videos, hasMore]);
            
              return (
                <div className="videoList">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      id={`video-${index}`}
                    >
                      <VideoCard video={video} />
                    </div>
                  ))}
            
                  {hasMore && (
                    <div className="loadingIndicator">
                      {videos.length > 0 && !hasMore ? "No more videos to load" : "Loading more..."}
                    </div>
                  )}
                </div>
              );
            };
            
export default VideoList;
            
