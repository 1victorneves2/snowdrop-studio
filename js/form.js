// js/form.js — Contact form validation and real submission handler

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
    },
  };

  const successMsg = document.getElementById('formSuccess');

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(field, message) {
    field.input.classList.add('error');
    field.input.setAttribute('aria-invalid', 'true');
    field.error.textContent = message;
  }

  function clearError(field) {
    field.input.classList.remove('error');
    field.input.removeAttribute('aria-invalid');
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

  Object.values(fields).forEach(function (field) {
    field.input.addEventListener('input', function () {
      clearError(field);
      successMsg.textContent = '';
    });
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    successMsg.textContent = '';
    successMsg.classList.remove('is-error');

    if (!validate()) return;

    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.querySelector('.btn-text');

    button.disabled = true;
    buttonText.textContent = 'Enviando...';

    const payload = {
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      message: fields.message.input.value.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(function () {
        return {};
      });

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível enviar sua mensagem.');
      }

      form.reset();
      successMsg.textContent = 'Mensagem enviada. A Snowdrop entra em contato com você em breve.';
    } catch (error) {
      successMsg.classList.add('is-error');
      successMsg.textContent =
        error && error.message
          ? error.message
          : 'Não foi possível enviar sua mensagem. Tente novamente.';
    } finally {
      button.disabled = false;
      buttonText.textContent = 'Enviar mensagem';
    }
  });
})();
