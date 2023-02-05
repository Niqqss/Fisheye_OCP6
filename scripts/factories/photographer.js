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