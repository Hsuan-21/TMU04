const wordDict = {
  1: "apple", 2: "banana", 3: "grape", 4: "orange", 5: "kiwi",
  6: "mango", 7: "melon", 8: "peach", 9: "plum", 10: "pear",
  11: "lemon", 12: "lime", 13: "berry", 14: "papaya", 15: "fig",
  16: "date", 17: "guava", 18: "apricot", 19: "cherry", 20: "nectarine"
};

let usedQuestions = new Set();
let currentAnswer = "";
let guessedLetters = [];

function renderQuestions() {
  const list = document.getElementById("questionList");
  list.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const btn = document.createElement("button");
    btn.textContent = usedQuestions.has(i) ? `第${i}題已玩過` : `選第 ${i} 題`;
    btn.disabled = usedQuestions.has(i);
    btn.onclick = () => startGame(i);
    list.appendChild(btn);
    list.appendChild(document.createElement("br"));
  }
}

function startGame(num) {
  currentAnswer = wordDict[num];
  guessedLetters = [];
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("hint").textContent = `提示：這個水果有 ${currentAnswer.length} 個字母`;
  document.getElementById("progress").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("inputLetter").value = "";
  renderQuestions();
}

function makeGuess() {
  const input = document.getElementById("inputLetter").value.trim().toLowerCase();
  if (!input) return;
  if (input.length === 1) {
    if (guessedLetters.includes(input)) {
      document.getElementById("message").textContent = "你已經猜過這個字母了！";
    } else {
      guessedLetters.push(input);
      if (currentAnswer.includes(input)) {
        document.getElementById("message").textContent = `✅ 有這個字母 (${input})`;
      } else {
        document.getElementById("message").textContent = `❌ 沒有這個字母 (${input})`;
      }
    }
    document.getElementById("progress").textContent = currentAnswer.split("").map(l => guessedLetters.includes(l) ? l : "_").join(" ");
  } else {
    if (input === currentAnswer) {
      document.getElementById("message").textContent = `🎉 恭喜答對！答案是：${currentAnswer}`;
      document.getElementById("restartBtn").style.display = "inline-block";
      usedQuestions.add(Object.keys(wordDict).find(key => wordDict[key] === currentAnswer) * 1);
    } else {
      document.getElementById("message").textContent = "❌ 錯了！再試一次～";
    }
  }
  document.getElementById("inputLetter").value = "";
}

function restart() {
  document.getElementById("gameArea").style.display = "none";
  renderQuestions();
}

renderQuestions();
