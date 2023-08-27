const tg = window.Telegram.WebApp;

const userName = tg.initDataUnsafe.user.first_name;

let p = document.getElementById('0');
let but = document.getElementById('save');
but.addEventListener('click', () => {
    console.log(document.getElementsByClassName('input'));

});

