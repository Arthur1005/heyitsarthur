//vibe coded with Claude
const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン的一是不了人我在有他這為之大來以個中上們到說國和地也子時道出而要於就下得可你年生自會那後能對著事其裡所去行過家十用發天如然作方成者多日都三小軍二無同麼經法當起與好看學進種將還分此心前面又定見只主沒公從$@#%&*+=<>?/\\|[]{}';

function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += matrixChars[Math.floor(Math.random() * matrixChars.length)];
    }
    return result;
}

function createMatrixStream() {
    const stream = document.createElement('div');
    stream.className = 'floating-text matrix-stream';

    const length = 20 + Math.floor(Math.random() * 20);
    stream.textContent = generateRandomString(length);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const fromTop = Math.random() > 0.5;

    const startY = Math.random() * viewportHeight;

    let startX, endX;

    if (fromTop) {
        startX = -500;
        endX = viewportWidth + 500;
    } else {
        startX = viewportWidth + 500;
        endX = -500;
    }

    stream.style.left = startX + 'px';
    stream.style.top = startY + 'px';

    document.body.appendChild(stream);

    animateText(stream, startX, startY, endX, startY);

    updateStreamCharacters(stream, length);
}

function updateStreamCharacters(element, length) {
    const updateInterval = setInterval(() => {
        if (!document.body.contains(element)) {
            clearInterval(updateInterval);
            return;
        }
        element.textContent = generateRandomString(length);
    }, 100); 
}

function animateText(element, startX, startY, endX, endY) {
    const duration = 6000 + Math.random() * 4000; 
    const startTime = Date.now();
    const landingTitle = document.getElementById('landingTitle');
    let isDissolving = false;
    let dissolveStartTime = 0;
    let frozenX = 0;
    let frozenY = 0;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (!isDissolving) {
            const currentX = startX + (endX - startX) * progress;
            const currentY = startY + (endY - startY) * progress;

            element.style.left = currentX + 'px';
            element.style.top = currentY + 'px';
            element.style.filter = 'blur(0px)'; 

            const titleRect = landingTitle.getBoundingClientRect();
            const horizontalPadding = 50; 
            const verticalPadding = 20; 

            const safeZone = {
                left: titleRect.left - horizontalPadding,
                right: titleRect.right + horizontalPadding,
                top: titleRect.top - verticalPadding,
                bottom: titleRect.bottom + verticalPadding
            };

            const textRect = element.getBoundingClientRect();

            const isInSafeZone = textRect.right >= safeZone.left &&
                                textRect.left <= safeZone.right &&
                                textRect.bottom >= safeZone.top &&
                                textRect.top <= safeZone.bottom;

            if (isInSafeZone || progress >= 0.9) {
                isDissolving = true;
                dissolveStartTime = Date.now();
                frozenX = currentX;
                frozenY = currentY;
            }
        } else {
            const dissolveElapsed = Date.now() - dissolveStartTime;
            const dissolveDuration = 800;
            const dissolveProgress = Math.min(dissolveElapsed / dissolveDuration, 1);

            element.style.left = frozenX + 'px';
            element.style.top = frozenY + 'px';

            const blurAmount = Math.pow(dissolveProgress, 1.5) * 25;
            element.style.filter = `blur(${blurAmount}px)`;

            element.style.opacity = (1 - dissolveProgress).toString();

            if (dissolveProgress >= 1) {
                element.remove();
                return;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

function startMatrixStreams() {
    createMatrixStream();

    const nextDelay = 80 + Math.random() * 200;
    setTimeout(startMatrixStreams, nextDelay);
}

let mouseX = 0;
let mouseY = 0;
let isOverMarquee = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
    }

    const customCursor = document.getElementById('customCursor');
    if (customCursor) {
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
    }

    if (!isOverMarquee) {
        createCursorTrail(mouseX, mouseY);
    }
});

let lastTrailTime = 0;
function createCursorTrail(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < 50) return;
    lastTrailTime = now;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 100);
}

function getMousePosition() {
    return { x: mouseX, y: mouseY };
}

window.addEventListener('load', () => {
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursorGlow';
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    const customCursor = document.createElement('div');
    customCursor.id = 'customCursor';
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    if (document.getElementById('landingTitle')) {
        startMatrixStreams();
    }

    // Back to top
    document.querySelector('.back-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Project enlarge on scroll to center
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    document.querySelectorAll('.selectedProjectHeader').forEach(project => {
        projectObserver.observe(project);
    });

    // Marquee hover cursor change
    document.querySelectorAll('.marquee').forEach(marquee => {
        marquee.addEventListener('mouseenter', () => {
            isOverMarquee = true;
            customCursor.classList.add('marquee-hover');
            customCursor.textContent = 'Reach out';
        });
        marquee.addEventListener('mouseleave', () => {
            isOverMarquee = false;
            customCursor.classList.remove('marquee-hover');
            customCursor.textContent = '';
        });
    });
});