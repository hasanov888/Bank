// API URL və API açarınızı daxil edin
const API_KEY = 'fca_live_ePwYxikduilkO3NGz9uUPbfAgkr1ZuKDrBDgJZAt';
const API_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=' + API_KEY;

// Başlangıç valyutaları
let leftValue = 1, rightValue = 1;
let leftName = "RUB", rightName = "USD"; // Default olaraq RUB və USD

// HTML elementlərini seçmək
const elements = {
    input1: document.querySelector(".input1"),  // Sol input
    input2: document.querySelector(".input2"),  // Sağ input
    text5: document.querySelector(".text5"),    // Valyuta məzənnəsi
    text6: document.querySelector(".text6"),    // Əks valyuta məzənnəsi
    td1: document.querySelector(".td1"),        // Sol tərəf valyutası
    td2: document.querySelector(".td2"),
    td3: document.querySelector(".td3"),
    td4: document.querySelector(".td4"),
    td11: document.querySelector(".td11"),      // Sağ tərəf valyutası
    td21: document.querySelector(".td21"),
    td31: document.querySelector(".td31"),
    td41: document.querySelector(".td41")
};

// API-dən valyuta məzənnələrini çəkmək
async function fetchExchangeRates() {
    let response = await fetch(API_URL);
    let data = await response.json();
    let exchangeRates = data.data;

    // Seçilən valyutalar üçün məzənnələri əldə et
    leftValue = exchangeRates[rightName] / exchangeRates[leftName];
    rightValue = exchangeRates[leftName] / exchangeRates[rightName];

    // Məzənnələri ekranda göstər
    elements.text5.innerText = `1 ${leftName} = ${leftValue.toFixed(4)} ${rightName}`;
    elements.text6.innerText = `1 ${rightName} = ${rightValue.toFixed(4)} ${leftName}`;
}

// Valyuta çevrilməsi
function convertCurrency() {
    // Sol inputa daxil edilən dəyəri əsasən sağ inputu hesabla
    elements.input1.addEventListener("input", (e) => {
        let value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            elements.input2.value = (value * leftValue).toFixed(2); // Sol inputa əsasən sağ inputu hesabla
        } else {
            elements.input2.value = "";
        }
    });

    // Sağ inputa daxil edilən dəyəri əsasən sol inputu hesabla
    elements.input2.addEventListener("input", (e) => {
        let value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            elements.input1.value = (value * rightValue).toFixed(2); // Sağ inputa əsasən sol inputu hesabla
        } else {
            elements.input1.value = "";
        }
    });
}

// Valyuta seçimini dəyişdir (Sol tərəf)
function handleCurrencySelection(currencyName, button) {
    let buttons = [elements.td1, elements.td2, elements.td3, elements.td4];
    buttons.forEach((btn) => {
        btn.style.backgroundColor = btn === button ? "#833cde" : "white";
    });

    leftName = currencyName;  // Seçilən valyutayı sol tərəfdə istifadə et
    fetchExchangeRates().then(convertCurrency);  // Məzənnəni yenilə
}

// Sağ tərəfdəki valyutaları seç
function handleReverseCurrencySelection(currencyName, button) {
    let buttons = [elements.td11, elements.td21, elements.td31, elements.td41];
    buttons.forEach((btn) => {
        btn.style.backgroundColor = btn === button ? "#833cde" : "white";
    });

    rightName = currencyName;  // Sağda seçilən valyutanı dəyişdir
    fetchExchangeRates().then(convertCurrency);  // Məzənnəni yenilə
}

// Valyuta seçim düymələrini qur
function setupCurrencyButtons() {
    elements.td1.addEventListener("click", () => handleCurrencySelection("RUB", elements.td1));
    elements.td2.addEventListener("click", () => handleCurrencySelection("USD", elements.td2));
    elements.td3.addEventListener("click", () => handleCurrencySelection("EUR", elements.td3));
    elements.td4.addEventListener("click", () => handleCurrencySelection("GBP", elements.td4));

    elements.td11.addEventListener("click", () => handleReverseCurrencySelection("RUB", elements.td11));
    elements.td21.addEventListener("click", () => handleReverseCurrencySelection("USD", elements.td21));
    elements.td31.addEventListener("click", () => handleReverseCurrencySelection("EUR", elements.td31));
    elements.td41.addEventListener("click", () => handleReverseCurrencySelection("GBP", elements.td41));
}

// Valyutaların məzənnələrini çəkin və çevirmə funksiyasını başlat
fetchExchangeRates().then(convertCurrency);
setupCurrencyButtons();
