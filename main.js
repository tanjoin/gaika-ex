function roundUp(value, base) {
    return Math.ceil(value / base) * base;
}

function round(value, base) {
    return Math.round(value * base) / base;
}

function leverage25(value) {
    return value / 25 * 10000;
}

function clickButton() {
    document.getElementById('rate-button').addEventListener('click', () => {
        let rate = document.getElementById('rate').value;
        console.log(rate);
        if (rate && rate > 0) {
            let result = roundUp(leverage25(rate), 1000);
            document.getElementById('need').value = result;
        } else {
            document.getElementById('need').value = -1;
        }

        rateList(rate);
    });
}

function rateList(rate) {
    let tbody = document.getElementById('rate-list');
    let d = 0.1;
    let html = [...Array(30)].map((_, i) => 
    `<tr${i !== 0 ? '' : ' class="table-success"' }>
      <th scope="row">${round(parseFloat(rate) + d * i, 1000)}</th>
      <td>${roundUp(leverage25(round(parseFloat(rate) + d * i, 1000)), 1000)}</td>
    </tr>`).reverse().concat([...Array(29)].map((_, i) => 
    `<tr>
      <th scope="row">${round(parseFloat(rate) - d * (i + 1), 1000)}</th>
      <td>${roundUp(leverage25(round(parseFloat(rate) - d *  (i + 1), 1000)), 1000)}</td>
    </tr>`));
    tbody.insertAdjacentHTML('beforeend', html.join(''));
}

window.onload = () => {
    clickButton();
}