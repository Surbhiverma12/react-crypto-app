import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div  style={{
      backgroundImage: "url('./banner2.jpg')" 
  }}>
    <Container className="h-96 flex flex-col pt-8">
      <div className="flex h-2/5 flex-col justify-center text-center">
        <Typography 
          variant='h2'
          sx={{
            fontWeight: 'bold'
          }}
          className="font-bold mb-4 font-montserrat"
        >
          Crypto Hunter
        </Typography>
        <Typography 
          variant='subtitle2'
          className="text-gray-400 capitalize font-montserrat"
        >
          Get all the Info regarding your favorite Crypto Currency
        </Typography>
      </div>
      <Carousel />
    </Container>
  </div>  
  )
}

export default Banner