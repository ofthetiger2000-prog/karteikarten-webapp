const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const resultDiv = document.getElementById('result');

uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Bitte wähle eine Datei aus.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Upload fehlgeschlagen');
    }
    return response.json();
  })
  .then(data => {
    displayFlashcards(data);
  })
  .catch(error => {
    alert('Fehler: ' + error.message);
  });
});

function displayFlashcards(cards) {
  resultDiv.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flashcard';

    const question = document.createElement('h2');
    question.textContent = card.question;
    cardDiv.appendChild(question);

    const answer = document.createElement('div');
    answer.className = 'answer';
    answer.textContent = card.answers[0] || 'Keine Antwort verfügbar';
    cardDiv.appendChild(answer);

    let currentIndex = 0;
    answer.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % card.answers.length;
      answer.textContent = card.answers[currentIndex];
    });

    const language = document.createElement('div');
    language.textContent = 'Sprache: ' + card.language;
    cardDiv.appendChild(language);

    resultDiv.appendChild(cardDiv);
  });
}
