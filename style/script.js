const tg = window.Telegram.WebApp;

const userName = tg.initDataUnsafe.userName.first_name;

let p = document.getElementById('0');
p.textContent = `Привет, ${userName}`;
