document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const shine = document.getElementById('shine');
  const bg = document.querySelector('.bg-container');
  
  // Animation d'entrée fluide
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9) translateY(40px)';
  
  setTimeout(() => {
    card.style.transition = 'all 1.5s cubic-bezier(0.15, 1, 0.3, 1)';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0)';
  }, 300);

  // Gestion du mouvement et parallaxe
  const handleInteraction = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if(!x || !y) return;

    const { innerWidth, innerHeight } = window;
    
    // Inclinaison de la carte (Tilt)
    const tiltX = (y - innerHeight / 2) / 35;
    const tiltY = (x - innerWidth / 2) / 35;
    
    card.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;

    // Distorsion parallaxe du fond
    const bgMoveX = (x - innerWidth / 2) / 70;
    const bgMoveY = (y - innerHeight / 2) / 70;
    bg.style.transform = `scale(1.15) translate(${bgMoveX}px, ${bgMoveY}px)`;

    // Reflet lumineux
    shine.style.opacity = '1';
    const rect = card.getBoundingClientRect();
    const shineX = ((x - rect.left) / rect.width) * 100;
    const shineY = ((y - rect.top) / rect.height) * 100;
    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2), transparent 60%)`;
  };

  window.addEventListener('mousemove', handleInteraction);
  window.addEventListener('touchmove', handleInteraction, { passive: true });

  window.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    bg.style.transform = `scale(1.1) translate(0, 0)`;
    shine.style.opacity = '0';
  });
});
