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

    function addFilterClickListener(buttonId, sortOrder, sortFunction) {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            if (currentSortOrder === sortOrder) {
                return;
            }
            sortedMedias = sortFunction(sortedMedias);
            displaySortedMedias(sortedMedias);
            lightboxFactory(medias, photographers);
            currentSortOrder = sortOrder;
            likesUpdate(sortedMedias, document.querySelectorAll('i.fa-heart'));
        });
    }

    addFilterClickListener('popularityFilter', 'likesDescending', sortMediasByLikes);
    addFilterClickListener('dateFilter', 'dateDescending', sortMediasByDate);
    addFilterClickListener('titleFilter', 'titleAscending', sortMediasByTitle);

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
                media.likes += 1;
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