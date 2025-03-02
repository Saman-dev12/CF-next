"use client"
import React from 'react'

function GenImage({image,loading}:{image:string,loading:boolean}) {
  return (
    <div>
      {loading ? <p>Loading...</p> :image}
      
    </div>
  )
}

export default GenImage
