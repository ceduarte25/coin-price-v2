export const formatDailyOpeningData = (data) => {
    return Object.entries(data).map(([date, value]) => {
        const readableDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `${readableDate}: ${value}`;
    });
};
