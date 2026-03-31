export {};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-grid-canvas') as HTMLCanvasElement;
  if (!canvas) return; // Guard for non-home pages

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  
  const drawGrid = () => {
    ctx.clearRect(0, 0, width, height);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.strokeStyle = isDark ? 'rgba(231, 135, 49, 0.15)' : 'rgba(53, 29, 117, 0.1)';
    ctx.lineWidth = 1;
    
    // Draw horizontal lines
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Draw vertical lines
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
  };

  drawGrid();
  
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    drawGrid();
  });

  // Optional: add mutation observer to re-draw when theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        drawGrid();
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
});
