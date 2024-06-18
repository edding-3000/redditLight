export default function timeAgo(timestamp) {
    const now = Math.floor(Date.now() / 1000);
    const secondsPast = now - timestamp;

    if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
    } else if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `${minutes} minutes ago`;
    } else if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `${hours} hours ago`;
    } else if (secondsPast < 2592000) {
        const days = Math.floor(secondsPast / 86400);
        return `${days} days ago`;
    } else if (secondsPast < 31536000) {
        const months = Math.floor(secondsPast / 2592000);
        return `${months} months ago`;
    } else {
        const years = Math.floor(secondsPast / 31536000);
        return `${years} years ago`;
    }
}
