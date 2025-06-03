onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};
// ...existing code...
window.onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  
    // Fireflies
    const fireflyCount = 18;
    const fireflies = [];
    const fireflyContainer = document.getElementById('fireflies');
    for (let i = 0; i < fireflyCount; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      fireflyContainer.appendChild(f);
      fireflies.push({
        el: f,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        radius: 30 + Math.random() * 80
      });
    }

    // Floating Pictures
    const picCount = 5;
    const floatingPics = [];
    const picContainer = document.getElementById('floating-pics');
    
    // Array of image URLs - replace these with your girlfriend's pictures
    const imageUrls = [
      'images/h.jpg',
      'images/a.jpg',
      'images/n.jpg',
      'images/i.jpg',
      'images/h.jpg'
    ];

    // Add delay before showing pictures
    setTimeout(() => {
      for (let i = 0; i < picCount; i++) {
        const pic = document.createElement('div');
        pic.className = 'floating-pic';
        pic.style.opacity = '0';
        const img = document.createElement('img');
        img.src = imageUrls[i % imageUrls.length];
        img.alt = 'Floating Picture';
        pic.appendChild(img);
        picContainer.appendChild(pic);
        
        floatingPics.push({
          el: pic,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
          angle: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.4,
          radius: 50 + Math.random() * 100,
          vx: (Math.random() - 0.5) * 2, // Initial velocity X
          vy: (Math.random() - 0.5) * 2, // Initial velocity Y
          bounce: 0.8 // Bounce factor (0.8 means 80% of energy is retained after bounce)
        });

        // Fade in the picture
        setTimeout(() => {
          pic.style.transition = 'opacity 1s ease';
          pic.style.opacity = '1';
        }, i * 200);
      }
    }, 3000);

    function animateFireflies() {
      fireflies.forEach(f => {
        f.angle += (Math.random() - 0.5) * 0.1;
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;
        // Keep within bounds
        if (f.x < 0) f.x = window.innerWidth;
        if (f.x > window.innerWidth) f.x = 0;
        if (f.y < 0) f.y = window.innerHeight * 0.2;
        if (f.y > window.innerHeight * 0.8) f.y = window.innerHeight * 0.2;
        f.el.style.left = f.x + 'px';
        f.el.style.top = f.y + 'px';
      });
      requestAnimationFrame(animateFireflies);
    }

    function animateFloatingPics() {
      floatingPics.forEach(pic => {
        // Update position based on velocity
        pic.x += pic.vx;
        pic.y += pic.vy;

        // Add slight random movement
        pic.vx += (Math.random() - 0.5) * 0.1;
        pic.vy += (Math.random() - 0.5) * 0.1;

        // Limit maximum speed
        const maxSpeed = 2;
        pic.vx = Math.max(Math.min(pic.vx, maxSpeed), -maxSpeed);
        pic.vy = Math.max(Math.min(pic.vy, maxSpeed), -maxSpeed);

        // Bounce off edges
        const picWidth = pic.el.offsetWidth;
        const picHeight = pic.el.offsetHeight;
        const margin = 20; // Margin from screen edges

        // Bounce off left and right edges
        if (pic.x < margin) {
          pic.x = margin;
          pic.vx = Math.abs(pic.vx) * pic.bounce;
        } else if (pic.x > window.innerWidth - picWidth - margin) {
          pic.x = window.innerWidth - picWidth - margin;
          pic.vx = -Math.abs(pic.vx) * pic.bounce;
        }

        // Bounce off top and bottom edges
        if (pic.y < margin) {
          pic.y = margin;
          pic.vy = Math.abs(pic.vy) * pic.bounce;
        } else if (pic.y > window.innerHeight - picHeight - margin) {
          pic.y = window.innerHeight - picHeight - margin;
          pic.vy = -Math.abs(pic.vy) * pic.bounce;
        }

        // Apply position with smooth transition
        pic.el.style.transition = 'transform 0.1s ease-out';
        pic.el.style.transform = `translate(${pic.x}px, ${pic.y}px)`;
      });
      requestAnimationFrame(animateFloatingPics);
    }

    animateFireflies();
    animateFloatingPics();
};