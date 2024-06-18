'use client'

import { useState } from 'react'
import { Box, Container, styled, Typography } from '@mui/material'

import { OpeningPriceProvider } from '@/contexts'

import { CalculateButton, DateField } from '@/app/components'

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  paddingTop: '32px',
}))

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
        </Wrapper>
      </OpeningPriceProvider>
    </Container>
  )
}
