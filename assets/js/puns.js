const puns = [
    {
        setup: "O que um átomo disse para o outro?",
        punchline: "Acho que perdi um elétron! Tem certeza? Tenho, estou positivo! ➕"
    },
    {
        setup: "Qual é o barulho de um átomo caindo?",
        punchline: "Plânck! 💥"
    },
    {
        setup: "Por que o urso branco se dissolveu na água?",
        punchline: "Porque ele era polar! 🐻‍❄️"
    },
    {
        setup: "Como o átomo atende o telefone?",
        punchline: "Próton! 📞"
    },
    {
        setup: "O que o Cloro disse para o Sódio?",
        punchline: "Nossa, que saldade de você! 🧂"
    },
    {
        setup: "Qual é a fórmula da água benta?",
        punchline: "H Deus O! 🙏"
    },
    {
        setup: "Por que os químicos são ótimos para resolver problemas?",
        punchline: "Porque eles têm todas as soluções! 🧪"
    },
    {
        setup: "Qual o elemento mais engraçado da tabela periódica?",
        punchline: "O Hélio! HeHeHe! 🎈"
    },
    {
        setup: "O que acontece quando você joga um dente num copo d'água?",
        punchline: "Vira uma solução molar! 🦷"
    },
    {
        setup: "O que o oxigênio disse para o potássio?",
        punchline: "OK! 👍"
    }
];

let currentPunIndex = -1;
const cardContainer = document.getElementById('pun-card-container');
const nextBtn = document.getElementById('next-pun-btn');

function getRandomPun() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * puns.length);
    } while (newIndex === currentPunIndex && puns.length > 1);
    
    currentPunIndex = newIndex;
    return puns[currentPunIndex];
}

function createCard(pun) {
    const card = document.createElement('div');
    card.className = 'pun-display-card';
    
    card.innerHTML = `
        <div class="pun-inner">
            <div class="pun-front">
                <div class="pun-icon">🤔</div>
                <p class="pun-text">${pun.setup}</p>
                <span class="tap-hint">Toque para ver a resposta</span>
            </div>
            <div class="pun-back">
                <div class="pun-icon">😂</div>
                <p class="pun-text">${pun.punchline}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            triggerConfetti(card);
        }
    });

    return card;
}

function showNextPun() {
    // Disable button temporarily
    nextBtn.disabled = true;
    
    const oldCard = cardContainer.querySelector('.pun-display-card');
    const newPun = getRandomPun();
    const newCard = createCard(newPun);

    // Prepare new card (start off-screen right)
    newCard.classList.add('entering');
    cardContainer.appendChild(newCard);

    // Animate old card out (to left)
    if (oldCard) {
        oldCard.classList.add('exiting');
        setTimeout(() => {
            oldCard.remove();
        }, 500); // Match CSS transition
    }

    // Animate new card in
    requestAnimationFrame(() => {
        newCard.classList.remove('entering');
    });

    setTimeout(() => {
        nextBtn.disabled = false;
    }, 500);
}

function triggerConfetti(element) {
    // Simple emoji burst effect
    const rect = element.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    for (let i = 0; i < 10; i++) {
        createEmojiParticle(center.x, center.y);
    }
}

function createEmojiParticle(x, y) {
    const emojis = ['😂', '🤣', '😹', '💀', '✨'];
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'emoji-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNextPun();
    nextBtn.addEventListener('click', showNextPun);
});
