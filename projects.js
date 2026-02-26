
(function(){
  const HOST = window.location.hostname;
  const DEFAULT_USER = 'swechhap'; // change if your GitHub username differs
  const USER = HOST.endsWith('github.io') ? HOST.split('.')[0] : DEFAULT_USER;
  const TARGET_REPOS = ['ComponentTest','TestCaseGenerator','TestGenAITool'];

  const elAIML = document.getElementById('group-aiml');
  const elTools = document.getElementById('group-tools');
  const fallback = document.getElementById('projects-fallback');
  const sortSelect = document.getElementById('sortSelect');

  const STACK = ['Python','pytest','Kubernetes','AWS']; // shown on each card

  async function fetchRepo(user, name){
    const repoRes = await fetch(`https://api.github.com/repos/${user}/${name}`);
    if (!repoRes.ok) throw new Error(name + ' repo not found');
    const repo = await repoRes.json();

    // topics
    const topicsRes = await fetch(`https://api.github.com/repos/${user}/${name}/topics`, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });
    const topics = topicsRes.ok ? (await topicsRes.json()).names || [] : [];

    // languages (optional, enrich card)
    let languages = [];
    try {
      const langRes = await fetch(`https://api.github.com/repos/${user}/${name}/languages`);
      if (langRes.ok) {
        const langMap = await langRes.json();
        languages = Object.keys(langMap).slice(0,3);
      }
    } catch {}

    return { repo, topics, languages };
  }

  function inAiml(topics){
    const s = topics.join(' ').toLowerCase();
    return /(ai|ml|machine-learning|mlops|nlp|llm|model|inference)/.test(s);
  }

  function stackBadges(){
    return STACK.map(s => `<span class="badge badge-accent">${s}</span>`).join('');
  }

  function topicBadges(topics){
    if (!topics || topics.length === 0) return '<span class="text-secondary small">No topics</span>';
    return topics.map(t => `<span class="badge badge-topic">${t}</span>`).join('');
  }

  function card(data){
    const r = data.repo;
    const updated = new Date(r.pushed_at || r.updated_at);
    const langBadge = r.language ? `<span class="badge text-bg-secondary ms-2">${r.language}</span>` : '';
    const extraLangs = (data.languages || []).filter(l => l !== r.language).slice(0,2).map(l => `<span class="badge text-bg-secondary ms-1">${l}</span>`).join('');

    return `
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="h5 mb-1">${r.name}${langBadge}${extraLangs}</h3>
            <p class="small text-muted mb-2">⭐ ${r.stargazers_count} · Updated ${updated.toLocaleDateString()}</p>
            <p class="flex-grow-1">${r.description || 'No description provided.'}</p>
            <div class="stack-badges mb-2">${stackBadges()}</div>
            <div class="topic-badges mb-3">${topicBadges(data.topics)}</div>
            <div>
              <a class="btn btn-sm btn-primary" href="${r.html_url}" target="_blank" rel="noopener">View on GitHub</a>
              ${r.homepage ? `<a class="btn btn-sm btn-outline-secondary ms-2" href="${r.homepage}" target="_blank" rel="noopener">Live Demo</a>` : ''}
            </div>
          </div>
        </div>
      </div>`;
  }

  function render(groups){
    // Clear containers
    elAIML.innerHTML = '';
    elTools.innerHTML = '';

    const sortBy = sortSelect.value; // 'updated' | 'stars'
    function cmp(a, b){
      if (sortBy === 'stars') return (b.repo.stargazers_count||0) - (a.repo.stargazers_count||0);
      const da = new Date(a.repo.pushed_at || a.repo.updated_at).getTime();
      const db = new Date(b.repo.pushed_at || b.repo.updated_at).getTime();
      return db - da;
    }

    groups.aiml.sort(cmp).forEach(d => elAIML.insertAdjacentHTML('beforeend', card(d)));
    groups.tools.sort(cmp).forEach(d => elTools.insertAdjacentHTML('beforeend', card(d)));
  }

  (async function run(){
    try {
      const data = await Promise.all(TARGET_REPOS.map(n => fetchRepo(USER, n)));
      const groups = { aiml: [], tools: [] };
      data.forEach(d => { (inAiml(d.topics) ? groups.aiml : groups.tools).push(d); });
      render(groups);
      sortSelect.addEventListener('change', () => render(groups));
    } catch(e) {
      console.warn('Falling back to static links:', e);
      fallback.classList.remove('d-none');
    }
  })();
})();
