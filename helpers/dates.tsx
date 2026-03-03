// dates can be
// 00-01-2025
// 00-00-2025
export function getYearFromCustomDate(date: string) {
    const dateSplit = date.split("-");
    const year = Number(dateSplit[2]);

    return year || (new Date()).getFullYear()
}