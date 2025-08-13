// Overlay + keyboard controls; Sidebar toggle; Theme toggle
(function () {
  // Overlay
  const overlay = document.getElementById('wireOverlay');
  const overlayImg = overlay?.querySelector('img');
  let on = false; let dx = 0, dy = 0, s = 1, op = 0.25;
  function applyOverlay() { if (overlayImg) { overlayImg.style.opacity = String(op); overlayImg.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`; } }
  function toggleOverlay() { on = !on; overlay?.classList.toggle('on', on); overlay?.setAttribute('aria-hidden', on ? 'false' : 'true'); applyOverlay(); }
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'o' && e.shiftKey) { e.preventDefault(); toggleOverlay(); return; }
    if (!on) return; const step = e.shiftKey ? 16 : 4; // 8pt friendly
    if (e.key === 'ArrowLeft') { dx -= step; applyOverlay(); }
    if (e.key === 'ArrowRight') { dx += step; applyOverlay(); }
    if (e.key === 'ArrowUp') { dy -= step; applyOverlay(); }
    if (e.key === 'ArrowDown') { dy += step; applyOverlay(); }
    if (e.key === '+' || e.key === '=') { s = Math.min(2, +(s + 0.02).toFixed(2)); applyOverlay(); }
    if (e.key === '-' || e.key === '_') { s = Math.max(0.5, +(s - 0.02).toFixed(2)); applyOverlay(); }
    if (e.key.toLowerCase() === 'p') { op = Math.min(1, +(op + 0.05).toFixed(2)); applyOverlay(); }
    if (e.key.toLowerCase() === 'l') { op = Math.max(0, +(op - 0.05).toFixed(2)); applyOverlay(); }
  });

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  sidebarToggle?.addEventListener('click', () => {
    const collapsed = sidebar?.classList.toggle('collapsed');
    sidebarToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  });

  // Theme toggle (default light)
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(mode) { root.setAttribute('data-theme', mode); }
  setTheme('light');
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
})();
