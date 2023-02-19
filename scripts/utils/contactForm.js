const modal = document.getElementById("contact-modal");

function displayModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function formNameFactory(data) {
    const {name} = data;

    function getUserNameDOM() {
        const heading = document.querySelector('h2');

        heading.textContent += ` ${name}`;
        return (heading);
    }
    return { getUserNameDOM };
}

const formInputs = [...document.querySelectorAll(".form-input")];
const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm(e) {
    e.preventDefault();
    console.log("L'utilisateur à envoyé : " + [...formInputs.map(val => val.value)]);
    form.reset();
    closeModal();
}