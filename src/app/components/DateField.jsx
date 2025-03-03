'use client'

import { Box, styled, TextField, Typography } from '@mui/material'
import { INPUT_TITLES } from '../../constants'

const FlexColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const Flex = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}))

const DateFieldInput = ({ title, handleChange, index }) => {
  return (
    <FlexColumn>
      <Typography variant='body1'>{title}</Typography>
      <Typography variant='subtitle2'>
        format: YYYY-MM-DD ({index === 1 ? 'ex: 2024-06-05' : 'ex: 2024-06-18'})
      </Typography>
      <TextField onChange={(e) => handleChange(e.target.value)} />
    </FlexColumn>
  )
}

export default function DateField({ setStartDate, setEndDate }) {
  return (
    <Flex>
      <DateFieldInput
        title={INPUT_TITLES.START}
        handleChange={setStartDate}
        index={1}
      />
      <DateFieldInput
        title={INPUT_TITLES.END}
        handleChange={setEndDate}
        index={2}
      />
    </Flex>
  )
}
