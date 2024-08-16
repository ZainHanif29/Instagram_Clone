import React from 'react'
import Post from './Post'

const Posts = () => {
  let arr = [1, 2, 3, 4,5,6]
  return (
    <>
      {
        arr.map((item, index) => (
          <Post key={index} />
        ))
      }
    </>
  )
}

export default Posts