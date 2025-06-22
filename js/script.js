document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.getElementById('startBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');
    
    // Variáveis de controle
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    
    // Inicialização
    totalSlidesSpan.textContent = totalSlides;
    updateSlideIndicator();
    updateNavigationButtons();
    
    // Criar corações flutuantes
    createFloatingHearts();
    
    // Event Listeners
    startBtn.addEventListener('click', startPresentation);
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (mainContent.classList.contains('show') && !isAnimating) {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape') {
                resetPresentation();
            }
        }
    });
    
    // Função para iniciar a apresentação
    function startPresentation() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Adicionar efeito de saída na tela de abertura
        introScreen.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        introScreen.classList.add('fade-out');
        
        // Aguardar a animação e mostrar o conteúdo principal
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.add('show');
            showSlide(0);
            addSparkleEffect();
            isAnimating = false;
        }, 1800);
    }
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Remover classe active de todos os slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            slide.style.transition = 'all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            if (i < index) {
                slide.classList.add('prev');
            }
        });
        
        // Adicionar classe active ao slide atual
        setTimeout(() => {
            slides[index].classList.add('active');
            
            // Atualizar indicador
            currentSlide = index;
            updateSlideIndicator();
            updateNavigationButtons();
            
            // Adicionar efeito de entrada nos elementos do slide
            animateSlideContent(slides[index]);
            
            setTimeout(() => {
                isAnimating = false;
            }, 1400);
        }, 100);
    }
    
    // Função para animar o conteúdo do slide com mais suavidade
    function animateSlideContent(slide) {
        const image = slide.querySelector('.slide-image');
        const textContainer = slide.querySelector('.text-container');
        const lyrics = slide.querySelectorAll('.lyrics p');
        const songTitle = slide.querySelector('.song-title');
        const artist = slide.querySelector('.artist');
        
        // Reset das animações
        if (image) {
            image.style.transform = 'scale(0.85) translateY(30px)';
            image.style.opacity = '0';
            image.style.filter = 'blur(5px)';
        }
        
        if (textContainer) {
            textContainer.style.transform = 'translateX(40px) translateY(20px)';
            textContainer.style.opacity = '0';
        }
        
        if (songTitle) {
            songTitle.style.transform = 'translateY(20px)';
            songTitle.style.opacity = '0';
        }
        
        if (artist) {
            artist.style.transform = 'translateY(15px)';
            artist.style.opacity = '0';
        }
        
        lyrics.forEach((lyric, index) => {
            lyric.style.transform = 'translateY(15px) translateX(-10px)';
            lyric.style.opacity = '0';
        });
        
        // Aplicar animações com delay e easing suave
        setTimeout(() => {
            if (image) {
                image.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                image.style.transform = 'scale(1) translateY(0)';
                image.style.opacity = '1';
                image.style.filter = 'blur(0px)';
            }
        }, 200);
        
        setTimeout(() => {
            if (textContainer) {
                textContainer.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                textContainer.style.transform = 'translateX(0) translateY(0)';
                textContainer.style.opacity = '1';
            }
        }, 400);
        
        setTimeout(() => {
            if (songTitle) {
                songTitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                songTitle.style.transform = 'translateY(0)';
                songTitle.style.opacity = '1';
            }
        }, 600);
        
        setTimeout(() => {
            if (artist) {
                artist.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                artist.style.transform = 'translateY(0)';
                artist.style.opacity = '1';
            }
        }, 750);
        
        lyrics.forEach((lyric, index) => {
            setTimeout(() => {
                lyric.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                lyric.style.transform = 'translateY(0) translateX(0)';
                lyric.style.opacity = '1';
            }, 900 + (index * 120));
        });
    }
    
    // Função para ir para o slide anterior
    function previousSlide() {
        if (currentSlide > 0 && !isAnimating) {
            showSlide(currentSlide - 1);
            addSoftHeartBurst();
        }
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1 && !isAnimating) {
            showSlide(currentSlide + 1);
            addSoftHeartBurst();
        }
    }
    
    // Função para atualizar o indicador de slide
    function updateSlideIndicator() {
        currentSlideSpan.style.transition = 'all 0.3s ease';
        currentSlideSpan.style.transform = 'scale(1.1)';
        currentSlideSpan.textContent = currentSlide + 1;
        
        setTimeout(() => {
            currentSlideSpan.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Função para atualizar os botões de navegação
    function updateNavigationButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Animação suave nos botões
        [prevBtn, nextBtn].forEach(btn => {
            btn.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }
    
    // Função para resetar a apresentação
    function resetPresentation() {
        if (isAnimating) return;
        
        introScreen.style.display = 'flex';
        introScreen.classList.remove('fade-out');
        mainContent.classList.remove('show');
        currentSlide = 0;
        showSlide(0);
    }
    
    // Função para criar corações flutuantes mais suaves
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.hearts-bg');
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 15 + 8 + 'px';
            heart.style.color = `rgba(255, 105, 180, ${Math.random() * 0.2 + 0.05})`;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animation = `gentleFloat ${Math.random() * 6 + 6}s ease-in-out infinite`;
            heart.style.animationDelay = Math.random() * 6 + 's';
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Função para adicionar efeito de explosão de corações mais suave
    function addSoftHeartBurst() {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '9999';
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = '♥';
            heart.style.position = 'absolute';
            heart.style.fontSize = '16px';
            heart.style.color = '#ff69b4';
            heart.style.animation = `softHeartBurst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            heart.style.animationDelay = i * 0.15 + 's';
            heart.style.transform = `rotate(${i * 60}deg) translateY(-30px)`;
            
            burst.appendChild(heart);
        }
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (document.body.contains(burst)) {
                document.body.removeChild(burst);
            }
        }, 2500);
    }
    
    // Função para adicionar efeito de brilho mais suave
    function addSparkleEffect() {
        const sparkles = document.createElement('div');
        sparkles.style.position = 'fixed';
        sparkles.style.top = '0';
        sparkles.style.left = '0';
        sparkles.style.width = '100%';
        sparkles.style.height = '100%';
        sparkles.style.pointerEvents = 'none';
        sparkles.style.zIndex = '1';
        
        for (let i = 0; i < 25; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '10px';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = `softSparkle ${Math.random() * 4 + 3}s ease-in-out infinite`;
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            
            sparkles.appendChild(sparkle);
        }
        
        document.body.appendChild(sparkles);
    }
    
    // Adicionar estilos de animação dinamicamente com easing mais suave
    const style = document.createElement('style');
    style.textContent = `
        @keyframes softHeartBurst {
            0% {
                opacity: 1;
                transform: scale(0) translateY(0);
            }
            30% {
                opacity: 1;
                transform: scale(1.2) translateY(-20px);
            }
            70% {
                opacity: 0.8;
                transform: scale(1) translateY(-40px);
            }
            100% {
                opacity: 0;
                transform: scale(0.3) translateY(-60px);
            }
        }
        
        @keyframes softSparkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            25% {
                opacity: 0.6;
                transform: scale(0.8) rotate(90deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            75% {
                opacity: 0.6;
                transform: scale(0.8) rotate(270deg);
            }
        }
        
        .slide-image:hover {
            filter: brightness(1.05) saturate(1.1) contrast(1.05);
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .text-container:hover {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .lyrics p {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .nav-btn:active {
            transform: translateY(-2px) scale(0.95);
            transition: all 0.1s ease;
        }
        
        .start-btn:active {
            transform: translateY(-2px) scale(0.98);
            transition: all 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de partículas no mouse mais suave
    let mouseParticleTimeout;
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.05 && mainContent.classList.contains('show')) {
            clearTimeout(mouseParticleTimeout);
            mouseParticleTimeout = setTimeout(() => {
                createSoftMouseParticle(e.clientX, e.clientY);
            }, 50);
        }
    });
    
    function createSoftMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = '8px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'softSparkle 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        particle.style.color = '#ff69b4';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1500);
    }
    
    // Adicionar efeito de respiração suave aos elementos principais
    function addBreathingEffect() {
        const elements = document.querySelectorAll('.song-title, .final-title');
        elements.forEach(element => {
            element.style.animation += ', breathe 4s ease-in-out infinite';
        });
    }
    
    // Adicionar CSS para efeito de respiração
    const breatheStyle = document.createElement('style');
    breatheStyle.textContent = `
        @keyframes breathe {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(breatheStyle);
    
    // Aplicar efeito de respiração após carregamento
    setTimeout(addBreathingEffect, 2000);
});

