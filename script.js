document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const shine = document.getElementById('shine');
  const bg = document.querySelector('.bg-container');
  
  // Animation d'entrée sophistiquée
  card.style.opacity = '0';
  card.style.transform = 'scale(0.85) translateY(50px) rotateX(-10deg)';
  
  setTimeout(() => {
    card.style.transition = 'all 1.4s cubic-bezier(0.15, 1, 0.3, 1)';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0) rotateX(0)';
  }, 300);

  // Gestion combinée Souris + Gyroscope (Mobile)
  const handleInteraction = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if(!x || !y) return;

    const { innerWidth, innerHeight } = window;
    
    // Calcul de l'inclinaison (Tilt)
    const tiltX = (y - innerHeight / 2) / 35;
    const tiltY = (x - innerWidth / 2) / 35;
    
    card.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;

    // Effet de parallaxe sur l'arrière-plan (Distorsion)
    const bgMoveX = (x - innerWidth / 2) / 60;
    const bgMoveY = (y - innerHeight / 2) / 60;
    bg.style.transform = `scale(1.15) translate(${bgMoveX}px, ${bgMoveY}px)`;

    // Reflet de lumière dynamique
    shine.style.opacity = '1';
    const rect = card.getBoundingClientRect();
    const shineX = ((x - rect.left) / rect.width) * 100;
    const shineY = ((y - rect.top) / rect.height) * 100;
    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.18), transparent 60%)`;
  };

  window.addEventListener('mousemove', handleInteraction);
  window.addEventListener('touchmove', handleInteraction, { passive: true });

  // Retour à la normale quand on quitte
  window.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    bg.style.transform = `scale(1.1) translate(0, 0)`;
    shine.style.opacity = '0';
  });
});
