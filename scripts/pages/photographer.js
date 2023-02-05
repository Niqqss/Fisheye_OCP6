//Mettre le code JavaScript lié à la page photographer.html

const api_url = './data/photographers.json';
let photographer;

async function getPhotographer() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();


        return data;
    } catch (error) {
        console.log('There was an error', error);
    }
}

async function photographerInfos(photographer){

}


