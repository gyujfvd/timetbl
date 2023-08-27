const tg = window.Telegram.WebApp;

const userName = tg.initDataUnsafe.user.first_name;

let p = document.getElementById('0');
p.textContent = `Привет, ${userName}`;
