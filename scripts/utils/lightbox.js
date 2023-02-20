async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);
    const sortedMedias = sortMediasByLikes(filteredMedias);

    if (!sortedMedias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    }
    else {
        for (let i = 0; i < mediasList.length; i++) {

            mediasList[i].addEventListener('click', function () {
                const index = i;
                const media = sortedMedias[index];
                const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
                const lightboxModel = lightboxFactory(media, photographer);
                const lightboxDOM = lightboxModel.LightboxDOM();
                lightbox.appendChild(lightboxDOM);

                // penser à retirer la classe hidden-body lors du clic pour fermer 

                const backgroundPage = document.querySelector('body');
                backgroundPage.classList.add("hidden-body");

                const lightboxMedia = document.querySelector('.lightbox-media');
                let lightboxMediaName = document.querySelector('.lightbox-media-name');

                function displayNextMedia() {
                    i = (i + 1) % sortedMedias.length;
                    const nextMedia = sortedMedias[i];
                    lightboxMedia.src = "assets/images/" + photographer.name + "/" + nextMedia.image;
                    lightboxMediaName.textContent = nextMedia.title;
                }

                function displayPreviousMedia() {
                    if (i === 0) {
                        i = sortedMedias.length;
                    }
                    i = i - 1;
                    const previousMedia = sortedMedias[i];
                    lightboxMedia.src = "assets/images/" + photographer.name + "/" + previousMedia.image;
                    lightboxMediaName.textContent = previousMedia.title;
                }

                document.querySelector('.right-arrow').addEventListener("click", function () {
                    displayNextMedia();
                });

                document.querySelector('.left-arrow').addEventListener("click", function () {
                    displayPreviousMedia();
                });
            })
        }
    }
};