'use client'

import { useContext } from 'react'
import { Button } from '@mui/material'

import { OpeningPriceContext } from '@/contexts'

export default function CalculateButton({ startDate, endDate }) {
  const { handleCalculateButton } = useContext(OpeningPriceContext)

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => handleCalculateButton(startDate, endDate)}
    >
      Calculate
    </Button>
  )
}
