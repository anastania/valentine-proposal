const messages = [
    "Are you sure? ",
    "Think again! ",
    "Pretty please? ",
    "Don't do this to me! ",
    "I'll be sad! ",
    "Give it another thought! ",
    "You're breaking my heart! ",
    "I promise to be nice! ",
    "Last chance! ",
    "You can't escape! "
];

let messageIndex = 0;
let noButtonClickCount = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const container = document.querySelector('.container');
    
    // Update message
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Increment counter
    noButtonClickCount++;
    
    // Always keep No button visible until final stage
    noButton.style.position = 'fixed';
    noButton.style.right = '20px';
    noButton.style.top = '50%';
    noButton.style.transform = 'translateY(-50%)';
    noButton.style.zIndex = '10000';
    noButton.style.transition = 'all 0.5s ease';
    
    // Make Yes button bigger with each click
    if (noButtonClickCount >= 4) {
        // Make the button take over the screen
        document.body.style.overflow = 'hidden';
        yesButton.style.position = 'fixed';
        yesButton.style.top = '50%';
        yesButton.style.left = '50%';
        yesButton.style.transform = 'translate(-50%, -50%)';
        yesButton.style.width = '100vw';
        yesButton.style.height = '100vh';
        yesButton.style.fontSize = '4em';
        yesButton.style.zIndex = '9999';
        yesButton.style.display = 'flex';
        yesButton.style.alignItems = 'center';
        yesButton.style.justifyContent = 'center';
        yesButton.style.animation = 'pulse 1s infinite';
        yesButton.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        yesButton.style.borderRadius = '0'; // Remove border radius for full screen
        
        // Hide No button and container
        noButton.style.opacity = '0';
        noButton.style.visibility = 'hidden';
        container.style.opacity = '0';
        
        // Add floating hearts in background
        createFloatingHearts();
    } else {
        // Gradually increase size but keep No button visible
        const scale = 1 + (noButtonClickCount * 0.8);
        const fontSize = 1.2 + (noButtonClickCount * 0.5);
        
        yesButton.style.position = 'fixed';
        yesButton.style.left = '40%';
        yesButton.style.top = '50%';
        yesButton.style.transform = `translate(-50%, -50%) scale(${scale})`;
        yesButton.style.fontSize = `${fontSize}em`;
        yesButton.style.zIndex = '2';
        
        // Ensure No button is visible during this phase
        noButton.style.opacity = '1';
        noButton.style.visibility = 'visible';
    }
    
    // Add shake animation to container
    container.style.animation = 'shake 0.5s ease';
    
    // Reset container animation
    setTimeout(() => {
        container.style.animation = 'none';
    }, 500);
}

function createFloatingHearts() {
    // Create a heart every 300ms
    const heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 70 + 'vw'; // Limit hearts to not overlap No button
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.color = '#5EC2B7';
        heart.style.opacity = '0.6';
        heart.style.zIndex = '1';
        heart.style.animation = 'floatUp 4s ease-in-out';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 4000);
    }, 300);
    
    // Store the interval ID in a data attribute to clear it later if needed
    document.body.dataset.heartInterval = heartInterval;
}

function handleYesClick() {
    // Clear floating hearts interval if it exists
    const heartInterval = document.body.dataset.heartInterval;
    if (heartInterval) clearInterval(heartInterval);
    
    // Add celebration animation
    const yesButton = document.querySelector('.yes-button');
    yesButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
    
    // Create fireworks first
    createFireworks();
    
    // After a delay, transform fireworks into hearts
    setTimeout(() => {
        createBeatingHearts();
    }, 1000);
    
    // Redirect after all animations
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 3000);
}

function createFireworks() {
    const colors = ['#FF0000', '#FF69B4', '#FF1493', '#FF4500'];
    
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random color from the array
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Calculate position to start from center
        const angle = (i / 50) * 360;
        const distance = 100 + Math.random() * 100;
        
        firework.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            animation: firework 1s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        document.body.appendChild(firework);
        
        // Remove firework after animation
        setTimeout(() => firework.remove(), 1000);
    }
}

function createBeatingHearts() {
    const heartPositions = [];
    const numHearts = 30;
    
    // Create initial positions for hearts in a heart shape
    for (let i = 0; i < numHearts; i++) {
        const t = (i / numHearts) * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        heartPositions.push({ x: x * 10, y: -y * 10 }); // Scale the heart shape
    }
    
    heartPositions.forEach((pos, i) => {
        const heart = document.createElement('div');
        heart.innerHTML = '';
        heart.className = 'beating-heart';
        
        heart.style.cssText = `
            position: fixed;
            left: calc(50% + ${pos.x}px);
            top: calc(50% + ${pos.y}px);
            font-size: 24px;
            color: red;
            pointer-events: none;
            z-index: 9999;
            transform-origin: center;
            animation: beatHeart 1s infinite;
            animation-delay: ${i * 0.1}s;
        `;
        
        document.body.appendChild(heart);
    });
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120vh);
            opacity: 0;
        }
    }
    
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 500 - 250}px),
                calc(-50% + ${Math.random() * 500 - 250}px)
            ) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
    }
    
    @keyframes firework {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 600 - 300}px),
                calc(-50% + ${Math.random() * 600 - 300}px)
            ) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes beatHeart {
        0%, 100% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1);
        }
        75% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);