class web_calculator {
    static calculator1() {
        const kNominalTension = 10;
        const kCurrentDensity = 1.4;
        const kCtVal = 92;

        const kIkVal = parseFloat(document.getElementById("kIk").value);
        const kSmVal = parseFloat(document.getElementById("kSm").value);
        const ktPhiVal = parseFloat(document.getElementById("ktPhi").value);

        if (isNaN(kIkVal) || isNaN(kSmVal) || isNaN(ktPhiVal)) {
            alert("Будь ласка, введіть усі значення.");
            return;
        }

        let kImVal = (kSmVal / 2) / (Math.sqrt(3) * kNominalTension);
        let kImPaVal = 2 * kImVal;
        let kSekVal = kImVal / kCurrentDensity;
        let kS_SMinVal = (kIkVal * Math.sqrt(ktPhiVal)) / kCtVal;

        document.getElementById("result1").innerHTML = `
            Результат: <br>
            Розрахунковий струм для нормального режиму: ${kImVal.toFixed(2)}<br>
            Розрахунковий струм для післяаварійного режиму: ${kImPaVal.toFixed(2)}<br>
            Економічний переріз: ${kSekVal.toFixed(2)}<br>
            Кабель: ААБ 10 3×25<br>
            Термічна стійкість кабелю до дії струмів КЗ: ${kS_SMinVal.toFixed(2)}
        `;
    }

    static calculator2() {
        const kUsnVal = 10.5;
        const kUkPercVal = 10.5;
        const kSnomtVal = 6.3;

        const kKZPower = parseFloat(document.getElementById("kKZPower").value);

        if (isNaN(kKZPower)) {
            alert("Будь ласка, введіть значення.");
            return;
        }

        let kSumXVal = (kUsnVal ** 2) / kKZPower + (kUkPercVal / 100) * ((kUsnVal ** 2) / kSnomtVal);
        let kIp0Val = kUsnVal / (Math.sqrt(3) * kSumXVal);

        document.getElementById("result2").innerHTML = `
            Результат: <br>
            Сумарний опір для точки К1: ${kSumXVal.toFixed(2)}<br>
            Початкове діюче значення струму трифазного КЗ: ${kIp0Val.toFixed(2)}
        `;
    }

    static calculator3() {
        const kUvnVal = parseFloat(document.getElementById("kUvn").value);
        const kUkmaxVal = parseFloat(document.getElementById("kUkmax").value);
        const kSnomtVal = parseFloat(document.getElementById("kSnomt").value);
        const kRshVal = parseFloat(document.getElementById("kRsh").value);
        const kXcnVal = parseFloat(document.getElementById("kXcn").value);
        const kRshMinVal = parseFloat(document.getElementById("kRshMin").value);
        const kXcMinVal = parseFloat(document.getElementById("kXcMin").value);

        if (isNaN(kUvnVal) || isNaN(kUkmaxVal) || isNaN(kSnomtVal) || isNaN(kRshVal) || isNaN(kXcnVal) || isNaN(kRshMinVal) || isNaN(kXcMinVal)) {
            alert("Будь ласка, введіть усі значення.");
            return;
        }

        let kXtVal = (kUkmaxVal * Math.pow(kUvnVal, 2)) / (100 * kSnomtVal);
        let kXshVal = kXcnVal + kXtVal;
        let kZshVal = Math.sqrt(Math.pow(kRshVal, 2) + Math.pow(kXshVal, 2));
        let kXshMinVal = kXcMinVal + kXtVal;
        let kZshMinVal = Math.sqrt(Math.pow(kRshMinVal, 2) + Math.pow(kXshMinVal, 2));
        let sqrt3 = Math.sqrt(3);
        let kIsh3Val = (kUvnVal * 1000) / (sqrt3 * kZshVal);
        let kIsh2Val = kIsh3Val * (sqrt3 / 2);
        let kIsh3MinVal = (kUvnVal * 1000) / (sqrt3 * kZshMinVal);
        let kIsh2MinVal = kIsh3MinVal * (sqrt3 / 2);

        let resultHTML = `
            <p>Результат:</p>
            <p>Реактивний опір силового трансформатора: ${kXtVal.toFixed(2)}</p>
            <p>Опори в нормальному режимі: Z: ${kZshVal.toFixed(2)} X: ${kXshVal.toFixed(2)}</p>
            <p>Опори в мінімальному режимі: Z: ${kZshMinVal.toFixed(2)} X: ${kXshMinVal.toFixed(2)}</p>
            <p>Струми в нормальному режимі: I(3): ${kIsh3Val.toFixed(2)} I(2): ${kIsh2Val.toFixed(2)}</p>
            <p>Струми в мінімальному режимі: I(3): ${kIsh3MinVal.toFixed(2)} I(2): ${kIsh2MinVal.toFixed(2)}</p>
        `;
        document.getElementById("result3").innerHTML = resultHTML;
    }
}