import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { YOUTUBE_SEARCH_BY_KEYWORD_API } from '../utils/constants'
import VideoCard from './VideoCard'

const SearchResults = () => {
    const [searchResults]=useSearchParams()
    
    const [videos, setVideos] = useState([]);
    useEffect(()=>{
        getVideos()
    },[searchResults.get("search_query")])

    const getVideos=async()=>{

        const data=await fetch(YOUTUBE_SEARCH_BY_KEYWORD_API+searchResults.get("search_query"))
        const json=await data.json()
        setVideos(json.items)

    }
    if (!videos) {
        return (
          <div className="md:flex flex-col md:flex-wrap md:justify-center mx-auto w-fit">
            <div className="mt-48 text-lg text-red-400 bg-gray-100 p-2 rounded-xl shadow-inner">
              Oops! looks like we have exceeded youtube API quota
            </div>
          </div>
        );
      }
    
    if (videos.length === 0) {
		return <div>Loading...</div>;
	}
  return (
    <div className="flex flex-row flex-wrap">
        {videos.map((video) => {
				if (video.id.kind === "youtube#video") {
					return (
						<Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
							<VideoCard info={video} />
						</Link>
					);
				}
			})}
    </div>
  )
}

export default SearchResults