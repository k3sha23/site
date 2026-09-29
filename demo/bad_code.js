// Демо-файл для учебного рефакторинга. Проблемы убираются по одной за коммит.

// Правка 3: магические числа получили имена и смысл.
const BIG_ORDER_THRESHOLD = 5000
const BIG_ORDER_DISCOUNT_RATE = 0.2
const VAT_RATE = 0.2
const CART_PROMO_DISCOUNT = 300
const QUICK_BUY_PROMO_DISCOUNT = 350
const MIN_ORDER_TOTAL = 100

// Правка 1: вместо двух копий — одна функция; промокод передаётся параметром.
function calcTotal(price, qty, hasPromo, promoDiscount) {
  let total = price * qty
  if (total > BIG_ORDER_THRESHOLD) {
    total = total - total * BIG_ORDER_DISCOUNT_RATE
  }
  total = total + total * VAT_RATE
  if (hasPromo) {
    total = total - promoDiscount
  }
  if (total < MIN_ORDER_TOTAL) {
    total = MIN_ORDER_TOTAL
  }
  return Math.round(total * 100) / 100
}

// Тонкие обёртки сохраняют прежний API для вызывающих сторон.
function checkoutTotal(price, qty, hasPromo) {
  return calcTotal(price, qty, hasPromo, CART_PROMO_DISCOUNT)
}

function quickBuyTotal(price, qty, hasPromo) {
  return calcTotal(price, qty, hasPromo, QUICK_BUY_PROMO_DISCOUNT)
}

// Правка 4: токен читается из окружения, в коде и git его нет.
const API_TOKEN = process.env.DEMO_API_TOKEN

async function submitOrder(order) {
  const res = await fetch("https://api.example.com/orders", {
    method: "POST",
    headers: { Authorization: "Bearer " + API_TOKEN },
    body: JSON.stringify(order),
  })
  return res.ok
}

module.exports = { checkoutTotal, quickBuyTotal, submitOrder }
