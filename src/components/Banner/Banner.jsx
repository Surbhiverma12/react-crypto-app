import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{
        backgroundImage: "url('./banner2.jpg')" 
    }}>

    <Container sx={{
        height: 400,
        display: "flex",
        flexDirection: 'column',
        paddingTop: 5,
    }}>
        <div style={{
            display:'flex',
            height: '40%',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <Typography
                variant='h2'
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 2,
                    fontFamily: 'Montserrat'
                }}
            >
                Crypto Hunter
            </Typography>

            <Typography
                variant='subtitle2'
                sx={{
                    color: 'darkgray',
                    textTransform: 'capitalize',
                    fontFamily: "Montserrat",
                }}
            >
                Get all the info regarding your favorite Crypto Currency
            </Typography>
        </div>
        <Carousel/>
    </Container>
    </div>
  )
}

export default Banner