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
        const likeIcon = document.createElement('i');
        mediaTitle.textContent = title;
        mediaLikes.textContent = likes + " ";
        likeIcon.setAttribute("class", "fa-regular fa-heart");

        likeIcon.addEventListener('click', () => {
            const newLikes = parseInt(mediaLikes.textContent) + (likeIcon.classList.contains('active') ? -1 : 1);
            mediaLikes.textContent = newLikes + " ";

            if (likeIcon.classList.contains('active')) {
                // Swap classes to get the outlined shape using fontawesome class
                likeIcon.classList.remove('fa-solid');
                likeIcon.classList.add('fa-regular');
            } else {
                // Swap classes to get the filled shape
                likeIcon.classList.remove('fa-regular');
                likeIcon.classList.add('fa-solid');
            }

            likeIcon.classList.toggle('active');
            mediaLikes.appendChild(likeIcon);
        });

        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);
        mediaLikes.appendChild(likeIcon);
        return (article);
    }
    return { getUserMediasDOM };
}


