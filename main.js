const unchInput = document.getElementById("unchInput"),
    opInput = document.getElementById("opInput"),
    buyInput = document.getElementById("buyInput"),
    sellInput = document.getElementById("sellInput"),
    minSellPrice = document.getElementById("minSellPrice"),
    twoPercent = document.getElementById("twoPercent"),
    buyFee = document.getElementById("buyFee"),
    sellFee = document.getElementById("sellFee"),
    sellTax = document.getElementById("sellTax"),
    net = document.getElementById("net"),
    result = document.getElementById("result"),
    // 當沖交易稅 請填寫 = "1.5" ;  現股交易稅 請填 = "3"
    tax = 1.5;
// console.log(twoPercent);

opInput.addEventListener("input", function () {
    const unch = parseFloat(unchInput.value);
    const op = parseFloat(opInput.value);
    if (op > unch && op <= unch * 1.03) {
        // 黃綠色
        opInput.style.backgroundColor = "#bfff00";
    } else if (op > unch * 1.03 && op <= unch * 1.05) {
        // 黃色
        opInput.style.backgroundColor = "#ffff00";
    } else if (op <= unch || op > unch * 1.05) {
        opInput.style.backgroundColor = "pink";
    } else {
        opInput.style.backgroundColor = "";
    }
});

buyInput.addEventListener("input", function () {
    const buy = parseFloat(buyInput.value);
    const minSellPriceCal = Math.round(buy * (1000 + 1.425) / (1000 - 1.425 - tax) * 100) / 100;
    const twoPercetCal = Math.round(buy * 1.02 * 100) / 100;
    // console.log(buy);
    if (buyInput.value !== "") {
        minSellPrice.innerText = minSellPriceCal;
        twoPercent.innerText = twoPercetCal;
    } else {
        minSellPrice.innerText = "";
        twoPercent.innerText = "";
    }
});

sellInput.addEventListener("input", function () {
    const buy = parseFloat(buyInput.value);
    const sell = parseFloat(sellInput.value);
    const minSellPriceCal = Math.round(buy * (1000 + 1.425) / (1000 - 1.425 - 1.5) * 100) / 100;
    const buyFeeCal = Math.floor(buy * 1000 * 0.1425 / 100);
    const sellFeeCal = Math.floor(sell * 1000 * 0.1425 / 100);
    const sellTaxCal = Math.floor(sell * 1000 * 0.15 / 100);
    let netCal = (sell - buy) * 1000 - buyFeeCal - sellFeeCal - sellTaxCal;
    // 將 netCal 轉成 string , 然後加上千分位(如: 1000 -> 1,000)
    netCal = netCal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    if (sell < minSellPriceCal) {
        sellInput.style.backgroundColor = "pink";
    } else {
        sellInput.style.backgroundColor = "";
    }
    if (buyInput.value !== "") {
        if (sellInput.value !== "") {
            buyFee.innerText = buy + " * 1,000 * 0.1425 / 100 = " + buyFeeCal;
            sellFee.innerText = sell + " * 1,000 * 0.1425 / 100 = " + sellFeeCal;
            sellTax.innerText = sell + " * 1,000 * 0.15 / 100 = " + sellTaxCal;
            net.innerText = `( ${sell} - ${buy} ) * 1,000 - ${buyFeeCal} - ${sellFeeCal} - ${sellTaxCal} = `;
            result.innerText = netCal;
        } else {
            buyFee.innerText = "";
            sellFee.innerText = "";
            sellTax.innerText = "";
            net.innerText = "";
            result.innerText = "";
        }
    } else {
        buyFee.innerText = "";
        sellFee.innerText = "";
        sellTax.innerText = "";
        net.innerText = "";
        result.innerText = "";
    }
});