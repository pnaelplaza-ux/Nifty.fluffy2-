 // friendly subtle entrance animation + iOS-like spring
window.addEventListener('load', () => {
  const card = document.getElementById('card');
  if (!card) return;
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px) scale(0.992)';
  requestAnimationFrame(()=> {
    card.style.transition = 'opacity 420ms ease, transform 520ms cubic-bezier(.2,1.1,.3,1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  });

  // slight parallax on pointer move for iOS-like depth
  let raf = null;
  card.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=> {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = clamp(dy * -4, -8, 8);
      const ry = clamp(dx * 8, -12, 12);
      card.style.transform = `translateY(0) scale(1) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  }, {passive:true});

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
});

/* iOS-like press interactions for profile items (easter-egg removed) */
(() => {
  const card = document.getElementById('card');
  const profiles = Array.from(document.querySelectorAll('.profile'));
  if (!card || !profiles.length) return;

  // add iOS-like press interactions to profile links (scale + subtle shadow)
  profiles.forEach(el => {
    let pointerDown = false;
    el.addEventListener('pointerdown', (evt) => {
      pointerDown = true;
      el.style.transition = 'transform 180ms cubic-bezier(.2,1.1,.3,1), box-shadow 180ms ease';
      el.style.transform = 'translateY(0) scale(0.96)';
      el.style.boxShadow = '0 16px 36px rgba(0,0,0,0.55)';
    }, {passive:true});
    ['pointerup','pointercancel','pointerleave'].forEach(ev => {
      el.addEventListener(ev, () => {
        if (!pointerDown) return;
        pointerDown = false;
        el.style.transform = '';
        el.style.boxShadow = '';
      }, {passive:true});
    });
    // keyboard accessible press
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'cubic-bezier(.2,1.1,.3,1)' });
      }
    });
  });
})();