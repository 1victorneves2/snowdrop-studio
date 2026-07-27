// js/form.js — Contact form validation and submission handler

(function () {
  const form    = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name:    { input: document.getElementById('name'),    error: document.getElementById('nameError') },
    email:   { input: document.getElementById('email'),   error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  const successMsg = document.getElementById('formSuccess');

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function setError(field, message) {
    field.input.classList.add('error');
    field.error.textContent = message;
  }

  function clearError(field) {
    field.input.classList.remove('error');
    field.error.textContent = '';
  }

  function validate() {
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setError(fields.name, 'Por favor, informe seu nome.');
      valid = false;
    } else {
      clearError(fields.name);
    }

    if (!fields.email.input.value.trim()) {
      setError(fields.email, 'Por favor, informe seu e-mail.');
      valid = false;
    } else if (!validateEmail(fields.email.input.value.trim())) {
      setError(fields.email, 'E-mail inválido.');
      valid = false;
    } else {
      clearError(fields.email);
    }

    if (!fields.message.input.value.trim()) {
      setError(fields.message, 'Escreva um pouco sobre o seu projeto.');
      valid = false;
    } else {
      clearError(fields.message);
    }

    return valid;
  }

  // Live clear on input
  Object.values(fields).forEach(function (field) {
    field.input.addEventListener('input', function () {
      clearError(field);
    });
  });

  // Submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.textContent = '';

    if (!validate()) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Enviando...';

    // TODO: Replace with your real API endpoint (e.g. Formspree, EmailJS, custom backend)
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    //   .then(res => res.json())
    //   .then(() => { ... })

    // Simulated response for now (remove when backend is connected)
    setTimeout(function () {
      form.reset();
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'Enviar mensagem';
      successMsg.textContent = 'Mensagem enviada! Respondemos em até 24h.';
    }, 1200);
  });
})();
