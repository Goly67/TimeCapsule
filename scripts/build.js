// Countdown Timer
function updateCountdown() {
    // Set the launch date (adjust as needed)
    const launchDate = new Date("2025-13-04T02:10:00").getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the countdown display
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    
    // If the countdown is over, display a message
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "<h2>We're launching soon!</h2>";
    }
  }
  
  // Update the countdown every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  // Blob Background Animation
  (() => {
    const canvas = document.getElementById("blob-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Blob parameters
    const blobs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 200, color: "rgba(47, 133, 90, 0.1)", speed: 0.5 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: "rgba(47, 133, 90, 0.08)", speed: 0.3 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 300, color: "rgba(184, 151, 60, 0.07)", speed: 0.4 },
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
            
            const cp1x = prevX + Math.cos(prevPointAngle - Math.PI / 2) * radius * 0.4;
            const cp1y = prevY + Math.sin(prevPointAngle - Math.PI / 2) * radius * 0.4;
            const cp2x = x + Math.cos(pointAngle + Math.PI / 2) * radius * 0.4;
            const cp2y = y + Math.sin(pointAngle + Math.PI / 2) * radius * 0.4;
            
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
