const services = document.querySelectorAll(".request__services-item");

services.forEach((service) => {
  service.addEventListener("click", () => {
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

        while (
          newPosition < phone.value.length &&
          count < digitsBeforeCursor - 1
        ) {
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
// ВАЖНО: в HTML в .request__bottom-desktop id кнопки и сообщения переименованы
// на "submit-desktop" и "successMessage-desktop", чтобы не дублировать id
// "submit" и "successMessage" из .request__bottom-adaptive
const submitButtons = [
  document.querySelector("#submit"),
  document.querySelector("#submit-desktop"),
].filter(Boolean); // filter(Boolean) уберёт null, если элемента нет на странице

const successMessages = [
  document.querySelector("#successMessage"),
  document.querySelector("#successMessage-desktop"),
].filter(Boolean);

const phoneField = phone.closest(".inputData__field");
const checkboxes = document.querySelectorAll(".privacy__policy__checkbox");

function isVisible(el) {
  // true, если элемент реально виден на странице (не display: none и не скрыт родителем)
  return el.offsetParent !== null;
}

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

// Вешаем обработчик клика на КАЖДУЮ кнопку "Отправить"
// (их 2 — адаптивная и десктопная версии блока)
submitButtons.forEach((submitButton) => {
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

    // Проверяем только ВИДИМЫЙ чекбокс (их два — по одному на адаптивную и десктопную версию блока)
    checkboxes.forEach((cb) => {
      if (isVisible(cb)) {
        if (!cb.checked) {
          cb.classList.add("checkbox-error");
          isValid = false;
        } else {
          cb.classList.remove("checkbox-error");
        }
      }
    });

    // Показываем/скрываем ВСЕ сообщения об успехе
    // successMessages.forEach((successMessage) => {
    //     successMessage.style.display = isValid ? "block" : "none";
    // });
    // Показываем/скрываем ВСЕ сообщения об успехе
    successMessages.forEach((successMessage) => {
      if (isValid) {
        showSuccessMessage(successMessage);
      } else {
        successMessage.style.display = "none";
      }
    });
            // НОВОЕ: если всё валидно — обнуляем форму
        if (isValid) {
            resetFormFields();
        }
  });
});

// Показ сообщения об успехе с автоскрытием
const successTimers = new Map(); // чтобы хранить таймер для каждого сообщения отдельно

function showSuccessMessage(el) {
  el.style.display = "block";

  // если предыдущий таймер для этого элемента ещё не сработал — сбрасываем его
  if (successTimers.has(el)) {
    clearTimeout(successTimers.get(el));
  }

  const timerId = setTimeout(() => {
    el.style.display = "none";
    successTimers.delete(el);
  }, 5000); // 4000 мс = 4 секунды, поставь своё значение

  successTimers.set(el, timerId);
}

// НОВОЕ: сброс полей формы после успешной отправки
function resetFormFields() {
    // Телефон
    phone.value = "";
    hidePhoneError();

    // Чекбоксы (адаптивный + десктопный)
    checkboxes.forEach((cb) => {
        cb.checked = false;
        cb.classList.remove("checkbox-error");
    });

    // Файл, если есть input[type=file] с id="file"
    const fileInput = document.querySelector("#file");
    if (fileInput) {
        fileInput.value = "";
    }

    // Текст рядом с "Прикрепить файл", если меняется при выборе файла
    const fileLabelText = document.querySelector(".file-upload__label-text");
    if (fileLabelText) {
        fileLabelText.textContent = "Прикрепить файл";
    }

    // Сброс выбранных услуг (.request__services-item с классом active)
    services.forEach((service) => {
        service.classList.remove("active");
    });
}
