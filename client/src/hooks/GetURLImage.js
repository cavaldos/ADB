const fallbackUrls = [
    'https://malangnews.id/wp-content/uploads/2023/06/courses-750x422.jpg',
    'https://evolve.elsevier.com/education/wp-content/uploads/sites/2/elsevier-education-smiling-student-health-library-min-1205x498-1.jpg',
    'https://images.inc.com/uploaded_files/image/1920x1080/getty_933383882_2000133420009280345_410292.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKjcpArwy7uI6lD0P8GyxF7hEbOH00dz6_7w&s',
    'https://s39613.pcdn.co/wp-content/uploads/2019/05/twice-the-brainpower-on-this-assignment-picture-id947895256.jpg',
    'https://s39613.pcdn.co/wp-content/uploads/2019/01/creating-wicked-students-190128.jpg',
    'https://cdn.elearningindustry.com/wp-content/uploads/2018/12/5-ways-to-gamify-your-online-course-1024x574.jpg',
    'https://masandpas.com/wp-content/uploads/2022/03/Coursera-vs-edX-best-online-courses.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvu5rqbGyWp1fjlZNs_g_00Pngah6hvqDtZGwkpRhz-mf4Ex7aQ__qm0Je1SyGv3sXKKk&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSD_UCB0LprC0aouB0s3oa2wAPyH5ssEKiyw&s',
    'https://www.onlinecolleges.net/wp-content/uploads/2016/02/open-online-courses-e1455753889686.jpg',
    'https://images.ctfassets.net/2pudprfttvy6/ikLguY3z9omsHrAS8Vmgd/a3aa4ee71c5c1203b955c183bf3fea59/guidedprojects_application_image.jpg',
    'https://images.ctfassets.net/wp1lcwdav1p1/555TNiLim0Yh5whuwOv1Nf/824babd19741659feff945f98a8a5ead/GettyImages-514686797.jpg?w=330&h=216&q=60&fit=fill&f=faces&fm=jpg&fl=progressive',
    'https://images.ctfassets.net/wp1lcwdav1p1/3ZT5igrnMSiw9x7KUtq5Kt/22dcfca88f71498348f364e7934efb42/GettyImages-1444442656.jpg?w=330&h=216&q=60&fit=fill&f=faces&fm=jpg&fl=progressive'
];

async function checkImageUrl(url) {
    const randomFallbackUrl = fallbackUrls[Math.floor(Math.random() * fallbackUrls.length)];

    // Promise race to enforce timeout
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(randomFallbackUrl), 100);
    });

    const fetchPromise = fetch(url, { method: 'HEAD' })
        .then(response => response.ok ? url : randomFallbackUrl)
        .catch(() => randomFallbackUrl);

    return Promise.race([fetchPromise, timeoutPromise]);
}

export default checkImageUrl;

const imageUrl = 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-phot]ography\_1645.jpg';
checkImageUrl(imageUrl).then(result => {
    console.log('URL được chọn:', result);
});



function renderUrl() {
    const randomFallbackUrl = fallbackUrls[Math.floor(Math.random() * fallbackUrls.length)];
    return randomFallbackUrl
}

export { renderUrl };