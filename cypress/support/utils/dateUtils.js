export function getDateFromCurrentDay(day) {
    const date = new Date()
    date.setDate(date.getDate() + day)
    return date;
}
