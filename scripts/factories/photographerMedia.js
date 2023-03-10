class mediaFactory {
    constructor(media, photographer) {
        this.media = media;
        this.photographer = photographer;
        this.createMedia = function () {
            let typeOfMedia;
            if (this.media.video) {
                typeOfMedia = new VideoMedia(this.photographer.name, this.media.video);
            }
            else if (this.media.image) {
                typeOfMedia = new ImageMedia(this.photographer.name, this.media.image);
            }
            else {
                throw "Unknown media type";
            }
            return typeOfMedia;
        }
    }

    getUserMediasDOM() {
        const { title, id, likes } = this.media;
        const article = document.createElement('article');
        article.className = "mediaCard";

        const typeOfMedia = this.createMedia();
        const mediaElement = typeOfMedia.render();
        mediaElement.setAttribute("alt", `${title}`);
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
}

class VideoMedia {
    constructor(name, video) {
        this.name = name;
        this.video = video;
    }

    render() {
        const videoElement = document.createElement('video');
        videoElement.src = `assets/images/${this.name}/${this.video}`;
        return videoElement;
    }
}

class ImageMedia {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    render() {
        const imageElement = document.createElement('img');
        imageElement.src = `assets/images/${this.name}/${this.image}`;
        return imageElement;
    }
}
