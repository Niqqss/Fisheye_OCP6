function mediaFactory(media, photographer) {
    const { name } = photographer;
    const { image, video, likes, title } = media;
    const type = media.video ? 'video' : 'image';
    let src;
    if (type === 'video') {
        src = `assets/images/${name}/${video}`
    } else {
        src = `assets/images/${name}/${image}`;
    }

    function getUserMediasDOM() {
        const article = document.createElement('article');

        article.innerHTML =
            `
        <${type} src="${src}"></${type}>
        <div>
            <p>${title}</p>
            <p>${likes}</p>
        </div>
        `
        return (article);
    }
    return { getUserMediasDOM };
}