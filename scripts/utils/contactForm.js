const modal = document.getElementById("contact-modal");
const closeButton = document.querySelector(".modal header img");

modal.addEventListener("keydown", function (e) {
  const focusableElements = modal.querySelectorAll('img, button, textarea, input[type="text"]');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  let isTabPressed = e.key === 'Tab';

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    /* if shift key pressed for shift + tab combination */
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else {
    /* if tab key is pressed */
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
});

function displayModal() {
  modal.style.display = "block";
  modal.focus();
  const contactLabel = document.querySelector("dialog h2").textContent;
  const contactModal = document.getElementById("contact-modal");
  contactModal.setAttribute("aria-labelledby", contactLabel);
}

function closeModal() {
  modal.style.display = "none";
}

function formNameFactory(data) {
  const { name } = data;

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
document.addEventListener("keydown", handleKeyDown);

function handleForm(e) {
  e.preventDefault();
  const userInfos = {
    firstName: formInputs[0].value,
    lastName: formInputs[1].value,
    email: formInputs[2].value,
    message: formInputs[3].value
  }
  console.log(userInfos);
  form.reset();
  closeModal();
}

function handleKeyDown(e) {
  if (e.key === "Enter" && formInputs.some(input => input === document.activeElement)) {
    e.preventDefault();
  }
  if (e.key === "Escape" || e.key === "Enter" && closeButton === document.activeElement) {
    closeModal();
  }
}