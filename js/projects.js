const reviews = [
    {
        text: "Ценим SIRIUS за ответственность и самостоятельность. Все вопросы решались оперативно, а договорённости соблюдались без лишнего контроля с нашей стороны.",
        company: "Славянский Дом",
        role: "Директор"
    },
    {
        text: "Работать с SIRIUS было легко и приятно — сроки соблюдены, качество на высоте, все вопросы решались без задержек.",
        company: "СтройГрупп",
        role: "Генеральный директор"
    },
    {
        text: "Профессиональный подход к делу и внимание к деталям. Рекомендуем как надёжного партнёра.",
        company: "ГлавСтрой",
        role: "Руководитель проекта"
    }
    // добавляй сколько нужно отзывов
];

let currentIndex = 0;

const reviewText = document.getElementById("reviewText");
const reviewCompany = document.getElementById("reviewCompany");
const reviewRole = document.getElementById("reviewRole");

const prevButton = document.getElementById("prevReview");
const nextButton = document.getElementById("nextReview");

const reviewBlock = document.querySelector(".p__review");

function renderReview(index) {
    reviewBlock.classList.add("fade-out");

    setTimeout(() => {
        const review = reviews[index];
        reviewText.textContent = review.text;
        reviewCompany.textContent = review.company;
        reviewRole.textContent = review.role;

        reviewBlock.classList.remove("fade-out");
    }, 300); // должно совпадать с transition в CSS
}

function showNextReview() {
    currentIndex = (currentIndex + 1) % reviews.length; // зацикливаем вперёд
    renderReview(currentIndex);
}

function showPrevReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length; // зацикливаем назад
    renderReview(currentIndex);
}

nextButton.addEventListener("click", showNextReview);
prevButton.addEventListener("click", showPrevReview);

// показать первый отзыв при загрузке
renderReview(currentIndex);