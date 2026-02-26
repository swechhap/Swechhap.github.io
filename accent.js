
(function(){
  const key = 'sp-accent';
  const root = document.documentElement;
  const btn = document.getElementById('accentToggle');
  const choices = ['indigo','violet','emerald'];
  function apply(v){ if(v && v !== 'indigo') root.setAttribute('data-accent', v); else root.removeAttribute('data-accent'); }
  const saved = localStorage.getItem(key) || 'indigo';
  apply(saved);
  btn.addEventListener('click', function(){
    const cur = localStorage.getItem(key) || 'indigo';
    const idx = (choices.indexOf(cur) + 1) % choices.length;
    const next = choices[idx];
    localStorage.setItem(key, next);
    apply(next);
    btn.title = 'Accent: ' + next;
  });
  btn.title = 'Accent: ' + saved;
})();
