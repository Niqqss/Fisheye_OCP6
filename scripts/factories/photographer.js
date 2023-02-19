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

// REFAIRE L'ORDRE DE LA FONCTION

function photographerPageFactory(data) {
    const { name, city, country, tagline, portrait, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = document.createElement('div');
        const textInfos = document.createElement('div');
        const photographerName = document.createElement('h1');
        const photographerLocalisation = document.createElement('p');
        const photographerTagline = document.createElement('p');
        const photographerPicture = document.createElement('img');
        const contactButton = document.createElement('button');
        const pictureWrapper = document.createElement('div');
        const moreInfo = document.createElement('div');
        const dailyPrice = document.createElement('p');
        const likesTotal = document.createElement('p');
        const likeIcon = document.createElement('i');

        // REFAIRE L'ORDRE DE LA FONCTION

        likesTotal.textContent = 680 + " ";

        dailyPrice.textContent = price + "€ / jour";

        moreInfo.setAttribute("class", "more-info");
        moreInfo.append(likesTotal, dailyPrice);

        pictureWrapper.setAttribute("class", "container");
        pictureWrapper.appendChild(photographerPicture);

        contactButton.setAttribute("class", "contact_button");
        contactButton.setAttribute("onclick", "displayModal()");
        contactButton.textContent = "Contactez-moi";

        photographerHeader.setAttribute("class", "photographer-header");
        photographerHeader.append(textInfos, contactButton, pictureWrapper, moreInfo);

        textInfos.setAttribute("class", "header-text-container");
        textInfos.append(photographerName, photographerLocalisation, photographerTagline);

        photographerPicture.setAttribute("src", picture);

        likeIcon.setAttribute("class", "fa-solid fa-heart");
        likesTotal.appendChild(likeIcon);

        photographerName.textContent = name;
        photographerLocalisation.textContent = city + ", " + country;
        photographerTagline.textContent = tagline;
        
        return (photographerHeader);

    }
    return {getUserCardDOM};
}