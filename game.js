// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Массив вопросов
const questions = [
  { question: "Какого цвета небо?", answers: ["Синее", "Зелёное", "Красное"], correct: 0 },
  { question: "Сколько ног у кошки?", answers: ["2", "4", "8"], correct: 1 },
  { question: "Сколько будет 2+2?", answers: ["3", "4", "5"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const endGameBtn = document.getElementById("endGameBtn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = ""; // Очистить предыдущие ответы

  // Создаём кнопки с вариантами ответов
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

// Проверка ответа
function checkAnswer(index) {
  if (index === questions[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

// Завершение игры
function endGame() {
  questionEl.textContent = "Игра окончена!";
  answersEl.innerHTML = "";
  scoreEl.textContent = `Ваш счёт: ${score}/${questions.length}`;
  
  // Показываем кнопку для отправки результата
  endGameBtn.style.display = "block";
}

// Отправка данных в Telegram через WebApp
endGameBtn.addEventListener("click", () => {
  tg.sendData(JSON.stringify({ score })); // Отправляем результат (счёт) в бота
  tg.close(); // Закрываем WebApp
});

// Загружаем первый вопрос
loadQuestion();

// Расширяем WebApp для полноэкранного режима
tg.expand();
