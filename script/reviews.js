document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");
    const consultBtn = document.getElementById("consultBtn");
    const headerCallBtn = document.getElementById("headerCallBtn");
    const mobileCallBtn = document.getElementById("mobileCallBtn");
    const callModal = document.getElementById("callModal");
    const closeModal = document.getElementById("closeModal");

    // Открытие и закрытие бургер-меню
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Открытие модального окна
    function openModal() {
        if (callModal) {
            callModal.style.display = "flex";
        }
    }

    [consultBtn, headerCallBtn, mobileCallBtn].forEach(btn => {
        if (btn) btn.addEventListener("click", openModal);
    });

    // Закрытие модального окна
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            callModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === callModal) {
            callModal.style.display = "none";
        }
    });
});

const reviews = [{
        name: "Светлана и Игорь П.",
        img: "/img/rev1.jpg",
        stars: "★★★★★",
        text: "Нам нужна была трёшка для большой семьи — Абел всё подобрал идеально. Без нервов, всё честно и спокойно. Спасибо!"
    },
    {
        name: "Анна и Михаил.",
        img: "/img/rev2.jpg",
        stars: "★★★★☆",
        text: "Искали квартиру для родителей недалеко от нас, чтобы быть рядом. Абел подобрал чудесный вариант — светлая, тёплая квартира на первом этаже. Всё прошло без суеты, с вниманием к деталям. Родители довольны, а мы — спокойны."
    },
    {
        name: "Алена и Максим",
        img: "/img/rev3.jpg",
        stars: "★★★★★",
        text: "Переезд из станицы был сложным, но Алексей нас провёл как профи. Помог понять рынок, всё объяснил. Спасибо!"
    },
    {
        name: "Дмитрий С.",
        img: "/img/rev4.jpg",
        stars: "★★★★★",
        text: "Хотел купить первую квартиру, и, честно, вообще не понимал, как это всё работает. Роман спокойно объяснил, не торопил, показывал только реальные варианты. В итоге нашёл отличную студию без подводных камней."
    },
    {
        name: "Евгений К.",
        img: "/img/rev5.jpg",
        stars: "★★★★☆",
        text: "Для меня было критично — только полная юридическая чистота сделки. Роман лично контролировал каждый этап, проверил всё: собственников, перепланировку, отсутствие долгов. Объяснил нюансы ДДУ и помог при подписании."
    },
    {
        name: "Виктор Н.",
        img: "/img/rev6.jpg",
        stars: "★★★★★",
        text: "Переезжал в Краснодар и долго не мог понять, где лучше покупать. Алексей очень грамотно объяснил про районы, ценовой разброс и перспективы. Благодаря ему я взял квартиру в новом ЖК с нормальной управляйкой и перспективой роста."
    },
    {
        name: "Сергей Т.",
        img: "/img/rev7.jpg",
        stars: "★★★★★",
        text: "Была непростая ситуация — оформлял по военной ипотеке. Абел всё объяснил, организовал, помог с банком и сопровождал каждый шаг. Без него точно бы потерялся."
    },
    {
        name: "Мария П.",
        img: "/img/rev8.jpg",
        stars: "★★★★★",
        text: "Купила свою первую квартиру в Краснодаре, и это был невероятно волнительный шаг! Спасибо Абелу — всё прошло на одном дыхании: документы, проверка, сопровождение."
    },
    {
        name: "Анна С.",
        img: "/img/rev9.jpg",
        stars: "★★★★★",
        text: "После развода хотелось начать жизнь заново. Алексей помог мне найти уютную квартиру в хорошем районе, где я чувствую себя в безопасности. Никто не торопил, не обманывал, всё честно и прозрачно."
    },
    {
        name: "Ирина Т.",
        img: "/img/rev10.jpg",
        stars: "★★★★★",
        text: "Хотела вложиться в недвижимость — купить квартиру для дочери на будущее. Алексей подошёл к вопросу очень профессионально: сделал анализ района, перспектив, порекомендовал комплекс, где и цена, и качество на уровне."
    },
    {
        name: "Анна К.",
        img: "/img/rev11.jpg",
        stars: "★★★★★",
        text: "Покупала квартиру с агентом Романом — всё прошло спокойно и без нервов. Подобрал вариант в тот же день, документы были проверены заранее. Приятно, что Роман всегда на связи и не пропадает. Спасибо большое!"
    },
    {
        name: "Марина Т.",
        img: "/img/rev12.jpg",
        stars: "★★★★★",
        text: "Огромное спасибо Алексею за помощь в покупке моей первой квартиры! Все грамотно объяснил, сопровождал до самой сделки. Особенно порадовало, что сразу сказал, где риски, а где безопасно. Очень довольна, рекомендую."
    },
    {
        name: "Екатерина М.",
        img: "/img/rev13.jpg",
        stars: "★★★★★",
        text: "Хочу выразить благодарность агенту Абелу за профессионализм и терпение! Мы долго выбирали, но он с пониманием относился к моим хотелкам. Подобрал идеальный вариант, помог с торгом и всё оформил быстро."
    },
    {
        name: "Дарья Л.",
        img: "/img/rev14.jpg",
        stars: "★★★★★",
        text: "Обращалась к Роману по рекомендации подруги — не пожалела! Всё по делу, никаких втюхиваний, только то, что реально подходило по запросу и бюджету. Сделка прошла чётко, без сюрпризов."
    },
    {
        name: "Ольга С.",
        img: "/img/rev15.jpg",
        stars: "★★★★★",
        text: "Хочу поблагодарить Абела — отличный специалист и просто хороший человек. Очень вежливый, знает рынок, чувствуется опыт. Помог не только с выбором, но и подсказал, как выгоднее оформить сделку."
    },
    {
        name: "Виктория Н.",
        img: "/img/rev16.jpg",
        stars: "★★★★★",
        text: "Купила квартиру через Алексея — всё супер. Быстро нашёл хороший вариант, проверил документы, организовал сделку с минимальным моим участием. Надёжный человек, рекомендую от души."
    },
    {
        name: "Юлия В.",
        img: "/img/rev17.jpg",
        stars: "★★★★★",
        text: "С агентом Романом у нас всё получилось очень быстро. Я искала квартиру в новом районе, и он сразу предложил то, что подходило. Все вопросы решались оперативно, а атмосфера была доверительная."
    },
    {
        name: "Игорь С.",
        img: "/img/rev18.jpg",
        stars: "★★★★★",
        text: "Работал с Алексеем. Всё прошло нормально, без лишней суеты. Показал несколько квартир, договорились на просмотр, потом всё оформили. Без навязывания и давления — это главное."
    },
];


let currentPage = 1;
const perPage = 3;

function renderPage(page) {
    const container = document.getElementById("reviews-container");
    const pageInfo = document.getElementById("pageInfo");
    container.innerHTML = "";

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageReviews = reviews.slice(start, end);

    pageReviews.forEach(r => {
        const box = document.createElement("div");
        box.className = "review-box";
        box.innerHTML = `
      <div class="review-header">
        <img src="${r.img}" alt="${r.name}">
        <div>
          <h3>${r.name}</h3>
          <div class="stars">${r.stars}</div>
        </div>
      </div>
      <p class="review-text">${r.text}</p>
    `;
        container.appendChild(box);
    });

    pageInfo.textContent = `Страница ${page}`;
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = end >= reviews.length;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if ((currentPage * perPage) < reviews.length) {
        currentPage++;
        renderPage(currentPage);
    }
});

renderPage(currentPage);
document.querySelector('.call-btn').addEventListener('click', () => {
    document.getElementById('callModal').style.display = 'flex';
});
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('callModal').style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target.id === 'callModal') {
        document.getElementById('callModal').style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const callBtn = document.querySelector(".call-btn");
    const modal = document.getElementById("callModal");
    const closeModal = document.getElementById("closeModal");

    if (callBtn && modal && closeModal) {
        callBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});