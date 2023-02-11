document.addEventListener('DOMContentLoaded', function () {
    // using a timeout so the domcontent is fully loaded
    setTimeout(function () {
        const lightbox = document.getElementById("lightbox");
        const medias = document.querySelectorAll(".medias-section .media");
        const closeButton = document.querySelector(".close-button");

        medias.forEach((media) => media.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightbox.showModal();
        }));

        closeButton.addEventListener('click', () => {
            lightbox.style.display = "none";
            lightbox.close();
        });

    }, 100);
});


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
        const leftArrow = document.createElement('span');
        leftArrow.textContent = "<";
        leftArrow.setAttribute("class", "leftarrow");
        lightboxContainer.appendChild(leftArrow);
        const figure = document.createElement('figure');
        if (type === 'video') {
            const video = document.createElement('video');
            video.setAttribute("src", src);
            video.setAttribute("class", "media");
            figure.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.setAttribute("src", src);
            img.setAttribute("class", "media");
            figure.appendChild(img);
        }
        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;
        lightboxContainer.appendChild(figure);
        figure.appendChild(mediaTitle);
        const rightArrow = document.createElement('span');
        rightArrow.textContent = ">";
        rightArrow.setAttribute("class", "rightarrow");
        lightboxContainer.appendChild(rightArrow);
        const closeButton = document.createElement('span');
        closeButton.textContent = "x";
        closeButton.setAttribute("class", "close-button");
        lightboxContainer.appendChild(closeButton);
        return (lightboxContainer);
    }
    return { name, image, LightboxDOM };
}

