function calculate() {
    const Pc = parseFloat(document.getElementById('Pc').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const B = parseFloat(document.getElementById('B').value);
    const delta = parseFloat(document.getElementById('delta').value) / 100; // в частках
  
    const hoursPerDay = 24;
    const MWtoKW = 1000;
  
    const lowerBound = Pc * (1 - delta);
    const upperBound = Pc * (1 + delta);
  
    const erf = (x) => {
      return (2/Math.sqrt(Math.PI)) * (x - (x**3)/3 + (x**5)/10);
    };
  
    const zLower = (lowerBound - Pc) / sigma;
    const zUpper = (upperBound - Pc) / sigma;
    const P = (erf(zUpper/Math.sqrt(2)) - erf(zLower/Math.sqrt(2))) / 2;
  
    const shareNoPenalty = (P + 0.5) * 100; // у %
    const sharePenalty = 100 - shareNoPenalty;
  
    const Wtotal = Pc * hoursPerDay; // МВт⋅год за добу
    const W1 = Wtotal * (shareNoPenalty / 100);
    const W2 = Wtotal * (sharePenalty / 100);
  
    const profit = W1 * MWtoKW * B / 1000; // грн
    const penalty = W2 * MWtoKW * B / 1000; // грн
    const netProfit = profit - penalty;
  
    document.getElementById('result').innerHTML = `
      <p>Частка енергії без штрафу: ${shareNoPenalty.toFixed(1)} %</p>
      <p>Частка енергії зі штрафом: ${sharePenalty.toFixed(1)} %</p>
      <p>Валовий прибуток: ${profit.toFixed(2)} грн</p>
      <p>Штрафи: ${penalty.toFixed(2)} грн</p>
      <h3>Чистий прибуток: ${netProfit.toFixed(2)} грн</h3>
    `;
  }
  
