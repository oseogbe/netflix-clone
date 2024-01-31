export const formatDateToLocal = (
    seconds: number,
    locale: string = 'en-GB',
) => {
    // const milliseconds = subscription.created.seconds * 1000
    // const subscriptionStartDate = Intl.DateTimeFormat('en', {
    //     weekday: 'long',
    //     month: 'short',
    //     day: 'numeric',
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true
    // }).format(milliseconds)

    const date = new Date(seconds * 1000)
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'africa/lagos'
    }
    const formatter = new Intl.DateTimeFormat(locale, options)
    return formatter.format(date)
}