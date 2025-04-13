document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    // User is already logged in, redirect to index.html
    window.location.href = 'index.html';
  }
  
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const loginButton = document.getElementById('login-button');
  const loginText = document.getElementById('login-text');
  const loginSpinner = document.getElementById('login-spinner');
  
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    loginButton.disabled = true;
    loginText.style.display = 'none';
    loginSpinner.style.display = 'inline-block';
    errorMessage.style.display = 'none';
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('https://timecap2.glitch.me/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      
      console.log('Login successful, redirecting to index.html');
      
      // Redirect to index.html
      window.location.href = 'index.html';
    } catch (error) {
      // Show error message
      errorMessage.textContent = error.message || 'An error occurred during login';
      errorMessage.style.display = 'block';
      
      // Reset button state
      loginButton.disabled = false;
      loginText.style.display = 'inline';
      loginSpinner.style.display = 'none';
    }
  });
});

// Blob Background Animation
(function() {
  const canvas = document.getElementById('blob-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Blob parameters
  const blobs = [
    { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 200, color: 'rgba(47, 133, 90, 0.1)', speed: 0.5 },
    { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: 'rgba(47, 133, 90, 0.08)', speed: 0.3 },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 300, color: 'rgba(184, 151, 60, 0.07)', speed: 0.4 },
  ];
  
  let angle = 0;
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    angle += 0.01;
    
    blobs.forEach((blob, index) => {
      // Update blob position with a gentle floating motion
      const offsetX = Math.sin(angle * blob.speed + index) * 30;
      const offsetY = Math.cos(angle * blob.speed + index) * 30;
      
      // Draw blob
      ctx.beginPath();
      ctx.fillStyle = blob.color;
      
      // Create a more organic shape using bezier curves
      const points = 8;
      const angleStep = (Math.PI * 2) / points;
      const variationAmount = blob.radius * 0.2;
      
      for (let i = 0; i <= points; i++) {
        const pointAngle = i * angleStep;
        const variation = Math.sin(angle * 2 + i) * variationAmount;
        const radius = blob.radius + variation;
        
        const x = blob.x + offsetX + Math.cos(pointAngle) * radius;
        const y = blob.y + offsetY + Math.sin(pointAngle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevPointAngle = (i - 1) * angleStep;
          const prevVariation = Math.sin(angle * 2 + (i - 1)) * variationAmount;
          const prevRadius = blob.radius + prevVariation;
          
          const prevX = blob.x + offsetX + Math.cos(prevPointAngle) * prevRadius;
          const prevY = blob.y + offsetY + Math.sin(prevPointAngle) * prevRadius;
          
          const cp1x = prevX + (Math.cos(prevPointAngle - Math.PI / 2) * radius * 0.4);
          const cp1y = prevY + (Math.sin(prevPointAngle - Math.PI / 2) * radius * 0.4);
          const cp2x = x + (Math.cos(pointAngle + Math.PI / 2) * radius * 0.4);
          const cp2y = y + (Math.sin(pointAngle + Math.PI / 2) * radius * 0.4);
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
})();