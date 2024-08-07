import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const list=["All","Gaming","Songs","Soccer","Cooking","Cricket","Laptops",
"Music",
"Jukebox",
"Disney"]

const ButtonList = () => {
  return (
    <div className="flex flex-wrap">
        {list.map((item,index)=>{
            return  <Link key={index} to={'/?filter='+item}><Button  name={item}/></Link>
        })}
    </div>
  )
}

export default ButtonList