class RateCalculator {
    constructor() {
        this.initializeEventListeners();
    }

    // 数値を指定した基準で切り上げ
    roundUp(value, base) {
        return Math.ceil(value / base) * base;
    }

    // 数値を指定した精度で四捨五入
    round(value, base) {
        return Math.round(value * base) / base;
    }

    // レバレッジ25倍の計算
    leverage25(value) {
        return value / 25 * 10000;
    }

    // イベントリスナーの初期化
    initializeEventListeners() {
        document.getElementById('rate-button').addEventListener('click', () => {
            const rate = document.getElementById('rate').value;
            console.log(rate);
            
            if (rate && rate > 0) {
                const result = this.roundUp(this.leverage25(rate), 1000);
                document.getElementById('need').value = result;
            } else {
                document.getElementById('need').value = -1;
            }

            this.generateRateList(rate);
        });
    }

    // レート一覧の生成
    generateRateList(rate) {
        const tbody = document.getElementById('rate-list');
        tbody.innerHTML = ''; // 既存の内容をクリア
        const increment = 0.1;
        
        // 全レートのleverage値を事前に計算
        const allRates = [];
        
        // 上方向のレート（30個）
        for (let i = 29; i >= 0; i--) {
            const currentRate = this.round(parseFloat(rate) + increment * i, 1000);
            const leverage = this.roundUp(this.leverage25(currentRate), 1000);
            allRates.push({ rate: currentRate, leverage, isCenter: i === 0 });
        }
        
        // 下方向のレート（29個）
        for (let i = 1; i <= 29; i++) {
            const currentRate = this.round(parseFloat(rate) - increment * i, 1000);
            const leverage = this.roundUp(this.leverage25(currentRate), 1000);
            allRates.push({ rate: currentRate, leverage, isCenter: false });
        }
        
        // HTMLを生成（前の行と比較して変動をチェック）
        const html = allRates.map((item, index) => {
            let rowClass = '';
            
            if (item.isCenter) {
                rowClass = ' class="table-success"'; // 中央行は緑色
            } else if (index > 0) {
                // 前の行のleverage値と比較
                const previousLeverage = allRates[index - 1].leverage;
                if (item.leverage !== previousLeverage) {
                    rowClass = ' class="table-danger"'; // 変動した行は赤色
                }
            }
            
            return `<tr${rowClass}>
                <th scope="row">${item.rate}</th>
                <td>${item.leverage}</td>
            </tr>`;
        });

        tbody.insertAdjacentHTML('beforeend', html.join(''));
    }
}

// アプリケーションの初期化
window.addEventListener('DOMContentLoaded', () => {
    new RateCalculator();
});