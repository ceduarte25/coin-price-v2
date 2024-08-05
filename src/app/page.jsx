'use client'

import { useContext, useState } from 'react'
import { Box, Container, styled, Typography } from '@mui/material'

import {
  OpeningPriceContext,
  OpeningPriceProvider,
} from '../contexts/OpeningPriceContext'
import { formatDailyOpeningData } from '../hooks'

import { CalculateButton, DateField } from './components'

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  paddingTop: '32px',
}))

const DisplayValues = () => {
  const { state } = useContext(OpeningPriceContext)
  const { averagePrice, dailyOpening } = state

  const formattedDailyOpening =
    dailyOpening && formatDailyOpeningData(dailyOpening)

  if (averagePrice === null || dailyOpening === null) {
    return null
  }

  return (
    <Box>
      <Typography>Average Price: {averagePrice}</Typography>
      {formattedDailyOpening &&
        formattedDailyOpening.map((data, index) => (
          <Typography key={index}>{data}</Typography>
        ))}
    </Box>
  )
}

export default function Home() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <Container maxWidth='md'>
      <OpeningPriceProvider>
        <Wrapper>
          <Typography variant='h1' fontSize='24px'>
            Calculate average opening daily price of a cryptocurrency
          </Typography>
          <DateField setStartDate={setStartDate} setEndDate={setEndDate} />
          <CalculateButton startDate={startDate} endDate={endDate} />
          <DisplayValues />
        </Wrapper>
      </OpeningPriceProvider>
    </Container>
  )
}
