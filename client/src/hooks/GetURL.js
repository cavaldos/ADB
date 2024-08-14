
const fallbackUrls = [
    'https://example.com/backup1.jpg',
    'https://example.com/backup2.jpg',
    'https://example.com/bacsdfkup2.jpg',
    'https://example.com/backup3.jpg',
    'https://example.com/bacsdafkup4.jpg',
    'https://example.com/backup5.jpg',
    'https://example.com/backup6.jpg',
    'https://example.com/backup7.jpg',
    'https://example.com/backup8.jpg',
    'https://example.com/backup9.jpg',
    'https://example.com/backup11.jpg',
    'https://example.com/backup12.jpg',
    'https://example.com/backup13.jpg',
    'https://example.com/backup14.jpg'
];

async function checkImageUrl(url) {
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

export default checkImageUrl;
const imageUrl = 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-phot]ography\_1645.jpg';
checkImageUrl(imageUrl).then(result => {
    console.log('URL được chọn:', result);
});
