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

    let currentSortOrder = 'likesDescending';

    // attach event listeners to sorting buttons
    const popularityFilterButton = document.querySelector('#popularityFilter');
    popularityFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'likesDescending') {
            return;
        }
        sortedMedias = sortMediasByLikes(sortedMedias);
        displaySortedMedias(sortedMedias);
        lightboxFactory(medias, photographers)
        currentSortOrder = 'likesDescending';
    });

    const dateFilterButton = document.querySelector('#dateFilter');
    dateFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'dateDescending') {
            return;
        }
        sortedMedias = sortMediasByDate(sortedMedias);
        displaySortedMedias(sortedMedias);
        currentSortOrder = 'dateDescending';
    });

    const titleFilterButton = document.querySelector('#titleFilter');
    titleFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'titleAscending') {
            return;
        }
        sortedMedias = sortMediasByTitle(sortedMedias);
        displaySortedMedias(sortedMedias);
        currentSortOrder = 'titleAscending';
    });

    function displaySortedMedias(sortedMedias) {
        // clear existing medias from the DOM
        mediasSection.innerHTML = '';

        const likedMediaIds = new Set(sortedMedias.filter(media => media.liked).map(media => media.id));
        console.log(likedMediaIds);

        // display sorted medias
        sortedMedias.forEach((media) => {
            const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
            const mediaModel = mediaFactory(media, photographer);
            const userMediasDOM = mediaModel.getUserMediasDOM();
            if (likedMediaIds.has(media.id)) {
                const likeIcon = userMediasDOM.querySelector('.fa-heart');
                likeIcon.classList.add('active');
                likeIcon.classList.add('fa-solid');
            }
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