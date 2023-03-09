function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = "photographer-card";

        const photographerProfileLink = document.createElement('a');
        photographerProfileLink.href = `photographer.html?id=${id}`;
        photographerProfileLink.setAttribute("aria-label", name);

        const photographerPicture = document.createElement('img');
        photographerPicture.src = picture;
        photographerPicture.setAttribute("alt", "");

        const photographerName = document.createElement('h2');
        photographerName.textContent = name;

        photographerProfileLink.append(photographerPicture, photographerName);

        const textContainer = document.createElement('div');
        textContainer.className = "photographer-infos";
        const photographerLocation = document.createElement('p');
        photographerLocation.className = "photographer-location";
        const photographerTagline = document.createElement('p');
        photographerTagline.className = "photographer-tagline";
        const photographerPrice = document.createElement('p');
        photographerPrice.className = "photographer-price";

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
        photographerName.className = "photographer-name";
        const photographerLocalisation = document.createElement('p');
        photographerLocalisation.className = "photographer-localisation";
        const photographerTagline = document.createElement('p');
        photographerTagline.className = "photographer-tagline";
        const photographerPicture = document.createElement('img');
        photographerPicture.setAttribute("aria-label", `${name}`);
        const contactButton = document.createElement('button');
        const moreInfo = document.createElement('div');
        const dailyPrice = document.createElement('p');

        // set attributes
        photographerName.textContent = name;
        photographerLocalisation.textContent = `${city}, ${country}`;
        photographerTagline.textContent = tagline;
        dailyPrice.textContent = `${price}€ / jour`;
        // enlever le text content
        contactButton.textContent = 'Contactez-moi';
        contactButton.className = "contact-button";
        contactButton.setAttribute("aria-label", "contact me");
        contactButton.setAttribute('onclick', 'displayModal()');
        contactButton.setAttribute('tabindex', '1');
        photographerPicture.src = picture;

        // assemble  elements
        moreInfo.className = "more-info";
        moreInfo.append(dailyPrice);
        textInfos.className = "header-text-container";
        textInfos.append(photographerName, photographerLocalisation, photographerTagline);
        photographerHeader.className = "photographer-header";
        photographerHeader.append(textInfos, contactButton, photographerPicture, moreInfo);

        return (photographerHeader);
    }
    return { getUserCardDOM };
}