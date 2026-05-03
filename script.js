document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const shine = document.getElementById('shine');
  
  // Animation d'entrée
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9) translateY(40px)';
  
  setTimeout(() => {
    card.style.transition = 'all 1.2s cubic-bezier(0.15, 1, 0.3, 1)';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0)';
  }, 200);

  // Gestion du mouvement (PC + Mobile)
  const handleMove = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if(!x || !y) return;

    const { innerWidth, innerHeight } = window;
    
    // Inclinaison de la carte
    const tiltX = (y - innerHeight / 2) / 30;
    const tiltY = (x - innerWidth / 2) / 30;
    
    card.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;

    // Reflet brillant
    shine.style.opacity = '1';
    const rect = card.getBoundingClientRect();
    const shineX = ((x - rect.left) / rect.width) * 100;
    const shineY = ((y - rect.top) / rect.height) * 100;
    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15), transparent 60%)`;
  };

  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });

  document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    shine.style.opacity = '0';
  });
});
