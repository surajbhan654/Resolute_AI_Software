import React from 'react'
import Header from './Header'
import Videoplayer from './Videoplayer'

const Browse = () => {
  return (
    <div>
      <Header/>
      <div className='pt-32'>
         <Videoplayer/>
      </div>
     
    </div>
  )
}

export default Browse