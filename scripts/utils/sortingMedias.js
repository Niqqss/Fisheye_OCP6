async function displayMedias(medias, photographers) {
    const mediasSection = document.querySelector('.medias-section');
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);
    if (!filteredMedias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    } else {
        var sortedMedias = sortMediasByLikes(filteredMedias);
        displaySortedMedias(sortedMedias);
    }

    // default sort order
    let currentSortOrder = 'likesDescending';

    function sortingMethod(filterId, sortOrder, sortFunction) {
        const filterSelect = document.getElementById(filterId);

        function sortMedias() {
            // prevent sorting the array if same filter is clicked
            if (currentSortOrder === sortOrder) {
                return;
            }
            sortedMedias = sortFunction(sortedMedias);
            displaySortedMedias(sortedMedias);
            lightboxFactory(medias, photographers);
            currentSortOrder = sortOrder;
            likesUpdate(sortedMedias, document.querySelectorAll('i.fa-heart'));
        }

        filterSelect.addEventListener('click', sortMedias);
        filterSelect.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                sortMedias();
            }
        });
    }

    // attach click event listeners
    sortingMethod('popularityFilter', 'likesDescending', sortMediasByLikes);
    sortingMethod('dateFilter', 'dateDescending', sortMediasByDate);
    sortingMethod('titleFilter', 'titleAscending', sortMediasByTitle);

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

        mediasList.forEach((media) => {
            media.addEventListener("click", () => {
                lightbox.showModal();
            });

            media.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    lightbox.showModal();
                }
            });
        });
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