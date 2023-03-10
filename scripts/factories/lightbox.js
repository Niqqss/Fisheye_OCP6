class LightboxFactory {
    constructor(media, photographer) {
        this.media = media;
        this.photographer = photographer;
        this.createMedia = function () {
            let typeOfMedia;
            if (this.media.video) {
                typeOfMedia = new LightboxVideoMedia(this.photographer.name, this.media.video);
            }
            else if (this.media.image) {
                typeOfMedia = new LightboxImageMedia(this.photographer.name, this.media.image);
            }
            else {
                throw "Unknown media type";
            }
            return typeOfMedia;
        }
    }

    LightboxDOM() {
        // adding elements to the DOM and setting their attributes
        const { title } = this.media;
        const lightboxContainer = document.createElement('div');
        const leftArrow = document.createElement('i');
        lightboxContainer.className = "lightbox-container";
        leftArrow.className = "fa-solid fa-chevron-left left-arrow";
        leftArrow.setAttribute("tabindex", "0");
        leftArrow.setAttribute("role", "link");
        leftArrow.setAttribute("aria-label", "previous image");
        lightboxContainer.appendChild(leftArrow);
        const figure = document.createElement('figure');

        const typeOfMedia = this.createMedia();
        const mediaElement = typeOfMedia.render();
        mediaElement.setAttribute("alt", `${title}`);
        figure.appendChild(mediaElement);

        const mediaTitle = document.createElement('figcaption');
        mediaTitle.className = "lightbox-media-name";
        mediaTitle.textContent = title;
        lightboxContainer.appendChild(figure);
        figure.appendChild(mediaTitle);

        const rightArrow = document.createElement('i');
        rightArrow.className = "fa-solid fa-chevron-right right-arrow";
        rightArrow.setAttribute("tabindex", "0");
        rightArrow.setAttribute("role", "link");
        rightArrow.setAttribute("aria-label", "next image");
        lightboxContainer.appendChild(rightArrow);
        const closeButton = document.createElement('i');
        closeButton.className = "fa-solid fa-xmark close-button";
        closeButton.setAttribute("tabindex", "0");
        closeButton.setAttribute("role", "button");
        closeButton.setAttribute("aria-label", "close dialog");
        lightboxContainer.appendChild(closeButton);

        return lightboxContainer;
    }
}

class LightboxVideoMedia {
    constructor(name, video) {
        this.name = name;
        this.video = video;
    }

    render() {
        const videoElement = document.createElement('video');
        videoElement.src = `assets/images/${this.name}/${this.video}`;
        videoElement.setAttribute('controls', '');
        return videoElement;
    }
}

class LightboxImageMedia {
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
