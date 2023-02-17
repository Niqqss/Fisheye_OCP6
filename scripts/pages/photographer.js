//Mettre le code JavaScript lié à la page photographer.html

const api_url = './data/photographers.json';
const params = new URLSearchParams(window.location.search);
let photographerID = params.get("id");

async function getPhotographers() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('There was an error', error);
    }
}

async function displayData(photographers) {
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    if (!photographer) {
        console.error(`Photographer with id "${photographerID}" not found.`);
        return;
    }
    else {
        const photographerModel = photographerPageFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
    }
};

async function displayMedias(medias, photographers) {
    const mediasSection = document.querySelector('.medias-section');
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);
    if (!filteredMedias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    }
    else {
        filteredMedias.forEach((media) => {
            const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
            const mediaModel = mediaFactory(media, photographer);
            const userMediasDOM = mediaModel.getUserMediasDOM();
            mediasSection.appendChild(userMediasDOM);
        });
    }
};

async function displayNameModal(photographers) {
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    if (!photographer) {
        console.error(`Photographer with id "${photographerID}" not found.`);
        return;
    }
    else {
        const formModel = formNameFactory(photographer);
        const formDOM = formModel.getUserNameDOM();
    }
}

async function displayLightbox(medias, photographers) {
    const lightbox = document.getElementById('lightbox');
    const mediasList = document.querySelectorAll(".medias-section .media");
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);

    if (!filteredMedias) {
        console.error(`Media with id "${photographerID}" not found.`);
        return;
    }
    else {
        for (let i = 0; i < mediasList.length; i++) {
            mediasList[i].addEventListener('click', function () {
                const index = i;
                const media = filteredMedias[index]
                const photographer = photographers.find((photographer) => photographer.id == media.photographerId);
                const lightboxModel = lightboxFactory(media, photographer);
                const lightboxDOM = lightboxModel.LightboxDOM();
                lightbox.appendChild(lightboxDOM);
            })
        }
    }
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { medias } = await getPhotographers();
    displayData(photographers);
    displayMedias(medias, photographers);
    displayNameModal(photographers);
    displayLightbox(medias, photographers);

    const lightbox = document.getElementById("lightbox");
    const mediasList = document.querySelectorAll(".medias-section .media");


    mediasList.forEach((media) => media.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightbox.showModal();
    }));

    closeButton.addEventListener('click', () => {
        lightbox.close();
    });
};

init();