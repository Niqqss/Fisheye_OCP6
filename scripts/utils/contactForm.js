const modal = document.getElementById("contact_modal");

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
    console.log([...formInputs.map(val => val.value)]);
    console.log("message pour signaler a l'utilisateur que son message a été envoyé");
    form.reset();
}