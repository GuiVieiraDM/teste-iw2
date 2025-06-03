document.addEventListener("DOMContentLoaded", function () {
  // SCRIPTS HEADER
  const options = document.querySelectorAll(".option");
  options.forEach(option => {
    option.addEventListener("click", e => {
      e.preventDefault();
      options.forEach(o => o.classList.remove("active"));
      option.classList.add("active");
    });
  });

  const navItems = document.querySelectorAll("nav ul li");

  navItems.forEach(item => {
    item.addEventListener("click", e => {
      e.stopPropagation();

      const isActive = item.classList.contains("active");

      if (isActive) {
        item.classList.remove("active");
      } else {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });

  document.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
  });

  const menuItemsWithSubmenu = document.querySelectorAll("nav ul li[data-id]");
  const submenus = document.querySelectorAll(".submenu");

  function closeAllSubmenus() {
    submenus.forEach(menu => menu.classList.remove("show"));
  }

  menuItemsWithSubmenu.forEach(item => {
    const submenu = item.querySelector(".submenu");
    item.addEventListener("click", e => {
      e.stopPropagation();
      const isVisible = submenu.classList.contains("show");
      closeAllSubmenus();
      if (!isVisible) {
        submenu.classList.add("show");
      }
    });
  });

  document.addEventListener("click", () => {
    closeAllSubmenus();
  });

  const input = document.getElementById("searchInput");
  const text = "Encontrar empreendimentos";
  let index = 0;

  function typeWriter() {
    if (index <= text.length) {
      input.setAttribute("placeholder", text.slice(0, index) + (index < text.length ? "|" : ""));
      index++;
      setTimeout(typeWriter, 150);
    } else {
      setTimeout(() => {
        index = 0;
        typeWriter();
      }, 3000);
    }
  }

  typeWriter();

  // FIM SCRIPTS HEADER

  // SCRIPTS HERO

  const heroWrapper = document.querySelector(".hero-wrapper");
  const numberText = document.querySelector(".navigation-wrapper p");
  const heroPreviButton = document.querySelector(".nav-button.heroPrev");
  const heroNextButton = document.querySelector(".nav-button.heroNext");

  const backgrounds = [
    "#3F51B5",
    "#8BC34A",
    "#03A9F4",
    "#E91E63",
    "#9C27B0",
    "#FF5722",
    "#607D8B",
    "#FFC107",
    "#4CAF50",
    "#FF9900"
  ];

  let currentIndex = 0;
  let autoSlideInterval = null;
  let userInteracted = false;

  function updateBackground(index) {
    heroWrapper.style.transition = "background-color 0.8s ease ";
    heroWrapper.style.backgroundColor = backgrounds[index];

    const formattedNumber = String(index + 1).padStart(2, "0");
    const totalSlides = String(backgrounds.length).padStart(2, "0");
    numberText.textContent = `${formattedNumber}/${totalSlides}`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    updateBackground(currentIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!userInteracted) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  updateBackground(currentIndex);
  startAutoSlide();

  heroPreviButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length;
    updateBackground(currentIndex);
    stopAutoSlide();
  });

  heroNextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    updateBackground(currentIndex);
    stopAutoSlide();
  });

  // FIM SCRIPTS HERO

  // SCRIPTS HIGHLIGHTS

  const cardsData = [
    { id: 1, type: 'Lançamentos', color: '#FF9900', title: 'Empreendimento 1' },
    { id: 2, type: 'Lançamentos', color: '#8BC34A', title: 'Empreendimento 2' },
    { id: 3, type: 'Lançamentos', color: '#03A9F4', title: 'Empreendimento 3' },
    { id: 4, type: 'Futuros', color: '#E91E63', title: 'Empreendimento 4' },
    { id: 5, type: 'Futuros', color: '#9C27B0', title: 'Empreendimento 5' },
    { id: 6, type: 'Futuros', color: '#FF5722', title: 'Empreendimento 6' },
    { id: 7, type: 'Em obra', color: '#607D8B', title: 'Empreendimento 7' },
    { id: 8, type: 'Em obra', color: '#FFC107', title: 'Empreendimento 8' },
    { id: 9, type: 'Em obra', color: '#4CAF50', title: 'Empreendimento 9' },
    { id: 10, type: 'Em obra', color: '#3F51B5', title: 'Empreendimento 10' },
    { id: 11, type: 'Contratados', color: '#8BC34A', title: 'Empreendimento 11' },
    { id: 12, type: 'Contratados', color: '#FF9900', title: 'Empreendimento 12' },
    { id: 13, type: 'Contratados', color: '#03A9F4', title: 'Empreendimento 13' }
  ];
  
  let currentPage = 0;
  const cardsPerPage = 3;
  let currentCards = cardsData;

  const cardsContainer = document.querySelector('.cards-container');
  const pageCounter = document.querySelector('.highlights-navigation-wrapper p');
  const prevButton = document.querySelector('.highlights-prev');
  const nextButton = document.querySelector('.highlights-next');

  function renderCards(cards) {
    cardsContainer.innerHTML = '';

    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleCards = cards.slice(start, end);

    if (visibleCards.length <= 2) {
      cardsContainer.classList.add('align-start');
    } else {
      cardsContainer.classList.remove('align-start');
    }

    visibleCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.style.backgroundColor = card.color;
      cardElement.innerHTML = `
        <p>Nome do bairro, cidade, UF</p>
        <h3>${card.title}</h3>
        <p>${card.type}</p>
        <button class="hightlights-cta-button">
          Detalhes 
          <div class="icon-wrapper">
            <div class="icon-inner"><i class="icon-arrow"></i></div>
          </div>
        </button>   
      `;
      cardsContainer.appendChild(cardElement);
    });

    updatePagination(cards.length);
  }

  function updatePagination(totalCards) {
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    pageCounter.textContent = `${String(currentPage + 1).padStart(2, '0')}/${String(totalPages).padStart(2, '0')}`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= totalPages - 1;
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      renderCards(currentCards);
    }
  });

  nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(currentCards.length / cardsPerPage);
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderCards(currentCards);
    }
  });

  const typeButtons = document.querySelectorAll('.type-selectors-button');
  typeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedType = button.textContent.trim();

      if (button.classList.contains('type-selected')) {
        button.classList.remove('type-selected');
        currentCards = cardsData;
      } else {
        typeButtons.forEach(btn => btn.classList.remove('type-selected'));
        button.classList.add('type-selected');
        currentCards = cardsData.filter(card => card.type === selectedType);
      }

      currentPage = 0;
      renderCards(currentCards);
    });
  });

  renderCards(currentCards);

  // FIM SCRIPTS HIGHLIGHTS

  // SCRIPTS TESTIMONY

  const clientWrapper = document.querySelector('.client-card-wrapper');
  const navText = document.querySelector('.testimony-navigation-wrapper p');
  const prevBtn = document.querySelector('.testimony-prev');
  const nextBtn = document.querySelector('.testimony-next');

  const testimonyCardsData = [
    { id: 1, name: 'João Silva', color: '#e88a00', job: 'CEO da Construtora Alfa' },
    { id: 2, name: 'Maria Oliveira', color: '#8BC34A', job: 'Gerente da Imob Prime' },
    { id: 3, name: 'Carlos Souza', color: '#03A9F4', job: 'Fundador da MoveIn' },
    { id: 4, name: 'Ana Costa', color: '#E91E63', job: 'Diretora da Casa Nova' },
    { id: 5, name: 'Fernanda Lima', color: '#9C27B0', job: 'Sócia da Realize' },
    { id: 6, name: 'Rafael Martins', color: '#FF5722', job: 'Analista da Urbano' },
    { id: 7, name: 'Beatriz Mendes', color: '#607D8B', job: 'Consultora na Habita' },
    { id: 8, name: 'Luiz Fernando', color: '#FFC107', job: 'CEO da VidaLar' },
    { id: 9, name: 'Juliana Rocha', color: '#4CAF50', job: 'Designer na StudioCasa' },
    { id: 10, name: 'Pedro Henrique', color: '#3F51B5', job: 'Engenheiro da NovaBase' },
  ];

  let testimonyIndex = 0;
  let testimonyAutoInterval = null;
  let testimonyUserInteracted = false;

  function renderTestimonyCard(index) {
    const data = testimonyCardsData[index];
    clientWrapper.innerHTML = `
      <div class="testimony-card">
        <div class="avatar-wrapper">
          <div class="testimony-avatar" style="background-color: ${data.color};"></div>
          <span class="quote-mark">”</span>
        </div>
        <div class="testimony-content">
          <h3>${data.name}</h3>
          <span>${data.job}</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nisl eget erat efficitur dapibus, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nisl eget erat efficitur dapibus, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nisl eget erat efficitur dapibus.</p>
        </div>
      </div>
    `;

    const formatted = String(index + 1).padStart(2, '0');
    const total = String(testimonyCardsData.length).padStart(2, '0');
    navText.textContent = `${formatted}/${total}`;
  }

  function nextTestimony() {
    testimonyIndex = (testimonyIndex + 1) % testimonyCardsData.length;
    renderTestimonyCard(testimonyIndex);
  }

  function prevTestimony() {
    testimonyIndex = (testimonyIndex - 1 + testimonyCardsData.length) % testimonyCardsData.length;
    renderTestimonyCard(testimonyIndex);
  }

  function startAutoTestimony() {
    testimonyAutoInterval = setInterval(() => {
      if (!testimonyUserInteracted) {
        nextTestimony();
      }
    }, 5000);
  }

  function stopAutoTestimony() {
    clearInterval(testimonyAutoInterval);
  }

  nextBtn.addEventListener('click', () => {
    nextTestimony();
    testimonyUserInteracted = true;
    stopAutoTestimony();
  });

  prevBtn.addEventListener('click', () => {
    prevTestimony();
    testimonyUserInteracted = true;
    stopAutoTestimony();
  });

  renderTestimonyCard(testimonyIndex);
  startAutoTestimony();

  // FIM SCRIPTS TESTIMONY

  // SCRIPTS PARTINERSHIPS

  const partnersCardsData = [
    { name: "OpenAI", color: "#10A37F" },
    { name: "Apple", color: "#A3AAAE" },
    { name: "Slack", color: "#4A154B" },
    { name: "Google", color: "#4285F4" },
    { name: "Amazon", color: "#FF9900" },
    { name: "Microsoft", color: "#737373" },
    { name: "Netflix", color: "#E50914" },
    { name: "Adobe", color: "#FF0000" },
    { name: "Meta", color: "#4267B2" },
    { name: "Dropbox", color: "#007EE5" },
    { name: "Spotify", color: "#1DB954" },
    { name: "Zoom", color: "#2D8CFF" },
    { name: "Figma", color: "#F24E1E" },
    { name: "Notion", color: "#000000" },
    { name: "Stripe", color: "#635BFF" },
    { name: "Github", color: "#333" },
    { name: "Trello", color: "#0079BF" },
    { name: "Atlassian", color: "#0052CC" },
    { name: "LinkedIn", color: "#0077B5" },
    { name: "Shopify", color: "#96BF48" }
  ];

  const partnersWrapper = document.querySelector('.partners-card-wrapper');
  const partnersNavText = document.querySelector('.partnerships-navigation-wrapper p');
  const partnersPrevBtn = document.querySelector('.partnerships-prev');
  const partnersNextBtn = document.querySelector('.partnerships-next');

  let partnersIndex = 0;
  let partnersPerPage = 1;

  function calculatePartnersPerPage() {
    const width = window.innerWidth;
    if (width >= 1200) return 5;
    if (width >= 992) return 4;
    if (width >= 768) return 3;
    if (width >= 576) return 2;
    return 1;
  }

  function renderPartnersCards() {
    partnersPerPage = calculatePartnersPerPage();
    const start = partnersIndex * partnersPerPage;
    const end = start + partnersPerPage;
    const currentCards = partnersCardsData.slice(start, end);

    partnersWrapper.innerHTML = currentCards.map(card => `
      <div class="partners-card">
        <div class="partners-avatar" style="background-color: ${card.color};"></div>
        <h3>${card.name}</h3>
      </div>
    `).join('');

    const totalPages = Math.ceil(partnersCardsData.length / partnersPerPage);
    const formattedIndex = String(partnersIndex + 1).padStart(2, '0');
    const formattedTotal = String(totalPages).padStart(2, '0');
    partnersNavText.textContent = `${formattedIndex}/${formattedTotal}`;
  }

  function nextPartners() {
    const totalPages = Math.ceil(partnersCardsData.length / partnersPerPage);
    partnersIndex = (partnersIndex + 1) % totalPages;
    renderPartnersCards();
  }

  function prevPartners() {
    const totalPages = Math.ceil(partnersCardsData.length / partnersPerPage);
    partnersIndex = (partnersIndex - 1 + totalPages) % totalPages;
    renderPartnersCards();
  }

  partnersNextBtn.addEventListener('click', nextPartners);
  partnersPrevBtn.addEventListener('click', prevPartners);

  window.addEventListener('resize', () => {
    const oldPerPage = partnersPerPage;
    const newPerPage = calculatePartnersPerPage();
    if (oldPerPage !== newPerPage) {
      partnersIndex = 0;
      renderPartnersCards();
    }
  });

  renderPartnersCards();

  // SCRIPTS PARTINERSHIPS
  
});

