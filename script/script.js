document.addEventListener("DOMContentLoaded", () => {
            const objectList = document.getElementById("objectList");
            const form = document.getElementById("searchForm");
            let allObjects = [];
            let popularObjects = [];
            let filteredObjects = [];
            let currentPage = 0;
            const cardsPerPage = 3;

            function formatPrice(value) {
                return Number(value).toLocaleString("ru-RU");
            }

            function paginate(objects, page) {
                const start = page * cardsPerPage;
                return objects.slice(start, start + cardsPerPage);
            }

            function renderObjects(objects) {
                objectList.innerHTML = "";
                const isMobile = window.innerWidth <= 768;
                const cardsToShow = isMobile ? objects : paginate(objects, currentPage);

                if (cardsToShow.length === 0) {
                    objectList.innerHTML = "<p>Ничего не найдено.</p>";
                    return;
                }

                cardsToShow.forEach(obj => {
                            const card = document.createElement("div");
                            card.classList.add("object-card");
                            card.innerHTML = `
        ${obj.images ? `<img src="https://admin-production-9fc0.up.railway.app${JSON.parse(obj.images)[0]}" alt="${obj.type}" />` : ""}
        <h3>${obj.type}, ${obj.district}</h3>
        <p>${obj.city}</p>
        <p>${formatPrice(obj.price)} ₽</p>
        <p>${obj.description}</p>
      `;
      card.addEventListener("click", () => {
        showModal(obj);
      });
      objectList.appendChild(card);
    });
  }

  function fetchObjects() {
    fetch("https://admin-production-9fc0.up.railway.app/api/objects")
      .then(res => res.json())
      .then(data => {
        allObjects = data;
        popularObjects = data.filter(obj =>
          obj.isPopular === 1 || obj.isPopular === true || obj.isPopular === "1" || obj.isPopular === "true"
        );
        filteredObjects = [];
        currentPage = 0;
        renderObjects(popularObjects);
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = form.type.value;
    const city = form.city.value.trim().toLowerCase();
    const district = form.district.value.trim().toLowerCase();
    const priceFrom = parseInt(form.priceFrom.value) || 0;
    const priceTo = parseInt(form.priceTo.value) || Infinity;

    filteredObjects = allObjects.filter(obj =>
      obj.type === type &&
      obj.city.toLowerCase().includes(city) &&
      (district === "" || obj.district.toLowerCase() === district) &&
      obj.price >= priceFrom &&
      obj.price <= priceTo
    );

    currentPage = 0;
    renderObjects(filteredObjects);
    objectList.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    form.reset();
    filteredObjects = [];
    currentPage = 0;
    renderObjects(popularObjects);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      const source = filteredObjects.length > 0 ? filteredObjects : popularObjects;
      renderObjects(source);
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    const source = filteredObjects.length > 0 ? filteredObjects : popularObjects;
    const maxPage = Math.ceil(source.length / cardsPerPage) - 1;
    if (currentPage < maxPage) {
      currentPage++;
      renderObjects(source);
    }
  });

  fetchObjects();

  let galleryImages = [];
  let currentIndex = 0;

  function showModal(obj) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalMainImage");
    const modalInfo = document.getElementById("modalInfo");

    if (typeof obj.images === "string") {
      try {
        galleryImages = JSON.parse(obj.images);
      } catch {
        galleryImages = [];
      }
    } else if (Array.isArray(obj.images)) {
      galleryImages = obj.images;
    }

    if (galleryImages.length > 0) {
      currentIndex = 0;
      modalImage.src = "https://admin-production-9fc0.up.railway.app" + galleryImages[currentIndex];
    }

    modalInfo.innerHTML = `
      <h3>${obj.type}</h3>
      <p><strong>Район:</strong> ${obj.district}</p>
      <p><strong>Город:</strong> ${obj.city}</p>
      <p><strong>Цена:</strong> ${formatPrice(obj.price)} ₽</p>
      <p>${obj.description}</p>
    `;

    modal.style.display = "block";
  }

  document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });

  document.getElementById("prevImage").addEventListener("click", () => {
    if (galleryImages.length > 0) {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      document.getElementById("modalMainImage").src = "https://admin-production-9fc0.up.railway.app" + galleryImages[currentIndex];
    }
  });

  document.getElementById("nextImage").addEventListener("click", () => {
    if (galleryImages.length > 0) {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      document.getElementById("modalMainImage").src = "https://admin-production-9fc0.up.railway.app" + galleryImages[currentIndex];
    }
  });

  document.getElementById("modalMainImage").addEventListener("click", () => {
    document.getElementById("modalMainImage").classList.toggle("zoomed");
  });

  document.querySelectorAll('.call-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('callModal').style.display = 'block';
    });
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('callModal').style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    const modal = document.getElementById('callModal');
    if (e.target === modal) modal.style.display = 'none';
  });

  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");
  burger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
});