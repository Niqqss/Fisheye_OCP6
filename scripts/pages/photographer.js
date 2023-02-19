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
    const photographerPage = document.querySelector('main');
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    if (!photographer) {
        console.error(`Photographer with id "${photographerID}" not found.`);
        return;
    }
    else {
        const photographerModel = photographerPageFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerPage.appendChild(userCardDOM);
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


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { medias } = await getPhotographers();
    displayData(photographers);
    displayMedias(medias, photographers);
    displayNameModal(photographers);
    displayLightbox(medias, photographers);

    const mediasList = document.querySelectorAll(".medias-section .media");

    mediasList.forEach((media) => media.addEventListener("click", () => {
        lightbox.showModal();
    }));
};

init();




