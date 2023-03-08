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
    const popularityFilterButton = document.getElementById('popularityFilter');
    const totalLikesElement = document.querySelector('.total-likes');

    popularityFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'likesDescending') {
            return;
        }
        sortedMedias = sortMediasByLikes(sortedMedias);
        displaySortedMedias(sortedMedias);
        lightboxFactory(medias, photographers)
        currentSortOrder = 'likesDescending';
        likesUpdate(sortedMedias, document.querySelectorAll('i.fa-heart'));
    });

    const dateFilterButton = document.getElementById('dateFilter');
    dateFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'dateDescending') {
            return;
        }
        sortedMedias = sortMediasByDate(sortedMedias);
        displaySortedMedias(sortedMedias);
        currentSortOrder = 'dateDescending';
        likesUpdate(sortedMedias, document.querySelectorAll('i.fa-heart'));
    });

    const titleFilterButton = document.getElementById('titleFilter');
    titleFilterButton.addEventListener('click', () => {
        if (currentSortOrder === 'titleAscending') {
            return;
        }
        sortedMedias = sortMediasByTitle(sortedMedias);
        displaySortedMedias(sortedMedias);
        currentSortOrder = 'titleAscending';
        likesUpdate(sortedMedias, document.querySelectorAll('i.fa-heart'));
    });

    function displaySortedMedias(sortedMedias) {
        // clear existing medias from the DOM
        mediasSection.innerHTML = '';

        const likedMediaIds = new Set(sortedMedias.filter(media => media.liked).map(media => media.id));

        // display sorted medias
        sortedMedias.forEach((media) => {
            const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
            const mediaModel = mediaFactory(media, photographer);
            const userMediasDOM = mediaModel.getUserMediasDOM();

            // Check if the media has been liked and update the heart icon and likes count
            if (likedMediaIds.has(media.id)) {
                const likeIcon = userMediasDOM.querySelector('.fa-heart');
                likeIcon.classList.add('active');
                likeIcon.classList.add('fa-solid');
                const likesCountElement = userMediasDOM.querySelector('.likes-count');
                media.likes += 1;
                likesCountElement.textContent = media.likes + ' ';
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