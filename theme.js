
(function(){
  const key = 'sp-theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  function apply(theme){ root.setAttribute('data-theme', theme); btn.textContent = theme === 'dark' ? '☀️' : '🌙'; }
  const saved = localStorage.getItem(key) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(saved);
  btn.addEventListener('click', function(){ const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; localStorage.setItem(key, next); apply(next); });
})();
