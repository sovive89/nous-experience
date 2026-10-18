const form = document.getElementById('form-email');
const msg = document.getElementById('msg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const lista = JSON.parse(localStorage.getItem('nous_emails') || '[]');
  if (!lista.includes(email)) lista.push(email);
  localStorage.setItem('nous_emails', JSON.stringify(lista));
  msg.hidden = false;
  msg.textContent = 'Cadastrado: ' + email;
  form.reset();
});