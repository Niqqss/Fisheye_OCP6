function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        article.innerHTML =
        `<a href="photographer.html?id=${id}" aria-label="${name}">
            <img src="${picture}" alt="">
            <h2>${name}</h2>
        </a>
        <div>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
            <p>${price}€/jour</p>
        </div>
        `
        return (article);
    }
    return {getUserCardDOM};
}

function photographerPageFactory(data) {
    const { name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const header = document.querySelector('.photograph-header');

        header.innerHTML =
        `<div class="header-text-container">
            <h1>${name}</h1>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div class="container">
            <img src="${picture}" alt="">
        </div>
        `
        return (header);
    }
    return {getUserCardDOM};
}