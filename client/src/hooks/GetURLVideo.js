const fallbackUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',

];

async function checkYoutubeUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            return url;
        } else {
            return getFallbackUrl(url);
        }
    } catch (error) {
        return getFallbackUrl(url);
    }
}

function getFallbackUrl(url) {
    const charCount = url.length;
    const index = charCount % fallbackUrls.length;
    return fallbackUrls[index];
}

export default checkYoutubeUrl;

const youtubeUrl = 'https://www.youtube.com/watch?v=invalidVideoId';
checkYoutubeUrl(youtubeUrl).then(result => {
    console.log('URL được chọn:', result);
});
