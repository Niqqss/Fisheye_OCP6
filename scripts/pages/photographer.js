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
    const photographerPage = document.getElementById('main');
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    if (!photographer) {
        console.error(`Photographer with id "${photographerID}" not found.`);
        return;
    }
    else {
        const photographerModel = photographerProfileFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerPage.appendChild(userCardDOM);
    }
}

async function displayNameModal(photographers) {
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    if (!photographer) {
        console.error(`Could not display photographer name for ID "${photographerID}"`);
        return;
    }
    else {
        const formModel = formNameFactory(photographer);
        const formDOM = formModel.getUserNameDOM();
    }
}

async function displayTotalLikes(photographers, medias) {
    const photographer = photographers.find((photographer) => photographer.id == photographerID);
    const filteredMedias = medias.filter((media) => media.photographerId == photographerID);

    if (!photographer) {
        console.error(`Could not display total likes for photographer with id "${photographerID}"`);
        return;
    }
    else {
        const likeButtons = document.querySelectorAll('i.fa-heart');
        const totalLikesContainer = document.querySelector('.more-info');
        let totalLikesElement = totalLikesContainer.querySelector('.total-likes');

        if (!totalLikesElement) {
            totalLikesElement = document.createElement('p');
            totalLikesElement.classList.add('total-likes');
            totalLikesContainer.appendChild(totalLikesElement);
        }
        likesUpdate(filteredMedias, likeButtons);
    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { medias } = await getPhotographers();
    displayData(photographers);
    displayNameModal(photographers);
    displayMedias(medias, photographers);
    displayTotalLikes(photographers, medias);
}

init();