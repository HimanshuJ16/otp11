// disclaimer


  function openDisclaimer(index) {
    var overlay = document.getElementById(`overlay${index}`);
    var popup = document.getElementById(`popup${index}`);
    overlay.style.display = "flex";
    setTimeout(function() {
      popup.style.opacity = 1;
    }, 10);
  }

  function closeDisclaimer(index) {
    var overlay = document.getElementById(`overlay${index}`);
    var popup = document.getElementById(`popup${index}`);
    popup.style.opacity = 0;
    setTimeout(function() {
      overlay.style.display = "none";
    }, 500);
  }


// SIP

function calculateSIP() {
  const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
  const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);
  const investmentPeriod = parseFloat(document.getElementById('investmentPeriod').value);
  if (expectedReturn > 30) {
    alert('Expected return cannot be more than 30%');
    return;
  }
  const monthlyReturn = expectedReturn / 12 / 100;
  const totalMonths = investmentPeriod * 12;
  const maturityAmount = monthlyInvestment * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn);
  const formattedMaturityAmount = maturityAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace(/\u20B9/, 'Rs ');
  document.getElementById('result').innerText = `Maturity Amount: ${formattedMaturityAmount}`;
}

