async function displayMedias(medias, photographers) {
    const mediasSection = document.querySelector('.medias-section');
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);
    if (!filteredMedias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    } else {
        var sortedMedias = sortMediasByLikes(filteredMedias);
        displaySortedMedias(sortedMedias);
    };

    // attach event listeners to sorting buttons
    const popularityFilterButton = document.querySelector('#popularityFilter');
    popularityFilterButton.addEventListener('click', () => {
        sortedMedias = sortMediasByLikes(sortedMedias);
        displaySortedMedias(sortedMedias);
        lightboxFactory(medias, photographers)
    });

    const dateFilterButton = document.querySelector('#dateFilter');
    dateFilterButton.addEventListener('click', () => {
        sortedMedias = sortMediasByDate(sortedMedias);
        displaySortedMedias(sortedMedias);
    });

    const titleFilterButton = document.querySelector('#titleFilter');
    titleFilterButton.addEventListener('click', () => {
        sortedMedias = sortMediasByTitle(sortedMedias);
        displaySortedMedias(sortedMedias);
    });

    function displaySortedMedias(sortedMedias) {
        // clear existing medias from the DOM
        while (mediasSection.firstChild) {
            mediasSection.removeChild(mediasSection.firstChild);
        }

        // display sorted medias
        sortedMedias.forEach((media) => {
            const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
            const mediaModel = mediaFactory(media, photographer);
            const userMediasDOM = mediaModel.getUserMediasDOM();
            mediasSection.appendChild(userMediasDOM);
        });

        displayLightbox(sortedMedias, photographers);

        const mediasList = document.querySelectorAll(".medias-section .media");

        mediasList.forEach((media) => media.addEventListener("click", () => {
            lightbox.showModal();
        }));
    }
}


function sortMediasByLikes(medias) {
    return medias.sort((a, b) => b.likes - a.likes);
}

function sortMediasByDate(medias) {
    return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortMediasByTitle(medias) {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
}