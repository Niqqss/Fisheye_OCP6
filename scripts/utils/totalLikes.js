function likesUpdate(medias, likeButtons) {
    const totalLikesContainer = document.querySelector('.more-info');
    const totalLikes = document.createElement('p');
    const likeIcon = document.createElement('i');
    likeIcon.setAttribute('class', 'fa-solid fa-heart');

    let total = 0;
    medias.forEach(media => {
        total += media.likes;
    });

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', () => {
            total += likeButton.classList.contains('active') ? 1 : -1;
            totalLikes.textContent = total + ' ';
            totalLikes.appendChild(likeIcon);
        });
    });

    totalLikes.textContent = total + ' ';
    totalLikes.appendChild(likeIcon);
    totalLikesContainer.appendChild(totalLikes);
}