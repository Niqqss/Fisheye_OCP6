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
            handleEvents();
        }

        document.addEventListener('keydown', handleKeyDown);
        handleEvents();

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

        function handleEvents() {
            const rightArrow = document.querySelector('.right-arrow');
            const leftArrow = document.querySelector('.left-arrow');
            const closeButton = document.querySelector('.close-button');

            rightArrow.addEventListener("click", displayNextMedia);
            rightArrow.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    displayNextMedia();
                }
            })
            leftArrow.addEventListener("click", displayPreviousMedia);
            leftArrow.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    displayPreviousMedia();
                }
            })
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