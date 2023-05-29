
fetch('rate.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    
    const currencies = xmlDoc.getElementsByTagName('Currency');
    const rates = {};
    for (let i = 0; i < currencies.length; i++) {
      const currency = currencies[i];
      const code = currency.getAttribute('Code');
      const rate = parseFloat(currency.getAttribute('Rate'));
      rates[code] = rate;
    }

  
    const form = document.getElementById('converterForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const amountInput = document.getElementById('amount');
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount)) {
        alert('請輸入有效數值！');
        resetForm();
        return;
      }
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = '';

      const currencies = ['USD', 'EUR', 'JPY', 'KRW', 'AUD'];
      currencies.forEach(currency => {
        const convertedAmount = (amount / rates['TWD'] * rates[currency]).toFixed(2);
        const resultText = `${convertedAmount} ${currency}`;
        const resultElement = document.createElement('p');
        resultElement.textContent = resultText;
        resultContainer.appendChild(resultElement);
      });
      resetForm();
    });

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', resetForm);


    function resetForm() {
      form.reset();
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = '';
    }
  });
