function likesUpdate(medias, likeButtons) {
    const likeIcon = document.createElement('i');
    const totalLikesElement = document.querySelector('.total-likes');
    likeIcon.className = "fa-heart fa-solid";

    let total = 0;
    medias.forEach(media => {
        total += media.likes;
    });

    function updateTotalLikes() {
        totalLikesElement.textContent = total + ' ';
        totalLikesElement.appendChild(likeIcon);
    }

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', updateLikes);
        likeButton.addEventListener('keydown', handleKeydown);

        function updateLikes() {
            total += likeButton.classList.contains('active') ? 1 : -1;
            updateTotalLikes();
        }

        function handleKeydown(e) {
            if (e.key === 'Enter') {
                updateLikes();
            }
        }
    });

    updateTotalLikes();
}