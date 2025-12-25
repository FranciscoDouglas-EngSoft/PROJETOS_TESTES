// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const hand = document.getElementById('hand');
  const fingers = Array.from(document.querySelectorAll('.finger'));
  const thumb = document.querySelector('.finger-thumb');

  // Função para animar um dedo aleatório
  function wiggleFinger(node) {
    node.classList.remove('bend-back');
    node.classList.add('bend');
    setTimeout(() => {
      node.classList.remove('bend');
      node.classList.add('bend-back');
      // limpa classes depois da animação
      setTimeout(() => node.classList.remove('bend-back'), 450);
    }, 520);
  }

  // Agendador recursivo com intervalos aleatórios
  function scheduleWiggles() {
    // escolhe entre 1 e 3 dedos por rodada
    const count = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const pick = Math.random() < 0.18 ? thumb : fingers[Math.floor(Math.random() * fingers.length)];
      setTimeout(() => wiggleFinger(pick), i * 140 + Math.random() * 400);
    }

    // ocasionalmente fazer "wave" contínuo por alguns segundos
    if (Math.random() < 0.25) {
      hand.classList.add('wave');
      setTimeout(() => hand.classList.remove('wave'), 1200 + Math.random() * 1400);
    }

    // próxima rodada em 700ms — 2200ms
    const next = 700 + Math.random() * 1500;
    setTimeout(scheduleWiggles, next);
  }

  scheduleWiggles();
});