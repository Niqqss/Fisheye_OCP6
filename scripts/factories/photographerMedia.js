function mediaFactory(media, photographer) {
    const { name } = photographer;
    const { id, image, video, likes, title } = media;
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
            video.src = src;
            video.className = "media";
            // ID to match with the image displayed in lightbox
            video.setAttribute("data-id", id);
            article.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.className = "media";
            img.setAttribute("data-id", id);
            article.appendChild(img);
        }
        const mediaTextContainer = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('p');
        const likesCount = document.createElement('span');
        const likeIcon = document.createElement('i');
        mediaTitle.textContent = title;
        likesCount.textContent = likes + " ";
        likesCount.className = "likes-count";
        likeIcon.className = "fa-regular fa-heart";

        // add an event listener to the heart icon to toggle the "liked" property and update the heart icon
        likeIcon.addEventListener('click', () => {
            media.liked = !media.liked; // toggle the "liked" property
            const newLikes = parseInt(likesCount.textContent) + (likeIcon.classList.contains('active') ? -1 : 1);
            likesCount.textContent = newLikes + " ";

            if (likeIcon.classList.contains('active')) {
                // swap classes to get the outlined shape using fontawesome class
                likeIcon.classList.remove('fa-solid');
                likeIcon.classList.add('fa-regular');
            } else {
                // swap classes to get the filled shape
                likeIcon.classList.remove('fa-regular');
                likeIcon.classList.add('fa-solid');
            }

            likeIcon.classList.toggle('active');
            mediaLikes.append(likesCount, likeIcon);
        });

        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);
        mediaLikes.append(likesCount, likeIcon);
        return (article);
    }
    return { getUserMediasDOM };
}
