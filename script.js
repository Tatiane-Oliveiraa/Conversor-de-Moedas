const form = document.getElementById('converter-form');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const convertedAmount = document.getElementById('convertedAmount');
const toCurrency = document.getElementById('toCurrency');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const error = document.getElementById('error');

const API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function convertMoney() {
    loading.style.display = 'block'
    error.style.display = "none"
    result.style.display = "none"

    try {
        const response = await fetch(API_URL + fromCurrency.value);
        const data = await response.json()

        const rate = data.rates[toCurrency.value];
        const convertedValue = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedValue;
        
        result.style.display = "block"

        result.innerHTML = `
            <div>
                <p>${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}</p>
            </div>

            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
                <p>Taxa de câmbio: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}</p>
            </div>
        `;


    }
    catch (err) {
        error.style.display = "block";
        error.innerHTML = `
            <div class="error">
                <p>Falha na conversão de moeda. Tente novamente mais tarde.</p>
            </div>
        `;
    }

    loading.style.display = 'none'
    //console.log("Funcionou!")
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    convertMoney();

    


})