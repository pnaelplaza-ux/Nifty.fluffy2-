window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  
  // Animation d'entrée douce
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95) translateY(20px)';
  
  setTimeout(() => {
    card.style.transition = 'all 800ms cubic-bezier(.2, 1, .3, 1)';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0)';
  }, 100);

  // Effet de parallaxe léger au mouvement de la souris (Bureau)
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
});
