/** Project request form for the live Formspree endpoint and the local preview mock. */
(function initProjectForm() {
  'use strict';

  const FORMSPREE_URL = 'https://formspree.io/f/xojknlvk';
  const PREVIEW_ORIGIN = 'http://127.0.0.1:43219';
  const IS_LOCAL_FILE = location.protocol === 'file:';
  const IS_LOCAL_HOST = ['localhost', '127.0.0.1'].includes(location.hostname);
  const MAX_FILES = 10;
  const MAX_FILE_BYTES = 25 * 1024 * 1024;
  const MAX_TOTAL_FILE_BYTES = 90 * 1024 * 1024;
  const form = document.getElementById('quote-form');
  const dropzone = document.getElementById('file-dropzone');
  const fileInput = document.getElementById('file-input');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');
  const defaultButtonText = '\u25B8 SEND PROJECT FOR REVIEW';

  if (!form || !submitBtn) return;

  function setStatus(message, isError) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.toggle('is-error', Boolean(isError));
  }

  function setDropzoneMessage(message, isError, hasFiles) {
    if (!dropzone) return;
    const hint = dropzone.querySelector('.dropzone-hint');
    const icon = dropzone.querySelector('.dropzone-icon');
    if (hint) hint.textContent = message;
    if (icon) icon.textContent = isError ? '!' : hasFiles ? '\u2713' : '\u2191';
    dropzone.classList.toggle('has-files', Boolean(hasFiles) && !isError);
    dropzone.classList.remove('is-dragover');
  }

  function validateFiles(files) {
    if (!files || !files.length) return '';
    if (files.length > MAX_FILES) return 'Choose no more than 10 files.';
    let total = 0;
    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) return file.name + ' exceeds the 25 MB per-file limit.';
      total += file.size;
    }
    if (total > MAX_TOTAL_FILE_BYTES) return 'Files together must be under 90 MB. Send a smaller set and we can arrange the rest by reply.';
    return '';
  }

  function displaySelectedFiles(files) {
    const error = validateFiles(files);
    if (error) {
      if (fileInput) fileInput.value = '';
      setDropzoneMessage(error, true, false);
      setStatus(error, true);
      return false;
    }
    const names = Array.from(files || []).map(file => file.name);
    setDropzoneMessage(names.length ? names.join(', ') : 'Drop models, photos, sketches, logos, or PDFs here — or click to browse', false, names.length > 0);
    setStatus('', false);
    return true;
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => displaySelectedFiles(fileInput.files));
    for (const eventName of ['dragover', 'dragenter']) {
      dropzone.addEventListener(eventName, event => {
        event.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    }
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
    dropzone.addEventListener('drop', event => {
      event.preventDefault();
      dropzone.classList.remove('is-dragover');
      const files = event.dataTransfer.files;
      if (!displaySelectedFiles(files)) return;
      try {
        fileInput.files = files;
      } catch {
        setDropzoneMessage('This browser could not attach dropped files. Click to choose them instead.', true, false);
        setStatus('Click the upload area to choose your files.', true);
      }
    });
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = defaultButtonText;
    submitBtn.style.background = '';
    submitBtn.style.color = '';
  }

  function formError(payload) {
    const errors = Array.isArray(payload?.errors) ? payload.errors : [];
    if (errors.some(item => /NO_FILE_UPLOADS|file uploads are not supported/i.test((item.code || '') + ' ' + (item.message || '')))) {
      return 'Attachments are unavailable right now. Remove them and send the project description; we will request files by reply.';
    }
    return errors.map(item => item.message).filter(Boolean).join(' ') || 'The request could not be sent. Please try again or email print@layerzerolabs.net.';
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (IS_LOCAL_FILE || (IS_LOCAL_HOST && location.origin !== PREVIEW_ORIGIN)) {
      setStatus('Open this preview at http://127.0.0.1:43219/ to test the form safely.', true);
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const error = validateFiles(fileInput?.files);
    if (error) {
      setStatus(error, true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    setStatus('Sending your project request.', false);
    const body = new FormData(form);
    if (!fileInput?.files.length) body.delete('attachments');
    const previewFailure = location.origin === PREVIEW_ORIGIN && new URLSearchParams(location.search).has('preview_fail');
    const endpoint = location.origin === PREVIEW_ORIGIN
      ? '/__preview/form' + (previewFailure ? '?simulate_failure=1' : '')
      : FORMSPREE_URL;

    try {
      const response = await fetch(endpoint, { method: 'POST', body, headers: { Accept: 'application/json' } });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setStatus(formError(payload), true);
        resetButton();
        return;
      }
      try { sessionStorage.setItem('lzl-quote-confirmed', '1'); } catch { /* browser storage is optional */ }
      location.assign(new URL('thank-you.html', location.href));
    } catch {
      setStatus('Network error. Please try again or email print@layerzerolabs.net.', true);
      resetButton();
    }
  });
})();
