// Демо-файл для учебного рефакторинга. Проблемы убираются по одной за коммит.

// Правка 1: вместо двух копий — одна функция; промокод передаётся параметром.
function calcTotal(price, qty, hasPromo, promoDiscount) {
  let total = price * qty
  if (total > 5000) {
    total = total - total * 0.2
  }
  total = total + total * 0.2
  if (hasPromo) {
    total = total - promoDiscount
  }
  if (total < 100) {
    total = 100
  }
  return Math.round(total * 100) / 100
}

// Тонкие обёртки сохраняют прежний API для вызывающих сторон.
function checkoutTotal(price, qty, hasPromo) {
  return calcTotal(price, qty, hasPromo, 300)
}

function quickBuyTotal(price, qty, hasPromo) {
  return calcTotal(price, qty, hasPromo, 350)
}

// ПРОБЛЕМА 3: магические числа 5000 / 0.2 / 300 / 350 / 100 — смысл только угадывается.

// ПРОБЛЕМА 4: захардкоженный API-токен (фейковый, только для демо).
const API_TOKEN = "sk-demo-0000000000000000-not-a-real-token"

async function submitOrder(order) {
  const res = await fetch("https://api.example.com/orders", {
    method: "POST",
    headers: { Authorization: "Bearer " + API_TOKEN },
    body: JSON.stringify(order),
  })
  return res.ok
}

module.exports = { checkoutTotal, quickBuyTotal, submitOrder }
