import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu, openMenu } from '../utils/appSlice'
import {  useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'
import { YOUTUBE_VIDEO_INFO_API } from '../utils/constants'

const WatchPage = () => {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const videoId = searchParams.get("v");
    const [videoInfo, setVideoInfo] = useState(null);
    useEffect(() => {
        dispatch(closeMenu())
        getVideoInfo();

        return () => dispatch(openMenu());

    }, [])

    const getVideoInfo = async () => {
		const data = await fetch(YOUTUBE_VIDEO_INFO_API + videoId);
		const json = await data.json();
		setVideoInfo(json.items[0]);
	};

    return (
        <div className="flex flex-col">
        <div className="px-5 flex">
            <div className="">
            <iframe 
            width="1000" 
            height="600" 
            src={"https://www.youtube.com/embed/"+searchParams.get("v")}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowFullscreen></iframe>
            </div>
            <div className="w-full">
                <LiveChat/>
            </div>
        </div>
        {videoInfo && (
				<div className="px-6 py-1">
					<h1 className="text-xl font-bold">{videoInfo?.snippet?.title}</h1>
					<h1 className="mt-2 text-l font-semibold">
						{videoInfo?.snippet?.channelTitle}
					</h1>
					<h1 className="mb-1 font-medium text-sm">
						{videoInfo?.statistics?.viewCount} Views
					</h1>
				</div>
			)}
            <div className="px-6 py-1">
        <CommentsContainer videoId={videoId}/>
        </div>
        </div>
    )
}

export default WatchPage