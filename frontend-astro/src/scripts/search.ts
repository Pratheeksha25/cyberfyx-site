import { searchIndex as staticIndex, type SearchEntry } from '../data/search-index';

let resolvedIndex: SearchEntry[] = staticIndex;

async function initSearchIndex(apiBaseUrl: string) {
  if (!apiBaseUrl) return;
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/public/site/search-index`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) resolvedIndex = data;
    }
  } catch { /* use static fallback */ }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchTrigger = document.getElementById('search-trigger');

  if (!searchTrigger) return;

  // Resolve API base from meta tag and pre-fetch the search index
  const metaTag = document.querySelector('meta[name="cyberfyx-api-base"]');
  const apiBaseUrl = metaTag ? (metaTag.getAttribute('content') ?? '') : '';
  initSearchIndex(apiBaseUrl);

  const dialogContent = `
    <div id="search-dialog" style="display:none; position:fixed; top:80px; left:50%; transform:translateX(-50%); width: 90%; max-width: 600px; background:var(--bg-secondary); border: 1px solid var(--border-glass); border-radius: 12px; z-index:9999; padding: 1.5rem; box-shadow: var(--shadow-hover);">
       <input type="text" id="search-input" placeholder="Search Cyberfyx..." style="width:100%; padding:0.8rem; border:1px solid var(--border-glass); border-radius:8px; font-size:1rem;" />
       <div id="search-results" style="margin-top: 1rem; max-height: 300px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem;"></div>
       <button id="close-search" class="btn btn-outline mt-1 w-full" style="padding:0.5rem;">Close</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', dialogContent);

  const searchDialog = document.getElementById('search-dialog') as HTMLDivElement;
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const resultsDiv = document.getElementById('search-results') as HTMLDivElement;
  const closeBtn = document.getElementById('close-search') as HTMLButtonElement;

  searchTrigger.addEventListener('click', () => {
    searchDialog.style.display = searchDialog.style.display === 'none' ? 'block' : 'none';
    searchInput.focus();
  });

  closeBtn.addEventListener('click', () => {
    searchDialog.style.display = 'none';
    searchInput.value = '';
    resultsDiv.innerHTML = '';
  });

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    resultsDiv.innerHTML = '';

    if (query.length < 2) return;

    const matches = resolvedIndex.filter(entry =>
      entry.title.toLowerCase().includes(query) ||
      entry.excerpt.toLowerCase().includes(query) ||
      entry.keywords.some(k => k.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      resultsDiv.innerHTML = `<p style="color:var(--text-muted); padding:0.5rem;">No results found.</p>`;
    } else {
      matches.forEach(m => {
        const a = document.createElement('a');
        a.href = m.url;
        a.className = 'glass-card';
        a.style.padding = '0.75rem';
        a.style.textDecoration = 'none';
        a.style.color = 'var(--text-primary)';
        a.innerHTML = `<strong style="display:block;margin-bottom:0.25rem;">${m.title}</strong><span style="font-size:0.85rem;color:var(--text-secondary);">${m.excerpt}</span>`;
        resultsDiv.appendChild(a);
      });
    }
  });
});
