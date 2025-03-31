// Blob Background Animation
(function() {
    const canvas = document.getElementById('blob-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let blobs = [];

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initBlobs();
    }

    function initBlobs() {
      blobs = [];
      const numBlobs = 5;
      
      for (let i = 0; i < numBlobs; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 200 + 100,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(193, 220, 207, ${Math.random() * 0.2 + 0.1})` // Forest green with low opacity
        });
      }
    }

    function drawBlobs() {
      ctx.clearRect(0, 0, width, height);
      
      blobs.forEach(blob => {
        // Update position
        blob.x += blob.speedX;
        blob.y += blob.speedY;
        
        // Bounce off edges
        if (blob.x < 0 || blob.x > width) blob.speedX *= -1;
        if (blob.y < 0 || blob.y > height) blob.speedY *= -1;
        
        // Draw blob
        ctx.beginPath();
        ctx.fillStyle = blob.color;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(drawBlobs);
    }

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawBlobs();
  })();