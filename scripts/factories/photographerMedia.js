// VERSION innerHTML

// function mediaFactory(media, photographer) {
//     const { name} = photographer;
//     const { image, video, likes, title } = media;
//     const type = media.video ? 'video' : 'image';
//     let src;
//     if (type === 'video') {
//         src = `assets/images/${name}/${video}`
//     } else {
//         src = `assets/images/${name}/${image}`;
//     }

//     function getUserMediasDOM() {
//         const article = document.createElement('article');

//         article.innerHTML =
//             `
//         <${type} src="${src}" class="media"></${type}>
//         <div>
//             <p>${title}</p>
//             <p>${likes}</p>
//         </div>
//         `
//         return (article);
//     }
//     return { getUserMediasDOM };
// }

// VERSION createElement

function mediaFactory(media, photographer) {
    const { name } = photographer;
    const {id, image, video, likes, title } = media;
    const type = media.video ? 'video' : 'image';
    let src;
    if (type === 'video') {
        src = `assets/images/${name}/${video}`
    } else {
        src = `assets/images/${name}/${image}`;
    }

    function getUserMediasDOM() {
        const article = document.createElement('article');
        if (type === 'video') {
            const video = document.createElement('video');
            video.setAttribute("src", src);
            video.setAttribute("class", "media");
            // ID to match with the image displayed in lightbox
            video.setAttribute("data-id", id);
            article.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.setAttribute("src", src);
            img.setAttribute("class", "media");
            img.setAttribute("data-id", id);
            article.appendChild(img);
        }
        const mediaTextContainer = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('p');
        mediaTitle.textContent = title;
        mediaLikes.textContent = likes;
        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);
        return (article);
    }
    return { name, image, getUserMediasDOM };
}


