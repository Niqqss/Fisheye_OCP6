function likesUpdate(medias, likeButtons) {
    const likeIcon = document.createElement('i');
    totalLikesElement = document.querySelector('.total-likes');
    likeIcon.className = "fa-solid fa-heart";
    let total = 0;
    medias.forEach(media => {
        total += media.likes;
    });

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', () => {
            total += likeButton.classList.contains('active') ? 1 : -1;
            totalLikesElement.textContent = total + ' ';
            totalLikesElement.appendChild(likeIcon);
        });
    });

    totalLikesElement.textContent = total + ' ';
    totalLikesElement.appendChild(likeIcon);
}
