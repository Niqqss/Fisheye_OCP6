async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");

    if (!medias) {
        console.error(`Media not found.`);
        return;
    }

    function openLightbox(index) {
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

            const mediaElement = type === 'video' ? document.createElement('video') : document.createElement('img');
            mediaElement.src = `assets/images/${photographer.name}/${media[type]}`;
            mediaElement.className = "lightbox-media";
            mediaElement.setAttribute("alt", `${media.title}`);
            if (type === 'video') {
                mediaElement.setAttribute("controls", "");
            }
            figure.replaceChild(mediaElement, lightboxMedia);
            lightboxMedia = mediaElement;
        }

        function displayNextMedia() {
            index = (index + 1) % medias.length;
            const nextMedia = medias[index];
            displayMedia(nextMedia);
        }

        function displayPreviousMedia() {
            if (index === 0) {
                index = medias.length;
            }
            index--;
            const previousMedia = medias[index];
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
        document.querySelector('.right-arrow').addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === ' ' ) {
                displayNextMedia();
            }
        });
        document.querySelector('.left-arrow').addEventListener("click", displayPreviousMedia);
        document.querySelector('.left-arrow').addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === ' ') {
                displayPreviousMedia();
            }
        });

        closeButton.addEventListener("click", function () {
            lightbox.close()
            backgroundPage.classList.remove("hidden-body");
            lightbox.innerHTML = "";
            document.removeEventListener('keydown', handleKeyDown);
        });

        closeButton.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                lightbox.close()
                backgroundPage.classList.remove("hidden-body");
                lightbox.innerHTML = "";
                document.removeEventListener('keydown', handleKeyDown);
            }
        });
    }

    for (let i = 0; i < mediasList.length; i++) {
        mediasList[i].setAttribute('tabindex', '3');
        mediasList[i].addEventListener('click', function () {
            openLightbox(i);
        });
        mediasList[i].addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                openLightbox(i);
            }
        });
    }
}