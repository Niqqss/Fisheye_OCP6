let activeFilter = document.querySelector('.filters-list li:first-child');
const listIcon = document.createElement('i');
const filtersList = document.querySelector('.filters-list');
const filters = document.querySelectorAll('.filters-list li')
listIcon.className = "fa-solid fa-chevron-down";
activeFilter.append(listIcon);

filters.forEach(filter => {
    filter.addEventListener('click', function () {
        // Swap the active filter and clicked filter in the DOM
        filtersList.insertBefore(this, activeFilter);
        // Update the active filter reference to the clicked filter
        activeFilter = this;
        filtersList.classList.toggle('show');
        listIcon.classList.toggle('fa-chevron-down');
        listIcon.classList.toggle('fa-chevron-up');
        activeFilter.appendChild(listIcon);
    });
});


