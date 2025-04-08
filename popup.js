const entryPrice = document.getElementById('entryPrice');
const slPoints = document.getElementById('slPoints');
const targetPoints = document.getElementById('targetPoints');
const quantity = document.getElementById('quantity');
const slPrice = document.getElementById('slPrice');
const slPercent = document.getElementById('slPercent');
const targetPrice = document.getElementById('targetPrice');
const targetPercent = document.getElementById('targetPercent');
const capitalRequired = document.getElementById('capitalRequired');
const slInRupees = document.getElementById('slInRupees');
const targetInRupees = document.getElementById('targetInRupees');
const modeToggle = document.getElementById('modeToggle');

function calculate() {
  const entry = parseFloat(entryPrice.value);
  const sl = parseFloat(slPoints.value);
  const tg = parseFloat(targetPoints.value);
  const qty = parseFloat(quantity.value);

  if (!isNaN(entry) && !isNaN(sl) && !isNaN(tg) && !isNaN(qty)) {
    const slP = entry - sl;
    const tgP = entry + tg;

    slPrice.value = slP.toFixed(2);
    slPercent.value = ((sl / entry) * 100).toFixed(2) + "%";

    targetPrice.value = tgP.toFixed(2);
    targetPercent.value = ((tg / entry) * 100).toFixed(2) + "%";

    capitalRequired.value = (entry * qty).toFixed(2);
    slInRupees.value = (sl * qty).toFixed(2);
    targetInRupees.value = (tg * qty).toFixed(2);

    localStorage.setItem('slPoints', sl);
    localStorage.setItem('targetPoints', tg);
    localStorage.setItem('quantity', qty);
  }
}

// Input listeners
[entryPrice, slPoints, targetPoints, quantity].forEach(input => {
  input.addEventListener('input', calculate);
});

// Restore saved values on page load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('slPoints')) slPoints.value = localStorage.getItem('slPoints');
  if (localStorage.getItem('targetPoints')) targetPoints.value = localStorage.getItem('targetPoints');
  if (localStorage.getItem('quantity')) quantity.value = localStorage.getItem('quantity');
  if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark');
    modeToggle.textContent = '☀️';
  }
  calculate();
});

// Copy button logic
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.copyTarget);
    navigator.clipboard.writeText(input.value);
    button.textContent = '✅';
    setTimeout(() => (button.textContent = '📋'), 1500);
  });
});

// Dark mode toggle
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  modeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('mode', isDark ? 'dark' : 'light');
});
// Toggle SL Points visibility
const toggleSL = document.getElementById('toggleSL');
toggleSL.addEventListener('click', () => {
  if (slPoints.type === 'number') {
    slPoints.type = 'password';
    toggleSL.textContent = '👁️';
  } else {
    slPoints.type = 'number';
    toggleSL.textContent = '🙈';
  }
});

// Toggle Target Points visibility
const toggleTarget = document.getElementById('toggleTarget');
toggleTarget.addEventListener('click', () => {
  if (targetPoints.type === 'number') {
    targetPoints.type = 'password';
    toggleTarget.textContent = '👁️';
  } else {
    targetPoints.type = 'number';
    toggleTarget.textContent = '🙈';
  }
});
