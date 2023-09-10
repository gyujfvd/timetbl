const tg = window.Telegram.WebApp;
//const userName = tg.initDataUnsafe.user.first_name;

const table = document.getElementById("ew");

const tbody = document.querySelector("#Monday > table > tbody");

const nametg = document.getElementById("nametg");
//nametg.textContent = `Hi, $(userName)`;

const button = document.getElementById('qw');


function addNewRow(index) {
    const newTR = document.createElement("tr");
    newTR.id = index;
    tbody.appendChild(newTR);

    const td01 = document.createElement("td");
    td01.textContent = index;
    newTR.appendChild(td01);

    const td02 = document.createElement("td");
    const input01 = document.createElement("input");
    input01.className = "CNinputs";
    input01.placeholder = "Время";
    td02.appendChild(input01);
    newTR.appendChild(td02);

    const td03 = document.createElement("td");
    const input02 = document.createElement("input");
    input02.className = "CNinputs";
    input02.placeholder = "Предмет";
    td02.appendChild(input02);
    newTR.appendChild(td03);

    const td04 = document.createElement("td");
    const button01 = document.createElement("button");
    button01.textContent = "Удалить";
    td04.appendChild(button01);
    newTR.appendChild(td04);
    const buttonsave = document.createElement("button")
    button01.addEventListener('click', () => {
        newTR.remove();
        const alltr = tbody.querySelectorAll("tr");
        let i = 0;
        while(i < alltr.length) {
            let currenttr = alltr[i];
            let firsttd = currenttr.querySelector("td");
            currenttr.id = i + 1;
            firsttd.textContent = i + 1;
            i++;
        }
    });
}


button.addEventListener('click', () => {
    const alltr = tbody.querySelectorAll("tr");
    if (alltr.length == 0) {
        addNewRow(1);
        
    } else {
        addNewRow(+alltr[alltr.length-1].id + 1);
        // alltr                     => NodeList
        // alltr.length - 1          => 4 - 1 = 3 => индекс последней строки
        // +alltr[alltr.length-1].id => "3" => 3
        // addNewRow(3)
    }
   
});

const buttonsave = document.createElement("button");
buttonsave.textContent = "Сохранить";
document.body.appendChild(buttonsave);


buttonsave.addEventListener("click", () => {
    const search = document.querySelectorAll("#Monday > table > tbody > tr > td > input");  // NodeList

    let data = [];
    for (let i = 0; i < search.length; i++) {
        data.push(search[i].value);
    }

    data = JSON.stringify(data);
    tg.sendData(data);
});

