// import React from 'react'

// const commentsData=[
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
//                     {
//                         name:'Hiren Khanchandani',
//                         text:'Amazing',
//                         replies:[
                
//                         ],
                
//                     },
        
//                 ],
        
//             },
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
        
//                 ],
        
//             },

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
        
//                 ],
        
//             },

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
        
//                 ],
        
//             },
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
        
//                 ],
        
//             },
//             {
//                 name:'Hiren Khanchandani',
//                 text:'Amazing',
//                 replies:[
        
//                 ],
        
//             },

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
//     {
//         name:'Hiren Khanchandani',
//         text:'Amazing',
//         replies:[

//         ],

//     },
// ]

// const Comment=({data})=>{
//     const {name,text,replies}=data
//     return <div className="flex shadow-sm bg-gray-100 p-2 rounded-sm my-2">
//             <img
//                 className="h-12 w-12"
//                 alt="user"
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
//             />
//             <div className="px-3">
//                 <p className="font-bold">{name}</p>
//                 <p>{text}</p>
//             </div>
//         </div>
// }

// const CommentsList=({comments})=>{

//     return comments.map((c,ind)=>(
//         <div key={ind}>
//             <Comment  data={c}/>
//             <div className="pl-5 border border-l-black ml-5">
//                <CommentsList comments={c.replies}/> 
//             </div>

//         </div>
//         ))
// }

// const CommentsContainer = () => {
//   return (
//     <div className="m-5 p-2">
//         <h1 className="text-2xl font-bold">Comments:</h1>
//         <CommentsList comments={commentsData}/>
//     </div>
//   )
// }

// export default CommentsContainer

import React, { useEffect, useState } from "react";
import { COMMENTS_API,kFormatter } from "../utils/constants";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import moment from "moment";

const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const data = await fetch(COMMENTS_API + videoId);
   
    const json = await data.json();
    setComments(json.items);
  };

  useEffect(() => {
    getComments();
  }, [videoId]);

  return (
    <div>
      <p>{comments?.length} Comments</p>
      {comments?.map((comment) => {
        const {
          authorDisplayName,
          authorProfileImageUrl,
          textDisplay,
          publishedAt,
          likeCount,
        } = comment?.snippet?.topLevelComment?.snippet;
        return (
          <div key={comment?.id} className="flex gap-4 my-4">
            <img
              src={authorProfileImageUrl}
              alt="author"
              className="rounded-full h-10"
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h3 className="text-md font-semibold text-gray-700">
                  {authorDisplayName}
                </h3>{" "}
                <p className="text-xs text-gray-500">
                  {moment(publishedAt).fromNow()}
                </p>
              </div>
              <p>{textDisplay}</p>
              <div className="flex items-center gap-2">
                <AiOutlineLike />
                {kFormatter(likeCount)}
                <AiOutlineDislike />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsContainer;