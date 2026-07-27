// js/form.js — Contact form validation and submission handler

(function () {
  const form    = document.getElementById('contactForm');
  if (!form) return;

  const CONTACT_EMAIL = 'snowdropage@gmail.com';

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
    btn.querySelector('.btn-text').textContent = 'Abrindo e-mail...';

    // Sem backend próprio: abre o cliente de e-mail do visitante já endereçado
    // para CONTACT_EMAIL, com os dados preenchidos. Para enviar via servidor
    // (Formspree, EmailJS, backend próprio), troque este bloco por um fetch().
    const name    = fields.name.input.value.trim();
    const email   = fields.email.input.value.trim();
    const message = fields.message.input.value.trim();

    const subject = 'Novo contato via site — ' + name;
    const body =
      'Nome: ' + name + '\n' +
      'E-mail: ' + email + '\n\n' +
      message;

    const mailtoUrl =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoUrl;

    setTimeout(function () {
      form.reset();
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'Enviar mensagem';
      successMsg.textContent = 'Seu cliente de e-mail foi aberto com a mensagem pronta para ' + CONTACT_EMAIL + '.';
    }, 600);
  });
})();
