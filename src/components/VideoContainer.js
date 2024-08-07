import React, { useEffect, useState } from 'react'
import {YOUTUBE_SEARCH_BY_KEYWORD_API, YOUTUBE_VIDEOS_API} from '../utils/constants'
import VideoCard, {AdVideoCard} from './VideoCard'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearMessages } from '../utils/chatSlice'
import { closeMenu, openMenu } from '../utils/appSlice'

const VideoContainer = () => {
    



    const [videos,setVideos]=useState([])
    const [searchParams] = useSearchParams();
    const dispatch=useDispatch()
    const filter = searchParams.get("filter");
    useEffect(()=>{
        getVideos()
        dispatch(clearMessages())
        const handleResize = () => {
            if (window.innerWidth < 768) { // Adjust the breakpoint as needed
                dispatch(closeMenu())
            }
            else{
              dispatch(openMenu())
            }
        }
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        
    },[dispatch,searchParams,filter])

const getVideos=async()=>{
    const data=await fetch(!filter ?YOUTUBE_VIDEOS_API:YOUTUBE_SEARCH_BY_KEYWORD_API+filter)
    // console.log(data,"hi")
    const json= await data.json()
    // console.log(json.items)
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

  return (
    <div className="flex flex-wrap">
        {videos[0]&& <AdVideoCard info={videos[0]}/>}
        {videos.map(video=>(
            <Link key={video.id} to={!filter ?"/watch?v="+video.id:"/watch?v="+video.id.videoId}>
        <VideoCard  info={video}/>
        </Link>
        )
        )}
        
    </div>
  )
}

export default VideoContainer