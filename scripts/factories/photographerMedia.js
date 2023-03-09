function mediaFactory(media, photographer) {
    // retrieves data from the json file
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
        // adding elements to the DOM and setting their attributes
        const article = document.createElement('article');
        article.className = "mediaCard";

        const mediaElement = type === 'video' ? document.createElement('video') : document.createElement('img');
        mediaElement.src = src;
        mediaElement.className = "media";
        mediaElement.setAttribute("role", "image link");
        mediaElement.setAttribute("alt", `${title}`);
        // ID to match with the image displayed in lightbox
        mediaElement.setAttribute("data-id", id);
        article.appendChild(mediaElement);

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.className = "media-infos";
        const mediaTitle = document.createElement('h3');
        mediaTitle.className = "media-title";
        const mediaLikes = document.createElement('p');
        mediaLikes.className = "media-likes";
        const likesCount = document.createElement('span');
        const likeIcon = document.createElement('i');
        mediaTitle.textContent = title;
        likesCount.textContent = likes + " ";
        likesCount.className = "likes-count";
        likeIcon.className = "fa-regular fa-heart";
        likeIcon.setAttribute("tabindex", "3")
        likeIcon.setAttribute("role", "button");
        likeIcon.setAttribute("aria-label", `likes`)

        // add an event listener to the heart icon to toggle the "liked" property and update the heart icon
        function toggleLiked() {
            media.liked = !media.liked; // toggle the "liked" property
            const newLikes = parseInt(likesCount.textContent) + (likeIcon.classList.contains('active') ? -1 : 1);
            likesCount.textContent = newLikes + " ";

            if (likeIcon.classList.contains('active')) {
                // outlined shape if not liked
                likeIcon.classList.remove('fa-solid');
                likeIcon.classList.add('fa-regular');
            } else {
                // full shape if liked
                likeIcon.classList.add('fa-solid');
                likeIcon.classList.remove('fa-regular');
            }

            likeIcon.classList.toggle('active');
            mediaLikes.append(likesCount, likeIcon);
        }

        likeIcon.addEventListener('click', toggleLiked);

        likeIcon.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                toggleLiked();
            }
        });

        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);
        mediaLikes.append(likesCount, likeIcon);
        return (article);
    }
    return { getUserMediasDOM };
}
