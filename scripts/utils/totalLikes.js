function likesUpdate(medias, likeButtons) {
    const likeIcon = document.createElement('i');
    const totalLikesElement = document.querySelector('.total-likes');
    likeIcon.className = "fa-solid fa-heart";

    let total = 0;
    medias.forEach(media => {
        total += media.likes;
    });

    function updateTotalLikes() {
        totalLikesElement.textContent = total + ' ';
        totalLikesElement.appendChild(likeIcon);
    }

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', () => {
            total += likeButton.classList.contains('active') ? 1 : -1;
            updateTotalLikes();
        });
    });

    updateTotalLikes();
}