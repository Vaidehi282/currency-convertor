const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"
const dropdown = document.querySelector(".location select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for of used for array
//for in used for obj

for (let select of dropdown) {
    for (let code in countryList) {
        // console.log(select.name);
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name == "from" && code == "USD") {
            newOption.selected = "selected";
        }
        if (select.name == "to" && code == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = ((element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue < 1 || amtValue === "") {
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let fromcurr = fromCurr.value.toLowerCase();
    let tocurr = toCurr.value.toLowerCase();
    let rate = data[fromcurr][tocurr];
    let finalAmt = Math.round(rate * amtValue*100)/100;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}