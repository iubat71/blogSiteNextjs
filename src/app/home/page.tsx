'use client'
import React from 'react'

 
import { useState } from 'react'
export default async  function page() {
    const [count, setCount] = useState(0)

    let data = await fetch('https://api.vercel.app/blog')
    let posts = await data.json()
  
    const handleClick = () => {
        setCount(count + 1);
      };
  return (
    <div> 
        
        <p>You clicked {count} times</p>
              <button onClick={handleClick}>Click me</button>

         <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title} </li>
      ))}
    </ul>
    </div>
  )
}
