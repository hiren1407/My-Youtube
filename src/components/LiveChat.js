import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateRandomName, randomMessage } from '../utils/helper'


const LiveChat = () => {

    const [liveMessage,setLiveMessage]=useState("")
    const dispatch=useDispatch()

    const chatMessages=useSelector((store)=>store.chat.messages)

    useEffect(()=>{
        const i=setInterval(()=>{
            dispatch(addMessage({
                name:generateRandomName(),
                message:randomMessage(10)+" Hello from College Park"
            }))
        },2000)

        return ()=>clearInterval(i)

    },[])

  return (
    <>
    <div className="w-full h-[550px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>{chatMessages.map((chat,ind)=><ChatMessage key={ind} name={chat.name} message={chat.message} />)}</div>
       
        
        
    </div>
    <form className="my-2 w-full p-2 ml-2 border border-black " onSubmit={(e)=>{
        e.preventDefault()
        dispatch(addMessage({
            name:"Hiren",
            message:liveMessage
        }))
        setLiveMessage("")
        }}>
            <input className="w-72 px-2 border border-black" type="text" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)} />
            <button className="px-2 mx-2 bg-green-100">Send</button>
        </form>

    </>
  )
}

export default LiveChat