const callButton = document.querySelector("#callButton");
const callback = document.querySelector("#callback");
const callbackClose = document.querySelector("#callbackClose");
const callbackOverlay = document.querySelector(".callback__overlay");

if (callButton && callback) {
    callButton.addEventListener("click", () => {
        callback.classList.add("active");

        // ставим курсор в поле телефона сразу после открытия
        callbackPhone.focus();
    });
}

if (callbackClose && callback) {
    callbackClose.addEventListener("click", () => {
        callback.classList.remove("active");
    });
}

if (callbackOverlay && callback) {
    callbackOverlay.addEventListener("click", () => {
        callback.classList.remove("active");
    });
}

const callbackPhone = document.querySelector("#callbackPhone");

function formatcallbackPhone(value) {
    let digits = value.replace(/\D/g, "");

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

callbackPhone.addEventListener("input", () => {
    callbackPhone.value = formatcallbackPhone(callbackPhone.value);
});

callbackPhone.addEventListener("keydown", (event) => {
    const start = callbackPhone.selectionStart;
    const end = callbackPhone.selectionEnd;

    if (start !== end) {
        return;
    }

    if (event.key === "Backspace" && start > 0) {
        const previousChar = callbackPhone.value[start - 1];

        if (!/\d/.test(previousChar)) {
            event.preventDefault();

            let digits = callbackPhone.value.replace(/\D/g, "");

            const digitsBeforeCursor = callbackPhone.value
                .substring(0, start)
                .replace(/\D/g, "").length;

            if (digitsBeforeCursor > 0) {
                digits =
                    digits.substring(0, digitsBeforeCursor - 1) +
                    digits.substring(digitsBeforeCursor);

                callbackPhone.value = formatcallbackPhone(digits);

                let newPosition = 0;
                let count = 0;

                while (newPosition < callbackPhone.value.length && count < digitsBeforeCursor - 1) {
                    if (/\d/.test(callbackPhone.value[newPosition])) {
                        count++;
                    }
                    newPosition++;
                }

                callbackPhone.setSelectionRange(newPosition, newPosition);
            }
        }
    }
});

// Заявка
const callbackForm = document.querySelector(".callback__form");
const callbackPhoneField = callbackPhone; // нет обёртки .inputData__field в этой форме

const successMessage = document.querySelector("#callbackSuccess");
const successClose = document.querySelector("#successClose");
const successOverlay = document.querySelector(".callback__success-overlay");

let callbackPhoneErrorEl = null;

function showcallbackPhoneError() {
    callbackPhoneField.classList.add("error");

    if (!callbackPhoneErrorEl) {
        callbackPhoneErrorEl = document.createElement("span");
        callbackPhoneErrorEl.className = "inputData__error-text";
        callbackPhoneErrorEl.textContent = "Укажите номер телефона";
        callbackPhoneField.insertAdjacentElement("afterend", callbackPhoneErrorEl);
    }
}

function hidecallbackPhoneError() {
    callbackPhoneField.classList.remove("error");
    if (callbackPhoneErrorEl) {
        callbackPhoneErrorEl.remove();
        callbackPhoneErrorEl = null;
    }
}

callbackPhone.addEventListener("input", () => {
    if (callbackPhone.value.trim() !== "") {
        hidecallbackPhoneError();
    }
});

callbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    const callbackPhoneDigits = callbackPhone.value.replace(/\D/g, "");
    if (callbackPhoneDigits.length < 10) {
        showcallbackPhoneError();
        isValid = false;
        callbackPhoneField.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        hidecallbackPhoneError();
    }

    if (isValid) {
        callback.classList.remove("active");   // закрываем форму с телефоном
        successMessage.classList.add("active"); // открываем модалку успеха

        callbackPhone.value = ""; // очищаем поле для следующего раза
    }
});

if (successClose && successMessage) {
    successClose.addEventListener("click", () => {
        successMessage.classList.remove("active");
    });
}

if (successOverlay && successMessage) {
    successOverlay.addEventListener("click", () => {
        successMessage.classList.remove("active");
    });
}


// СТАРЫЙ КОД
// const callButton = document.querySelector("#callButton");
// const callback = document.querySelector("#callback");
// const callbackClose = document.querySelector("#callbackClose");
// const callbackOverlay = document.querySelector(".callback__overlay");

// callButton.addEventListener("click", () => {
//   callback.classList.add("active");
// });

// callbackClose.addEventListener("click", () => {
//   callback.classList.remove("active");
// });

// callbackOverlay.addEventListener("click", () => {
//   callback.classList.remove("active");
// });

// const callbackPhone = document.querySelector("#callbackPhone");

// function formatcallbackPhone(value) {
//   let digits = value.replace(/\D/g, "");

//   // Убираем 7 или 8 в начале
//   if (digits.startsWith("7") || digits.startsWith("8")) {
//     digits = digits.substring(1);
//   }

//   digits = digits.substring(0, 10);

//   let result = "";

//   if (digits.length > 0) {
//     result = "+7 (" + digits.substring(0, 3);
//   }

//   if (digits.length >= 3) {
//     result += ")";
//   }

//   if (digits.length > 3) {
//     result += " " + digits.substring(3, 6);
//   }

//   if (digits.length > 6) {
//     result += "-" + digits.substring(6, 8);
//   }

//   if (digits.length > 8) {
//     result += "-" + digits.substring(8, 10);
//   }

//   return result;
// }

// // Ввод
// callbackPhone.addEventListener("input", () => {
//   callbackPhone.value = formatcallbackPhone(callbackPhone.value);
// });

// // Нормальная работа Backspace и Delete
// callbackPhone.addEventListener("keydown", (event) => {
//   const start = callbackPhone.selectionStart;
//   const end = callbackPhone.selectionEnd;

//   // Если есть выделение — обычное удаление
//   if (start !== end) {
//     return;
//   }

//   // BACKSPACE
//   if (event.key === "Backspace" && start > 0) {
//     const previousChar = callbackPhone.value[start - 1];

//     // Если перед курсором стоит скобка, пробел или тире
//     if (!/\d/.test(previousChar)) {
//       event.preventDefault();

//       let digits = callbackPhone.value.replace(/\D/g, "");

//       // Считаем, сколько цифр находится до курсора
//       const digitsBeforeCursor = callbackPhone.value
//         .substring(0, start)
//         .replace(/\D/g, "").length;

//       if (digitsBeforeCursor > 0) {
//         digits =
//           digits.substring(0, digitsBeforeCursor - 1) +
//           digits.substring(digitsBeforeCursor);

//         callbackPhone.value = formatcallbackPhone(digits);

//         // Ставим курсор после нужного количества цифр
//         let newPosition = 0;
//         let count = 0;

//         while (
//           newPosition < callbackPhone.value.length &&
//           count < digitsBeforeCursor - 1
//         ) {
//           if (/\d/.test(callbackPhone.value[newPosition])) {
//             count++;
//           }
//           newPosition++;
//         }

//         callbackPhone.setSelectionRange(newPosition, newPosition);
//       }
//     }
//   }
// });

// // Заявка
// const callbackForm = document.querySelector(".callback__form");
// const successMessage = document.querySelector("#successMessage");
// const callbackPhoneField = callbackPhone;
// // .closest(".inputData__field");

// let callbackPhoneErrorEl = null;

// function showcallbackPhoneError() {
//   callbackPhoneField.classList.add("error");

//   if (!callbackPhoneErrorEl) {
//     callbackPhoneErrorEl = document.createElement("span");
//     callbackPhoneErrorEl.className = "inputData__error-text";
//     callbackPhoneErrorEl.textContent = "Укажите номер телефона";
//     callbackPhoneField.insertAdjacentElement("afterend", callbackPhoneErrorEl);
//   }
// }

// //     if (!callbackPhoneErrorEl) {
// //         callbackPhoneErrorEl = document.createElement("span");
// //         callbackPhoneErrorEl.className = "inputData__error-text";
// //         callbackPhoneErrorEl.textContent = "Укажите номер телефона";
// //         callbackPhoneField.appendChild(callbackPhoneErrorEl);
// //     }
// // }

// function hidecallbackPhoneError() {
//   callbackPhoneField.classList.remove("error");
//   if (callbackPhoneErrorEl) {
//     callbackPhoneErrorEl.remove();
//     callbackPhoneErrorEl = null;
//   }
// }

// callbackPhone.addEventListener("input", () => {
//   if (callbackPhone.value.trim() !== "") {
//     hidecallbackPhoneError();
//   }
// });

// callbackForm.addEventListener("submit", (event) => {
//   event.preventDefault(); // отменяем перезагрузку страницы

//   let isValid = true;

//   const callbackPhoneDigits = callbackPhone.value.replace(/\D/g, "");
//   if (callbackPhoneDigits.length < 10) {
//     showcallbackPhoneError();
//     isValid = false;

//     // прокрутка к полю телефона
//     callbackPhoneField.scrollIntoView({ behavior: "smooth", block: "center" });
//   } else {
//     hidecallbackPhoneError();
//   }

//   successMessage.style.display = isValid ? "block" : "none";
// });

// const callButton = document.querySelector("#callButton");
// const callback = document.querySelector("#callback");
// const callbackClose = document.querySelector("#callbackClose");
// const callbackOverlay = document.querySelector(".callback__overlay");

// const callbackcallbackPhone = document.querySelector("#callbackcallbackPhone");

// function formatcallbackPhone(value) {
//   let digits = value.replace(/\D/g, "");

//   if (digits.startsWith("7") || digits.startsWith("8")) {
//     digits = digits.substring(1);
//   }

//   digits = digits.substring(0, 10);

//   let result = "";

//   if (digits.length > 0) {
//     result = "+7 (" + digits.substring(0, 3);
//   }

//   if (digits.length >= 3) {
//     result += ")";
//   }

//   if (digits.length > 3) {
//     result += " " + digits.substring(3, 6);
//   }

//   if (digits.length > 6) {
//     result += "-" + digits.substring(6, 8);
//   }

//   if (digits.length > 8) {
//     result += "-" + digits.substring(8, 10);
//   }

//   return result;
// }

// const callbackcallbackPhone = document.querySelector("#callbackcallbackPhone");

// callbackcallbackPhone.addEventListener("input", () => {
//     callbackcallbackPhone.value = formatcallbackPhone(callbackcallbackPhone.value);
// });

// callbackcallbackPhone.addEventListener("input", (event) => {
//   console.log(event.target.value);
// });

// callButton.addEventListener("click", () => {
//   callback.classList.add("active");
// });

// callbackClose.addEventListener("click", () => {
//   callback.classList.remove("active");
// });

// callbackOverlay.addEventListener("click", () => {
//   callback.classList.remove("active");
// });

// function formatcallbackPhone(value) {
//     let digits = value.replace(/\D/g, "");

//     if (digits.startsWith("7") || digits.startsWith("8")) {
//         digits = digits.substring(1);
//     }

//     digits = digits.substring(0, 10);

//     let result = "";

//     if (digits.length > 0) {
//         result = "+7 (" + digits.substring(0, 3);
//     }

//     if (digits.length >= 3) {
//         result += ")";
//     }

//     if (digits.length > 3) {
//         result += " " + digits.substring(3, 6);
//     }

//     if (digits.length > 6) {
//         result += "-" + digits.substring(6, 8);
//     }

//     if (digits.length > 8) {
//         result += "-" + digits.substring(8, 10);
//     }

//     return result;
// }

// const callbackcallbackPhone = document.querySelector("#callbackcallbackPhone");

// callbackcallbackPhone.addEventListener("input", () => {
//     callbackcallbackPhone.value = formatcallbackPhone(callbackcallbackPhone.value);
// });
