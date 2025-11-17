// Basic interactivity: gallery lightbox, filters, modal, form validation
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Lightbox
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lbClose');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Imagem do portfólio';
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  lbClose.addEventListener('click', closeLB);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLB();
  });
  function closeLB(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }

  // Filters
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        it.style.display = (f === 'all' || it.dataset.style === f) ? 'block' : 'none';
      });
    });
  });

  // Booking modal
  const bookNow = document.getElementById('bookNow');
  const bookBtn = document.getElementById('bookBtn');
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');

  [bookNow, bookBtn].forEach(el => {
    if(el) el.addEventListener('click', openModal);
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function openModal(){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }

  // Mobile toggle (simple)
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  if(mobileToggle){
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      if(mainNav.classList.contains('open')){
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '66px';
        mainNav.style.right = '20px';
        mainNav.style.background = 'rgba(10,10,10,0.95)';
        mainNav.style.padding = '14px';
        mainNav.style.borderRadius = '10px';
      } else {
        mainNav.style.display = '';
        mainNav.style.position = '';
      }
    });
  }

  // Form submission (demo): prevents actual submit and opens WhatsApp with data
  const bookingForm = document.getElementById('bookingForm');
  bookingForm && bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const wa = encodeURIComponent(document.getElementById('whatsapp').value.trim());
    const msg = encodeURIComponent(document.getElementById('message').value.trim());
    // Build a WhatsApp prefilled message (replace number below)
    const number = '55XXXXXXXXXXX';
    const text = `Olá, meu nome é ${name}. Gostaria de uma tatuagem. Contato: ${wa}. Ideia: ${msg}`;
    const url = `https://wa.me/${number}?text=${text}`;
    window.open(url, '_blank');
  });
});