document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Music (Spotify Embed Handled via HTML) --- */
  // Local audio logic removed in favor of Spotify Iframe


  /* --- 2. Intro Section: Seed to Tree --- */
  const canvas = document.getElementById('intro-canvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('start-btn');
  const introContent = document.querySelector('.intro-content');
  const introSection = document.getElementById('intro');

  // Resize Canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Key Variables
  let seedY = 0;
  let seedLanded = false;
  let branches = [];
  let hearts = [];
  const GROUND_Y = canvas.height * 0.85;

  // Colors
  const treeColor = '#5D4037';
  const leafColors = ['#D4AF37', '#FF0033', '#FFCCCD', '#E91E63'];

  // Animation Loop State
  let animationId;
  let frames = 0;
  let windAngle = 0;

  function animateIntro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Seed Drop (FASTER)
    if (!seedLanded) {
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, seedY, 5, 0, Math.PI * 2);
      ctx.fill();

      seedY += 6; // Increased speed (was 4)
      if (seedY >= GROUND_Y) {
        seedLanded = true;
        initTree();
      }
    }

    // 2. Tree Growth & Sway (FASTER)
    if (seedLanded) {
      windAngle += 0.03; // Increased sway speed (was 0.02)
      drawTree(windAngle);
      drawHearts();
    }

    frames++;
    animationId = requestAnimationFrame(animateIntro);
  }

  function initTree() {
    // Root Branch
    branches.push({
      x: canvas.width / 2,
      y: GROUND_Y,
      angle: -90,
      length: 0,
      maxLength: 180,
      width: 25,
      depth: 0,
      curve: 0,
      targetLength: 180,
      hasChildren: false,
      children: []
    });

    // Final "Late Heart" & Button Reveal (FASTER)
    setTimeout(() => {
      hearts.push({
        x: canvas.width / 2 + 60,
        y: -50,
        targetY: GROUND_Y - 250,
        size: 15,
        color: '#D4AF37',
        speed: 7, // Faster heart fall (was 5)
        landed: false
      });
      introContent.classList.add('visible');
    }, 3500); // Earlier reveal (was 4500)
  }

  function drawTree(wind) {
    ctx.lineCap = 'round';
    if (branches.length > 0) {
      drawBranchRecursive(branches[0], wind);
    }
  }

  function drawBranchRecursive(b, wind) {
    // Growth (FASTER)
    if (b.length < b.maxLength) {
      b.length += 0.8; // Faster growth (was 0.5)
      if (b.length > b.maxLength * 0.6 && !b.hasChildren && b.depth < 3) {
        b.hasChildren = true;
        const numBranches = (b.depth === 0) ? 3 : 2;
        for (let i = 0; i < numBranches; i++) {
          const angleOffset = (i === 0) ? -25 : (i === 1 ? 25 : 0);
          const newBranch = {
            angle: b.angle + angleOffset + (Math.random() * 10 - 5),
            length: 0,
            maxLength: b.maxLength * 0.75,
            width: b.width * 0.65,
            depth: b.depth + 1,
            curve: (Math.random() < 0.5 ? 15 : -15),
            parent: b,
            hasChildren: false,
            children: []
          };
          branches.push(newBranch);
          b.children.push(newBranch);
        }
      }
    }

    // Sway
    const sway = Math.sin(wind + b.depth) * (b.depth * 2);
    const currentAngle = b.angle + sway;

    const endX = b.x + Math.cos(currentAngle * Math.PI / 180) * b.length;
    const endY = b.y + Math.sin(currentAngle * Math.PI / 180) * b.length;

    ctx.beginPath();
    ctx.moveTo(b.x, b.y);

    const cpX = (b.x + endX) / 2 + (b.depth > 0 ? b.curve : 0);
    cpY = (b.y + endY) / 2;

    if (b.depth === 0) ctx.lineTo(endX, endY);
    else ctx.quadraticCurveTo(cpX, cpY, endX, endY);

    ctx.strokeStyle = treeColor;
    ctx.lineWidth = b.width;
    ctx.stroke();

    if (b.children) {
      b.children.forEach(child => {
        child.x = endX;
        child.y = endY;
        drawBranchRecursive(child, wind);
      });
    }

    // Leaves
    if (b.depth > 1 && b.length > 20 && Math.random() < 0.05) {
      hearts.push({
        x: endX,
        y: endY,
        size: Math.random() * 10 + 5,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        landed: true
      });
    }
  }

  function drawHearts() {
    hearts.forEach(h => {
      ctx.fillStyle = h.color;
      ctx.font = `${h.size}px serif`;

      if (!h.landed) {
        h.y += h.speed;
        if (h.y >= h.targetY) {
          h.y = h.targetY;
          h.landed = true;
        }
      }
      ctx.fillText('❤️', h.x, h.y);
    });
  }

  animateIntro();


  /* --- 3. Story Mode Logic --- */
  /* --- 3. Story Mode Logic --- */
  // 30 Photos & Captions with Languages
  const captionData = [
    { text: "Seni seviyorum", lang: "Türkçe" },
    { text: "I love you", lang: "İngilizce" },
    { text: "Ez te hez dikim", lang: "Kürtçe" },
    { text: "Je t’aime", lang: "Fransızca" },
    { text: "Te amo", lang: "İspanyolca" },
    { text: "Ti amo", lang: "İtalyanca" },
    { text: "Ich liebe dich", lang: "Almanca" },
    { text: "Eu te amo", lang: "Portekizce" },
    { text: "Я тебя люблю", lang: "Rusça" },
    { text: "أنا أحبك", lang: "Arapça" },
    { text: "Σε αγαπώ", lang: "Yunanca" },
    { text: "愛してる", lang: "Japonca" },
    { text: "사랑해", lang: "Korece" },
    { text: "我爱你", lang: "Çince" },
    { text: "Ik hou van jou", lang: "Hollandaca" },
    { text: "Jag älskar dig", lang: "İsveççe" },
    { text: "Te iubesc", lang: "Romence" },
    { text: "Kocham cię", lang: "Lehçe" },
    { text: "Volim te", lang: "Hırvatça" },
    { text: "Ljubim te", lang: "Slovence" },
    { text: "Szeretlek", lang: "Macarca" },
    { text: "Jeg elsker deg", lang: "Norveççe" },
    { text: "Jeg elsker dig", lang: "Danca" },
    { text: "Miluji tě", lang: "Çekçe" },
    { text: "T’estimo", lang: "Katalanca" },
    { text: "Te quiero", lang: "İspanyolca (Latin)" },
    { text: "Nakupenda", lang: "Svahili" },
    { text: "Main tumse pyaar karta hoon", lang: "Hintçe" },
    { text: "Saya cinta padamu", lang: "Malayca" },
    { text: "Ngiyakuthanda", lang: "Zuluca" }
  ];

  const storyData = [];
  for (let i = 0; i < 30; i++) {
    let ext = 'png';
    if ((i + 1) === 21) ext = 'jpeg'; // Specific fix for your data
    storyData.push({
      url: `photos/page-${i + 1}.${ext}`,
      caption: captionData[i] ? captionData[i].text : "❤️",
      lang: captionData[i] ? captionData[i].lang : ""
    });
  }

  let currentIndex = 0;
  const storySection = document.getElementById('story');
  const photoImg = document.getElementById('current-photo');
  const photoBg = document.getElementById('photo-bg');
  const ambientBg = document.getElementById('ambient-bg');
  const pageNum = document.getElementById('current-page-num');
  const captionEl = document.getElementById('photo-caption');
  const langEl = document.getElementById('caption-lang');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  // New Buttons
  const interimSection = document.getElementById('interim-message');
  const startQuizBtn = document.getElementById('start-quiz-btn');

  // Audio Reference
  const bgMusic = document.getElementById('bg-music');
  bgMusic.volume = 0.5;

  // AGGRESSIVE AUTOPLAY STRATEGY
  function forcePlayMusic() {
    bgMusic.play().then(() => {
      console.log("Audio started successfully.");
      // Remove listeners once successful
      document.removeEventListener('click', forcePlayMusic);
      document.removeEventListener('touchstart', forcePlayMusic);
      document.removeEventListener('keydown', forcePlayMusic);
      document.removeEventListener('scroll', forcePlayMusic);
    }).catch(e => {
      console.log("Autoplay blocked, waiting for interaction...");
    });
  }

  // Try immediately
  forcePlayMusic();

  // Try on ANY first interaction
  document.addEventListener('click', forcePlayMusic);
  document.addEventListener('touchstart', forcePlayMusic);
  document.addEventListener('keydown', forcePlayMusic);
  document.addEventListener('scroll', forcePlayMusic);

  startBtn.addEventListener('click', () => {
    // Also try here just in case
    forcePlayMusic();

    introSection.style.opacity = '0';
    introSection.style.pointerEvents = 'none';

    setTimeout(() => {
      introSection.classList.add('hidden');
      storySection.classList.remove('hidden');
      void storySection.offsetWidth;
      storySection.classList.add('visible');
      loadPhoto(0);
    }, 1000);
  });

  // Interim Button
  startQuizBtn.addEventListener('click', () => {
    showQuiz();
  });

  function loadPhoto(index, direction = 'next') {
    if (index < 0) index = 0;
    if (index >= storyData.length) {
      showInterimMessage();
      return;
    }

    // Book Animation Trigger
    const card = document.querySelector('.photo-card');
    if (direction === 'next') {
      card.classList.add('page-turning-left');
    } else {
      card.classList.add('page-turning-right');
    }

    setTimeout(() => {
      // Actual Content Swap
      currentIndex = index;
      const item = storyData[currentIndex];

      photoImg.classList.remove('loaded');
      photoBg.src = item.url;

      // Reset 3D flip for new page entry
      card.classList.remove('page-turning-left', 'page-turning-right');

      // Subtle Sparkle on Turn
      createSparkles(window.innerWidth / 2, window.innerHeight / 2);

      setTimeout(() => {
        photoImg.src = item.url;
        photoImg.onload = () => photoImg.classList.add('loaded');
      }, 100);

      ambientBg.style.backgroundImage = `url('${item.url}')`;
      pageNum.textContent = currentIndex + 1;

      // Caption & Lang Animation
      captionEl.classList.remove('visible');
      langEl.classList.remove('visible');

      setTimeout(() => {
        captionEl.textContent = item.caption;
        captionEl.classList.add('visible');

        langEl.textContent = `(${item.lang})`;
        langEl.classList.add('visible');
      }, 400);

      prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';

    }, 300); // Wait for half flip
  }

  nextBtn.addEventListener('click', () => loadPhoto(currentIndex + 1, 'next'));
  prevBtn.addEventListener('click', () => loadPhoto(currentIndex - 1, 'prev'));

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) loadPhoto(currentIndex + 1, 'next');
    if (touchEndX > touchStartX + 50) loadPhoto(currentIndex - 1, 'prev');
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!storySection.classList.contains('hidden')) {
      if (e.key === 'ArrowRight') loadPhoto(currentIndex + 1, 'next');
      if (e.key === 'ArrowLeft') loadPhoto(currentIndex - 1, 'prev');
    }
  });

  // Parallax Effect
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    ambientBg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
  });

  /* --- 4. Quiz Logic (Master Prompt) --- */
  const quizSection = document.getElementById('quiz');
  const quizCard = document.getElementById('quiz-card');
  const resultSection = document.getElementById('result');

  // Questions Data
  const quizData = [
    {
      q: "Benim favori tatlım nedir?",
      a: ["baklava", "künefe", "sensin", "peynir helvası"],
      correct: 2 // Index 2 -> C
    },
    {
      q: "Hayat ne zaman güzel?",
      a: ["Ders çalışmak", "Gezmek", "Sinemaya gitmek", "Seninle her şey güzel"],
      correct: 3 // Index 3 -> D
    },
    {
      q: "İlk gittiğimiz tiyatro?",
      a: ["Nereye", "Kürk Mantolu Madonna", "Ben Medea Değilim", "Bütün Çılgınlar Sever Beni"],
      correct: 1 // Index 1 -> B
    },
    {
      q: "Gelecekteki en büyük hayalimiz?",
      a: ["Gültepede Yaşamak", "Halka arzdan parayı bulmak", "Yurtta kalmak", "Beraber olmak"],
      correct: 3 // Index 3 -> D
    },
    {
      q: "Seni ne kadar çok seviyorum?",
      a: ["severiz işte", "çok seviyorum", "çok çok çok seviyorum", "∞XÇok seviyorum"],
      correct: 3 // Index 3 -> D
    }
  ];

  let qIndex = 0;
  let score = 0;

  function showInterimMessage() {
    storySection.style.opacity = '0';
    setTimeout(() => {
      storySection.classList.add('hidden');
      interimSection.classList.remove('hidden');
      setTimeout(() => interimSection.classList.add('visible'), 100);
    }, 1000);
  }

  function showQuiz() {
    startConfetti(100); // Small confetti
    interimSection.style.opacity = '0'; // Fade out interim
    setTimeout(() => {
      interimSection.classList.add('hidden');
      quizSection.classList.remove('hidden');
      setTimeout(() => quizSection.classList.add('visible'), 100);
      loadQuestion(0);
    }, 1000);
  }

  function loadQuestion(idx) {
    if (idx >= quizData.length) {
      showResult();
      return;
    }
    qIndex = idx;
    const q = quizData[idx];

    // Soft Fade In Effect for Question
    quizCard.style.opacity = '0';
    quizCard.style.transform = 'scale(0.95)';

    setTimeout(() => {
      quizCard.innerHTML = `
            <h3>Soru ${idx + 1}/5</h3>
            <p>${q.q}</p>
            <div class="quiz-options">
                ${q.a.map((opt, i) => `
                    <button onclick="checkAnswer(${i}, this)">${['A', 'B', 'C', 'D'][i]}) ${opt}</button>
                `).join('')}
            </div>
            <button id="next-q-btn" class="premium-btn hidden" onclick="nextQuestion()" style="margin-top:20px;">Devam</button>
        `;
      quizCard.style.opacity = '1';
      quizCard.style.transform = 'scale(1)';
    }, 300);
  }

  window.checkAnswer = function (selectedIndex, btnElement) {
    // Disable all buttons
    const allBtns = document.querySelectorAll('.quiz-options button');
    allBtns.forEach(b => b.disabled = true);

    const correctIndex = quizData[qIndex].correct;

    if (selectedIndex === correctIndex) {
      // Correct
      btnElement.classList.add('correct');
      score++;
      createSparkles(btnElement.getBoundingClientRect().left + 50, btnElement.getBoundingClientRect().top);
    } else {
      // Wrong
      btnElement.classList.add('wrong');
      // Highlight correct one
      allBtns[correctIndex].classList.add('correct');
    }

    // Show Next Button
    const nextQBtn = document.getElementById('next-q-btn');
    nextQBtn.classList.remove('hidden');
  };

  window.nextQuestion = function () {
    startConfetti(30); // Mini burst on next
    loadQuestion(qIndex + 1);
  };

  window.restartQuiz = function () { // ... (Same as before) ...
    score = 0;
    resultSection.classList.add('hidden');
    // Clear result content injected text
    const finalMsg = document.querySelector('.result-content div[style*="margin-top"]');
    if (finalMsg) finalMsg.remove();

    // Reset quiz section visibility and opacity
    quizSection.classList.remove('visible');
    quizSection.style.opacity = '1'; // Reset opacity for next display

    showQuiz(); // Logic reused (careful with intro/interim flow, direct to quiz is fine)
  };

  function showResult() {
    quizSection.style.opacity = '0';
    resultSection.classList.remove('hidden');

    const title = document.getElementById('result-title');
    const desc = document.getElementById('result-desc');
    const container = document.getElementById('result-buttons');

    if (score === 5) {
      title.textContent = "Helal olsun! Aşk Profesörüsün ❤️🎓";
      desc.textContent = "Biz zaten kazanan taraftayız 😌";
      startConfetti(500); // Big explosion
    } else if (score >= 3) {
      title.textContent = "Fena değil...";
      desc.textContent = "Ama biraz daha romantik olabilirdin 😏";
    } else {
      title.textContent = "Sanırım tekrar denemelisin 😂";
      desc.textContent = "Ama yine de seni seviyorum.";
    }

    container.innerHTML = `
            <button class="premium-btn" onclick="restartQuiz()">Tekrar dene ❤️</button>
            <button class="premium-btn" onclick="location.reload()">Başa dön</button>
        `;

    // Final Message append
    const finalMsg = document.createElement('div');
    finalMsg.style.marginTop = '40px';
    finalMsg.style.opacity = '0.8';
    finalMsg.innerHTML = `
            <p>Her dilde aynı anlam.</p>
            <p>Her mesafede aynı kalp.</p>
            <p>Ve her başlangıçta yine sen.</p>
        `;
    document.querySelector('.result-content').appendChild(finalMsg);
  }

  /* --- Utilities --- */
  function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.classList.add('particle');
      el.innerHTML = '✨';
      el.style.left = (x + (Math.random() * 100 - 50)) + 'px';
      el.style.top = (y + (Math.random() * 100 - 50)) + 'px';
      el.style.fontSize = (Math.random() * 20 + 10) + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    }
  }

  function startConfetti(count) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.classList.add('particle');
      el.innerHTML = Math.random() < 0.5 ? '❤️' : '🎉';
      el.style.left = Math.random() * window.innerWidth + 'px';
      el.style.top = -50 + 'px';
      el.style.animation = `fadeAndDrop ${Math.random() * 2 + 1}s linear forwards`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }
});
