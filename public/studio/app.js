import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY, NETLIFY_BUILD_HOOK_URL, STORAGE_BUCKET } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------
// Schema — defines every editable collection and its form fields.
// Field types: text, textarea, number, boolean, array, select, image
// ---------------------------------------------------------------
const SCHEMAS = {
  settings: {
    label: 'Site Settings',
    table: 'settings',
    singleton: true,
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'title', label: 'Professional Title', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'availability_enabled', label: 'Show availability banner', type: 'boolean' },
      { key: 'availability_label', label: 'Availability text', type: 'text' },
      { key: 'cv_url', label: 'CV File', type: 'image', hint: 'Upload your CV as a PDF — this powers every "Download CV" button on the site.', accept: 'application/pdf' },
      { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
      { key: 'social_clippings', label: 'Clippings.me (Writing) URL', type: 'text' },
      { key: 'social_github', label: 'GitHub URL', type: 'text' },
    ],
  },
  skills: {
    label: 'Skills',
    table: 'skill_categories',
    orderKey: 'sort_order',
    itemLabel: (r) => r.name || 'New category',
    itemMeta: (r) => `${(r.items || []).length} skills`,
    fields: [
      { key: 'name', label: 'Category Name', type: 'text' },
      { key: 'items', label: 'Skills', type: 'array', hint: 'One skill per line.' },
      { key: 'sort_order', label: 'Order', type: 'number' },
    ],
  },
  results: {
    label: 'Selected Results',
    table: 'results',
    orderKey: 'sort_order',
    itemLabel: (r) => r.value || 'New result',
    itemMeta: (r) => r.label || '',
    fields: [
      { key: 'value', label: 'Value (e.g. 100%, 2×)', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'context', label: 'Context', type: 'text' },
      { key: 'sort_order', label: 'Order', type: 'number' },
    ],
  },
  experience: {
    label: 'Experience',
    table: 'experience',
    orderKey: 'sort_order',
    itemLabel: (r) => r.company || 'New role',
    itemMeta: (r) => `${r.role || ''} · ${r.start_date || ''} — ${r.end_date || ''}`,
    fields: [
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'start_date', label: 'Start Date', type: 'text' },
      { key: 'end_date', label: 'End Date', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'achievements', label: 'Achievements', type: 'array', hint: 'One achievement per line.' },
      { key: 'skills', label: 'Skills', type: 'array', hint: 'One skill per line.' },
      { key: 'featured', label: 'Featured on homepage', type: 'boolean' },
      { key: 'sort_order', label: 'Order', type: 'number' },
    ],
  },
  case_studies: {
    label: 'Case Studies',
    table: 'case_studies',
    orderKey: 'sort_order',
    slugFrom: 'title',
    itemLabel: (r) => r.title || 'New case study',
    itemMeta: (r) => `${r.client || ''} · ${r.published ? 'Published' : 'Draft'}`,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'URL Slug', type: 'text', hint: 'Used in the page URL: /work/this-value. Auto-filled from the title, but you can edit it.' },
      { key: 'client', label: 'Client / Organization', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'services', label: 'Services / Skills', type: 'array' },
      { key: 'tools', label: 'Tools / Methods', type: 'array' },
      { key: 'context', label: 'Context (the challenge)', type: 'textarea' },
      { key: 'approach', label: 'Approach', type: 'textarea' },
      { key: 'execution', label: 'Execution', type: 'textarea' },
      { key: 'results', label: 'Results', type: 'array', hint: 'One result per line.' },
      { key: 'cover_image', label: 'Cover Image', type: 'image' },
      { key: 'external_url', label: 'External URL', type: 'text' },
      { key: 'featured', label: 'Featured on homepage', type: 'boolean' },
      { key: 'sort_order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'boolean' },
    ],
  },
  projects: {
    label: 'Projects',
    table: 'projects',
    orderKey: 'sort_order',
    slugFrom: 'title',
    itemLabel: (r) => r.title || 'New project',
    itemMeta: (r) => `${r.category || ''} · ${r.published ? 'Published' : 'Draft'}`,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'URL Slug', type: 'text' },
      { key: 'category', label: 'Category', type: 'select', options: ['Built From Scratch', 'Digital Experience'] },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'highlights', label: 'Highlights', type: 'array', hint: 'One highlight per line.' },
      { key: 'cover_image', label: 'Cover Image', type: 'image' },
      { key: 'external_url', label: 'External URL', type: 'text' },
      { key: 'link_label', label: 'Link Label', type: 'text' },
      { key: 'featured', label: 'Featured on homepage', type: 'boolean' },
      { key: 'sort_order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'boolean' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    table: 'testimonials',
    itemLabel: (r) => r.name || 'New testimonial',
    itemMeta: (r) => (r.published ? 'Published' : 'Draft'),
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'organization', label: 'Organization', type: 'text' },
      { key: 'quote', label: 'Testimonial', type: 'textarea' },
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'published', label: 'Published', type: 'boolean', hint: 'Only publish testimonials you have confirmed consent for.' },
    ],
  },
};

// ---------------------------------------------------------------
// Auth
// ---------------------------------------------------------------
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginBtn = document.getElementById('login-btn');

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    loadSection('settings');
  } else {
    loginScreen.classList.remove('hidden');
    appScreen.classList.add('hidden');
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.classList.add('hidden');
  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in…';
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  loginBtn.disabled = false;
  loginBtn.textContent = 'Sign in';
  if (error) {
    loginError.textContent = error.message;
    loginError.classList.remove('hidden');
    return;
  }
  checkSession();
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  checkSession();
});

checkSession();

// ---------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------
const content = document.getElementById('content');
let activeSection = 'settings';

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => loadSection(btn.dataset.section));
});

function setActiveNav(key) {
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.section === key));
}

async function loadSection(key) {
  activeSection = key;
  setActiveNav(key);
  const schema = SCHEMAS[key];
  content.innerHTML = `<p class="empty-state">Loading…</p>`;
  if (schema.singleton) {
    renderSingleton(key, schema);
  } else {
    renderList(key, schema);
  }
}

// ---------------------------------------------------------------
// Toast + rebuild
// ---------------------------------------------------------------
function toast(message, type = 'ok') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

async function triggerRebuild(silent = false) {
  if (!NETLIFY_BUILD_HOOK_URL) {
    if (!silent) toast('Saved. Set NETLIFY_BUILD_HOOK_URL in studio/config.js to auto-publish changes.', 'ok');
    return;
  }
  try {
    await fetch(NETLIFY_BUILD_HOOK_URL, { method: 'POST', mode: 'no-cors' });
    if (!silent) toast('Saved — the live site is rebuilding now (usually ~2 minutes).', 'ok');
  } catch (err) {
    toast('Saved, but the rebuild request failed. Trigger a deploy manually in Netlify.', 'error');
  }
}

document.getElementById('rebuild-btn').addEventListener('click', () => triggerRebuild(false));

// ---------------------------------------------------------------
// Field rendering
// ---------------------------------------------------------------
function fieldHTML(field, value, idPrefix) {
  const id = `${idPrefix}-${field.key}`;
  const val = value ?? '';

  if (field.type === 'boolean') {
    return `
      <label class="checkbox-field">
        <input type="checkbox" id="${id}" data-key="${field.key}" data-type="boolean" ${val ? 'checked' : ''} />
        <span>${field.label}</span>
      </label>`;
  }

  if (field.type === 'array') {
    const text = Array.isArray(val) ? val.join('\n') : '';
    return `
      <label class="field">
        <span class="label-text">${field.label}</span>
        <textarea id="${id}" data-key="${field.key}" data-type="array" rows="4">${escapeHTML(text)}</textarea>
        ${field.hint ? `<span class="hint">${field.hint}</span>` : ''}
      </label>`;
  }

  if (field.type === 'textarea') {
    return `
      <label class="field">
        <span class="label-text">${field.label}</span>
        <textarea id="${id}" data-key="${field.key}" data-type="text" rows="3">${escapeHTML(val)}</textarea>
        ${field.hint ? `<span class="hint">${field.hint}</span>` : ''}
      </label>`;
  }

  if (field.type === 'select') {
    const opts = field.options.map((o) => `<option value="${o}" ${o === val ? 'selected' : ''}>${o}</option>`).join('');
    return `
      <label class="field">
        <span class="label-text">${field.label}</span>
        <select id="${id}" data-key="${field.key}" data-type="text">${opts}</select>
      </label>`;
  }

  if (field.type === 'number') {
    return `
      <label class="field">
        <span class="label-text">${field.label}</span>
        <input type="number" id="${id}" data-key="${field.key}" data-type="number" value="${val}" />
      </label>`;
  }

  if (field.type === 'image') {
    return `
      <label class="field">
        <span class="label-text">${field.label}</span>
        <input type="hidden" id="${id}" data-key="${field.key}" data-type="text" value="${escapeHTML(val)}" />
        <input type="file" id="${id}-file" accept="${field.accept || 'image/*'}" data-upload-target="${id}" data-bucket-key="${field.key}" />
        ${field.hint ? `<span class="hint">${field.hint}</span>` : ''}
        ${val && field.accept !== 'application/pdf' ? `<img src="${val}" class="image-preview" alt="" id="${id}-preview" />` : ''}
        ${val && field.accept === 'application/pdf' ? `<span class="hint">Current file: <a href="${val}" target="_blank" rel="noopener">${val}</a></span>` : ''}
        <span class="hint" id="${id}-status"></span>
      </label>`;
  }

  // default: text
  return `
    <label class="field">
      <span class="label-text">${field.label}</span>
      <input type="text" id="${id}" data-key="${field.key}" data-type="text" value="${escapeHTML(val)}" />
      ${field.hint ? `<span class="hint">${field.hint}</span>` : ''}
    </label>`;
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function readForm(formEl) {
  const out = {};
  formEl.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.dataset.key;
    const type = el.dataset.type;
    if (type === 'boolean') {
      out[key] = el.checked;
    } else if (type === 'array') {
      out[key] = el.value.split('\n').map((s) => s.trim()).filter(Boolean);
    } else if (type === 'number') {
      out[key] = el.value === '' ? 0 : Number(el.value);
    } else {
      out[key] = el.value;
    }
  });
  return out;
}

function bindImageUploads(formEl) {
  formEl.querySelectorAll('input[type="file"][data-upload-target]').forEach((fileInput) => {
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      const targetId = fileInput.dataset.uploadTarget;
      const statusEl = document.getElementById(`${targetId}-status`);
      const hiddenInput = document.getElementById(targetId);
      statusEl.textContent = 'Uploading…';
      const path = `${fileInput.dataset.bucketKey}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
      if (error) {
        statusEl.textContent = `Upload failed: ${error.message}`;
        return;
      }
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      hiddenInput.value = data.publicUrl;
      statusEl.textContent = 'Uploaded. Click Save to keep this change.';
      const preview = document.getElementById(`${targetId}-preview`);
      if (preview) preview.src = data.publicUrl;
    });
  });
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ---------------------------------------------------------------
// Singleton section (Settings)
// ---------------------------------------------------------------
async function renderSingleton(key, schema) {
  const { data, error } = await supabase.from(schema.table).select('*').eq('id', 1).single();
  if (error) {
    content.innerHTML = `<p class="error-text">Couldn't load settings: ${escapeHTML(error.message)}</p>`;
    return;
  }
  content.innerHTML = `
    <h2>${schema.label}</h2>
    <p class="section-sub">These fields power the header, footer, hero and contact page across the whole site.</p>
    <form id="singleton-form">
      ${schema.fields.map((f) => fieldHTML(f, data[f.key], 'settings')).join('')}
      <button type="submit" class="primary">Save changes</button>
    </form>
  `;
  bindImageUploads(content);
  document.getElementById('singleton-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = readForm(e.target);
    const { error: saveError } = await supabase.from(schema.table).update(values).eq('id', 1);
    if (saveError) { toast(`Save failed: ${saveError.message}`, 'error'); return; }
    triggerRebuild();
  });
}

// ---------------------------------------------------------------
// List sections (everything else)
// ---------------------------------------------------------------
async function renderList(key, schema) {
  let query = supabase.from(schema.table).select('*');
  if (schema.orderKey) query = query.order(schema.orderKey, { ascending: true });
  const { data, error } = await query;

  if (error) {
    content.innerHTML = `<p class="error-text">Couldn't load ${schema.label}: ${escapeHTML(error.message)}</p>`;
    return;
  }

  content.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:0.3rem;">
      <div>
        <h2>${schema.label}</h2>
        <p class="section-sub">${data.length} ${data.length === 1 ? 'entry' : 'entries'}</p>
      </div>
      <button class="primary small" id="add-new-btn">+ Add new</button>
    </div>
    <div id="list-container">
      ${data.length === 0 ? '<p class="empty-state">Nothing here yet. Click "Add new" to create the first entry.</p>' : ''}
    </div>
  `;

  const listContainer = document.getElementById('list-container');
  data.forEach((row) => listContainer.appendChild(buildItemCard(key, schema, row)));

  document.getElementById('add-new-btn').addEventListener('click', async () => {
    const blank = {};
    schema.fields.forEach((f) => {
      if (f.type === 'boolean') blank[f.key] = f.key === 'published' ? true : false;
      else if (f.type === 'array') blank[f.key] = [];
      else if (f.type === 'number') blank[f.key] = 0;
      else blank[f.key] = f.key === 'title' ? 'Untitled' : '';
    });
    if (schema.slugFrom) blank.slug = `untitled-${Date.now()}`;
    const { data: inserted, error: insertError } = await supabase.from(schema.table).insert(blank).select().single();
    if (insertError) { toast(`Couldn't create entry: ${insertError.message}`, 'error'); return; }
    if (data.length === 0) listContainer.innerHTML = '';
    const card = buildItemCard(key, schema, inserted);
    listContainer.prepend(card);
    card.querySelector('.item-card-body').classList.remove('hidden');
  });
}

function buildItemCard(sectionKey, schema, row) {
  const wrapper = document.createElement('div');
  wrapper.className = 'item-card';
  const idPrefix = `${sectionKey}-${row.id}`;
  const labelText = schema.itemLabel ? schema.itemLabel(row) : row.id;
  const metaText = schema.itemMeta ? schema.itemMeta(row) : '';

  wrapper.innerHTML = `
    <div class="item-card-head">
      <div>
        <h3>${escapeHTML(labelText)}</h3>
        <span class="meta">${escapeHTML(metaText)}</span>
      </div>
      <button type="button" class="small toggle-btn">Edit</button>
    </div>
    <div class="item-card-body hidden">
      <form>
        ${schema.fields.map((f) => fieldHTML(f, row[f.key], idPrefix)).join('')}
        <div class="item-actions">
          <button type="submit" class="primary">Save</button>
          <button type="button" class="danger delete-btn">Delete</button>
        </div>
      </form>
    </div>
  `;

  const body = wrapper.querySelector('.item-card-body');
  const form = wrapper.querySelector('form');
  bindImageUploads(form);

  wrapper.querySelector('.toggle-btn').addEventListener('click', () => {
    body.classList.toggle('hidden');
  });

  if (schema.slugFrom) {
    const titleInput = document.getElementById(`${idPrefix}-${schema.slugFrom}`);
    const slugInput = document.getElementById(`${idPrefix}-slug`);
    let slugManuallyEdited = !!row.slug && row.slug !== slugify(row[schema.slugFrom]);
    slugInput?.addEventListener('input', () => { slugManuallyEdited = true; });
    titleInput?.addEventListener('input', () => {
      if (!slugManuallyEdited && slugInput) slugInput.value = slugify(titleInput.value);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = readForm(form);
    const { error: saveError } = await supabase.from(schema.table).update(values).eq('id', row.id);
    if (saveError) { toast(`Save failed: ${saveError.message}`, 'error'); return; }
    Object.assign(row, values);
    wrapper.querySelector('h3').textContent = schema.itemLabel ? schema.itemLabel(row) : row.id;
    wrapper.querySelector('.meta').textContent = schema.itemMeta ? schema.itemMeta(row) : '';
    triggerRebuild();
  });

  wrapper.querySelector('.delete-btn').addEventListener('click', async () => {
    if (!confirm(`Delete "${labelText}"? This can't be undone.`)) return;
    const { error: deleteError } = await supabase.from(schema.table).delete().eq('id', row.id);
    if (deleteError) { toast(`Delete failed: ${deleteError.message}`, 'error'); return; }
    wrapper.remove();
    triggerRebuild();
  });

  return wrapper;
}
