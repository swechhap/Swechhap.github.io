
# Swechha Pandey – GitHub Pages Site (v2)

Multi-page static site (Home, Projects, Resume, Contact) with:
- 🌗 Dark/Light mode toggle
- 🎨 Accent palette (indigo/violet/emerald) toggle
- 🧠 Projects page shows live GitHub data for selected repos, adds stack badges (Python, pytest, Kubernetes, AWS), topic chips, and sorting (updated/stars). AI/ML repos are grouped automatically by topics (ai/ml/machine-learning/nlp/mlops/llm).

## Deploy
1. Repo: `swechha.github.io` (user site)
2. Copy all files to the repo root (keep folder structure).
3. Put your resume PDF at `resume/Swechha_Pandey_Resume.pdf`.
4. Commit & push. Site: https://swechha.github.io

## Configure
- Change target repos in `assets/js/projects.js` → `TARGET_REPOS`.
- If your GitHub username differs, update `DEFAULT_USER` at the top of `projects.js`.
- Set default accent by writing to localStorage key `sp-accent` or clicking the 🎨 button (cycles indigo → violet → emerald).

