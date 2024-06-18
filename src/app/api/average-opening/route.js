import axios from 'axios';

// Utility function to format date in YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

async function fetchDailyData(apiKey) {
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=ETH&market=USD&apikey=${apiKey}`;
    const response = await axios.get(url);
    return response.data['Time Series (Digital Currency Daily)'];
}

export async function GET(req, res) {
    console.log(req.json());
    const { startDate, endDate } = req.json().query;
    console.log(startDate, endDate, 'startDate', 'endDate');
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    try {
        const dailyData = await fetchDailyData(apiKey);
        let currentDate = new Date(startDate);
        const end = new Date(endDate);
        const prices = [];
        const dailyOpening = {};

        while (currentDate <= end) {
            const formattedDate = formatDate(currentDate);
            if (dailyData[formattedDate]) {
                const price = dailyData[formattedDate]['1. open'];
                dailyOpening[formattedDate] = parseFloat(price);
                prices.push(parseFloat(price));
            } else {
                console.warn(`Data for ${formattedDate} not found.`);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (prices.length === 0) {
            res.status(404).json({ error: 'No data available for the given date range.' });
            return;
        }

        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        res.status(200).json({ dailyOpening, averagePrice });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching price data.' });
    }
}
