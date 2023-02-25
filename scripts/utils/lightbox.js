async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);

    if (!medias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    }
    else {
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

                function displayNextMedia() {
                    i = (i + 1) % medias.length;
                    const nextMedia = medias[i];
                    const type = nextMedia.video ? 'video' : 'image';
                    lightboxMediaName.textContent = nextMedia.title;
                    const figure = document.querySelector("dialog figure")

                    if (type === 'video') {
                        const video = document.createElement('video');
                        video.setAttribute('src', `assets/images/${photographer.name}/${nextMedia.video}`);
                        video.setAttribute('class', 'lightbox-media');
                        video.setAttribute("controls", "");
                        figure.replaceChild(video, lightboxMedia);
                        lightboxMedia = video;
                    } else {
                        const img = document.createElement('img');
                        img.setAttribute('src', `assets/images/${photographer.name}/${nextMedia.image}`);
                        img.setAttribute('class', 'lightbox-media');
                        figure.replaceChild(img, lightboxMedia);
                        lightboxMedia = img;
                    }
                }

                function displayPreviousMedia() {
                    if (i === 0) {
                        i = medias.length;
                    }
                    i = i - 1;
                    const previousMedia = medias[i];
                    const type = previousMedia.video ? 'video' : 'image';
                    lightboxMediaName.textContent = previousMedia.title;
                    const figure = document.querySelector("dialog figure")

                    if (type === 'video') {
                        const video = document.createElement('video');
                        video.setAttribute('src', `assets/images/${photographer.name}/${previousMedia.video}`);
                        video.setAttribute('class', 'lightbox-media');
                        video.setAttribute("controls", "");
                        figure.replaceChild(video, lightboxMedia);
                        lightboxMedia = video;
                    } else {
                        const img = document.createElement('img');
                        img.setAttribute('src', `assets/images/${photographer.name}/${previousMedia.image}`);
                        img.setAttribute('class', 'lightbox-media');
                        figure.replaceChild(img, lightboxMedia);
                        lightboxMedia = img;
                    }
                }

                document.querySelector('.right-arrow').addEventListener("click", function () {
                    displayNextMedia();
                });

                document.querySelector('.left-arrow').addEventListener("click", function () {
                    displayPreviousMedia();
                });

                closeButton.addEventListener("click", function () {
                    lightbox.close()
                    backgroundPage.classList.remove("hidden-body");
                    lightbox.innerHTML = "";
                })

            })
        }
    }
};