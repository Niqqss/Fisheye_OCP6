function lightboxFactory(media, photographer) {
    const { name } = photographer;
    const { image, video, title } = media;
    const type = media.video ? 'video' : 'image';
    let src;
    if (type === 'video') {
        src = `assets/images/${name}/${video}`
    } else {
        src = `assets/images/${name}/${image}`;
    }
    
    function LightboxDOM() {
        const lightboxContainer = document.createElement('div');
        const leftArrow = document.createElement('i');
        leftArrow.className = "fa-solid fa-chevron-left left-arrow";
        lightboxContainer.appendChild(leftArrow);
        const figure = document.createElement('figure');
        if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.className = "lightbox-media";
            video.setAttribute("controls", "");
            figure.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.className = "lightbox-media";
            figure.appendChild(img);
        }
        const mediaTitle = document.createElement('figcaption');
        mediaTitle.className = "lightbox-media-name";
        mediaTitle.textContent = title;
        lightboxContainer.appendChild(figure);
        figure.appendChild(mediaTitle);
        const rightArrow = document.createElement('i');
        rightArrow.className = "fa-solid fa-chevron-right right-arrow";
        lightboxContainer.appendChild(rightArrow);
        const closeButton = document.createElement('i');
        closeButton.className = "fa-solid fa-xmark close-button";
        lightboxContainer.appendChild(closeButton);
        return (lightboxContainer);
    }
    return { LightboxDOM };
}



