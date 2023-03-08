async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");

    if (!medias) {
        console.error(`Media not found.`);
        return;
    }

    for (let i = 0; i < mediasList.length; i++) {
        mediasList[i].addEventListener('click', function () {
            const index = i;
            const media = medias[index];
            const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
            const lightboxModel = lightboxFactory(media, photographer);
            const lightboxDOM = lightboxModel.LightboxDOM();
            lightbox.appendChild(lightboxDOM);
            const closeButton = document.querySelector('.close-button');
            const backgroundPage = document.querySelector('body');
            backgroundPage.classList.add("hidden-body");

            let lightboxMedia = document.querySelector('.lightbox-media');
            let lightboxMediaName = document.querySelector('.lightbox-media-name');

            function displayMedia(media) {
                const type = media.video ? 'video' : 'image';
                lightboxMediaName.textContent = media.title;
                const figure = document.querySelector("dialog figure");

                if (type === 'video') {
                    const video = document.createElement('video');
                    video.src = `assets/images/${photographer.name}/${media.video}`;
                    video.className = "lightbox-media";
                    video.setAttribute("controls", "");
                    figure.replaceChild(video, lightboxMedia);
                    lightboxMedia = video;
                } else {
                    const img = document.createElement('img');
                    img.src = `assets/images/${photographer.name}/${media.image}`;
                    img.className = "lightbox-media";
                    figure.replaceChild(img, lightboxMedia);
                    lightboxMedia = img;
                }
            }

            function displayNextMedia() {
                i = (i + 1) % medias.length;
                const nextMedia = medias[i];
                displayMedia(nextMedia);
            }

            function displayPreviousMedia() {
                if (i === 0) {
                    i = medias.length;
                }
                i--;
                const previousMedia = medias[i];
                displayMedia(previousMedia);
            }

            function handleKeyDown(event) {
                if (event.key === 'Escape') {
                    lightbox.close();
                    backgroundPage.classList.remove("hidden-body");
                    lightbox.innerHTML = "";
                    document.removeEventListener('keydown', handleKeyDown);
                } else if (event.key === 'ArrowRight') {
                    displayNextMedia();
                } else if (event.key === 'ArrowLeft') {
                    displayPreviousMedia();
                }
            }

            document.addEventListener('keydown', handleKeyDown);
            document.querySelector('.right-arrow').addEventListener("click", displayNextMedia);
            document.querySelector('.left-arrow').addEventListener("click", displayPreviousMedia);

            closeButton.addEventListener("click", function () {
                lightbox.close()
                backgroundPage.classList.remove("hidden-body");
                lightbox.innerHTML = "";
                document.removeEventListener('keydown', handleKeyDown);
            });
        });
    };
};