async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");

    if (!medias) {
        console.error(`Media not found.`);
        return;
    }

    function openLightbox(index) {
        // adding content when opening the lightbox
        const media = medias[index];
        const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
        const lightboxDOM = new LightboxFactory(media, photographer);
        const lightboxContainer = lightboxDOM.LightboxDOM();
        lightbox.appendChild(lightboxContainer);
        const closeButton = document.querySelector('.close-button');
        const backgroundPage = document.querySelector('body');
        backgroundPage.classList.add("hidden-body");

        function displayMedia(media) {
            const lightboxDOM = new LightboxFactory(media, photographer);
            const lightboxContainer = lightboxDOM.LightboxDOM();
            const previousMediaElement = lightbox.querySelector('.lightbox-container');
            if (previousMediaElement) {
                lightbox.removeChild(previousMediaElement);
            }
            lightbox.appendChild(lightboxContainer);
        }

        function displayNextMedia() {
            index = (index + 1) % medias.length;
            const nextMedia = medias[index];
            displayMedia(nextMedia);
        }

        function displayPreviousMedia() {
            // allows to loop through the array of medias
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
            if (e.key === "Enter" || e.key === ' ') {
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