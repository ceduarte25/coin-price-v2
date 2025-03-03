import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Utility function to format date in YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date)
  const month = ('0' + (d.getMonth() + 1)).slice(-2)
  const day = ('0' + d.getDate()).slice(-2)
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

async function fetchDailyData(apiKey) {
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=ETH&market=USD&apikey=${apiKey}`
  const response = await axios.get(url)
  return response.data['Time Series (Digital Currency Daily)']
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.searchParams)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  console.log(startDate, endDate, 'startDate', 'endDate')
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  try {
    const dailyData = await fetchDailyData(apiKey)
    let currentDate = new Date(startDate)
    const end = new Date(endDate)
    const prices = []
    const dailyOpening = {}

    while (currentDate <= end) {
      const formattedDate = formatDate(currentDate)
      if (dailyData[formattedDate]) {
        const price = dailyData[formattedDate]['1. open']
        dailyOpening[formattedDate] = parseFloat(price)
        prices.push(parseFloat(price))
      } else {
        console.warn(`Data for ${formattedDate} not found.`)
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    if (prices.length === 0) {
      return NextResponse.json(
        { error: 'No data found for the given date range.' },
        { status: 400 }
      )
    }

    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length
    return NextResponse.json({ dailyOpening, averagePrice }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching price data.' },
      { status: 500 }
    )
  }
}
