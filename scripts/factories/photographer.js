function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const photographerProfileLink = document.createElement('a');
        photographerProfileLink.href = `photographer.html?id=${id}`;
        photographerProfileLink.setAttribute("aria-label", name);

        const photographerPicture = document.createElement('img');
        photographerPicture.setAttribute("src", picture);

        const photographerName = document.createElement('h2');
        photographerName.textContent = name;

        photographerProfileLink.append(photographerPicture, photographerName);

        const textContainer = document.createElement('div');
        const photographerLocation = document.createElement('p');
        const photographerTagline = document.createElement('p');
        const photographerPrice = document.createElement('p');

        photographerLocation.textContent = city + ", " + country;
        photographerTagline.textContent = tagline;
        photographerPrice.textContent = price + "€/jour";

        textContainer.append(photographerLocation, photographerTagline, photographerPrice);

        article.append(photographerProfileLink, textContainer);

        return (article);
    }
    return { getUserCardDOM };
}

function photographerProfileFactory(data) {
    const { name, city, country, tagline, portrait, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // declare elements
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

        // set attributes
        photographerName.textContent = name;
        photographerLocalisation.textContent = `${city}, ${country}`;
        photographerTagline.textContent = tagline;
        dailyPrice.textContent = `${price}€ / jour`;
        // enlever le text content
        contactButton.textContent = 'Contactez-moi';
        contactButton.setAttribute('class', 'contact_button');
        contactButton.setAttribute('onclick', 'displayModal()');
        photographerPicture.setAttribute('src', picture);

        // assemble  elements
        moreInfo.setAttribute('class', 'more-info');
        moreInfo.append(dailyPrice);
        pictureWrapper.setAttribute('class', 'container');
        pictureWrapper.appendChild(photographerPicture);
        textInfos.setAttribute('class', 'header-text-container');
        textInfos.append(photographerName, photographerLocalisation, photographerTagline);
        photographerHeader.setAttribute('class', 'photographer-header');
        photographerHeader.append(textInfos, contactButton, pictureWrapper, moreInfo);

        return (photographerHeader);
    }
    return { getUserCardDOM };
}