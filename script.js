document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const shine = document.getElementById('shine');
  
  // Effet d'entrée
  card.style.opacity = '0';
  card.style.transform = 'scale(1.1) translateY(20px)';
  
  setTimeout(() => {
    card.style.transition = 'all 1s cubic-bezier(0.2, 1, 0.3, 1)';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0)';
  }, 100);

  // Mouvement du verre et des reflets
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calcul de l'inclinaison
    const moveX = (clientX - innerWidth / 2) / 35;
    const moveY = (clientY - innerHeight / 2) / 35;
    
    // Application de la transformation 3D
    card.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    
    // Déplacement du reflet brillant
    const shineX = (clientX / innerWidth) * 100;
    const shineY = (clientY / innerHeight) * 100;
    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
  });

  // Support Mobile : accéléromètre ou simple toucher
  card.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    const { innerWidth, innerHeight } = window;
    
    const moveX = (clientX - innerWidth / 2) / 45;
    const moveY = (clientY - innerHeight / 2) / 45;
    
    card.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
  }, { passive: true });
});
