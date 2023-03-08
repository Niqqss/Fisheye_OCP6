const listArrow = document.querySelector('#popularityFilter i');

listArrow.addEventListener('click', function () {
    if (listArrow.classList.contains('fa-chevron-down')) {
        listArrow.classList.remove('fa-chevron-down');
        listArrow.classList.add('fa-chevron-up');
    }
    else {
        listArrow.classList.remove('fa-chevron-up');
        listArrow.classList.add('fa-chevron-down');
    }
})

const activeFilter = document.querySelector('.filter ul li:first-of-type');
const filters = document.querySelectorAll('.filter ul li');
filters.forEach(filter => {
    filter.addEventListener('click', function () {
        activeFilter.textContent = filter.textContent;
        activeFilter.appendChild(listArrow)
        console.log(filter)
    })
    
});
console.log(filters)
console.log(activeFilter)