const services = document.querySelectorAll(".request__services-item")

services.forEach((service) => {
    service.addEventListener('click', ()=> {
        service.classList.toggle("active");
    });
});


const phone = document.querySelector("#phone");

function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    // Убираем 7 или 8 в начале
    if (digits.startsWith("7") || digits.startsWith("8")) {
        digits = digits.substring(1);
    }

    digits = digits.substring(0, 10);

    let result = "";

    if (digits.length > 0) {
        result = "+7 (" + digits.substring(0, 3);
    }

    if (digits.length >= 3) {
        result += ")";
    }

    if (digits.length > 3) {
        result += " " + digits.substring(3, 6);
    }

    if (digits.length > 6) {
        result += "-" + digits.substring(6, 8);
    }

    if (digits.length > 8) {
        result += "-" + digits.substring(8, 10);
    }

    return result;
}


// Ввод
phone.addEventListener("input", () => {
    phone.value = formatPhone(phone.value);
});


// Нормальная работа Backspace и Delete
phone.addEventListener("keydown", (event) => {
    const start = phone.selectionStart;
    const end = phone.selectionEnd;

    // Если есть выделение — обычное удаление
    if (start !== end) {
        return;
    }

    // BACKSPACE
    if (event.key === "Backspace" && start > 0) {
        const previousChar = phone.value[start - 1];

        // Если перед курсором стоит скобка, пробел или тире
        if (!/\d/.test(previousChar)) {
            event.preventDefault();

            let digits = phone.value.replace(/\D/g, "");

            // Считаем, сколько цифр находится до курсора
            const digitsBeforeCursor = phone.value
                .substring(0, start)
                .replace(/\D/g, "").length;

            if (digitsBeforeCursor > 0) {
                digits =
                    digits.substring(0, digitsBeforeCursor - 1) +
                    digits.substring(digitsBeforeCursor);

                phone.value = formatPhone(digits);

                // Ставим курсор после нужного количества цифр
                let newPosition = 0;
                let count = 0;

                while (newPosition < phone.value.length && count < digitsBeforeCursor - 1) {
                    if (/\d/.test(phone.value[newPosition])) {
                        count++;
                    }
                    newPosition++;
                }

                phone.setSelectionRange(newPosition, newPosition);
            }
        }
    }
});

// Заявка
const submitButton = document.querySelector("#submit");
const successMessage = document.querySelector("#successMessage");
const phoneField = phone.closest(".inputData__field");
const checkbox = document.querySelector(".privacy__policy__checkbox");

let phoneErrorEl = null;

function showPhoneError() {
    phoneField.classList.add("error");

    if (!phoneErrorEl) {
        phoneErrorEl = document.createElement("span");
        phoneErrorEl.className = "inputData__error-text";
        phoneErrorEl.textContent = "Укажите номер телефона";
        phoneField.appendChild(phoneErrorEl); // внутрь поля, не в грид
    }
}

function hidePhoneError() {
    phoneField.classList.remove("error");
    if (phoneErrorEl) {
        phoneErrorEl.remove();
        phoneErrorEl = null;
    }
}

phone.addEventListener("input", () => {
    if (phone.value.trim() !== "") {
        hidePhoneError();
    }
});

submitButton.addEventListener("click", () => {
    let isValid = true;

    const phoneDigits = phone.value.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        showPhoneError();
        isValid = false;

        // прокрутка к полю телефона
        phoneField.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        hidePhoneError();
    }

    if (!checkbox.checked) {
        checkbox.classList.add("checkbox-error");
        isValid = false;
    } else {
        checkbox.classList.remove("checkbox-error");
    }

    if (isValid) {
        successMessage.style.display = "block";
    } else {
        successMessage.style.display = "none";
    }
});





// Телефон
// const phone = document.querySelector("#phone");

// phone.addEventListener("input", () => {
//     let value = phone.value.replace(/\D/g, "");

//     if (value.startsWith("7") || value.startsWith("8")) {
//         value = value.substring(1);
//     }

//     value = value.substring(0, 10);

//     let formatted = "+7";

//     if (value.length > 0) {
//         formatted += ` (${value.substring(0, 3)}`;
//     }

//     if (value.length >= 3) {
//         formatted += ")";
//     }

//     if (value.length > 3) {
//         formatted += ` ${value.substring(3, 6)}`;
//     }

//     if (value.length > 6) {
//         formatted += `-${value.substring(6, 8)}`;
//     }

//     if (value.length > 8) {
//         formatted += `-${value.substring(8, 10)}`;
//     }

//     phone.value = formatted;
// });