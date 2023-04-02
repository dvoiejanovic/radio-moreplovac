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

export const formatTime = (miliseconds: number | undefined) => {
    if (!miliseconds) {
        return '--:--';
    }

    const seconds = Math.floor((miliseconds / 1000) % 60);
    const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);

    const leadingZeroSeconds = seconds < 10 ? `0${seconds}`: seconds;
    if (hours > 0) {
        return `${hours}:${minutes}:${leadingZeroSeconds}`
    }

    return `${minutes}:${leadingZeroSeconds}`;
}
