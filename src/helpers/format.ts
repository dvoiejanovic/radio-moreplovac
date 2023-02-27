export const formatNumber = (number: number): string => {
    return number?.toLocaleString();
}

export const formatTimeOfDay = (): string => {
    const now = new Date();
    const h = now.getHours();

    if (h < 5) {
        return 'night'
    } else if (h < 12) {
        return 'morning'
    } else if (h < 19) {
        return 'afternoon'
    }

    return 'evening';
}
