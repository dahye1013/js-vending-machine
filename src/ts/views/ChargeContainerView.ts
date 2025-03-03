import AbstractView from './abstractView';
import { isPredicatedElement } from '../utils/predicator';

class ChargeContainerView extends AbstractView {
  override render() {
    const coins = this.store.dispatch('loadData', 'coins');
    super.render(coins);
    this.setEvent();
  }

  override setEvent = () => {
    if (!isPredicatedElement(this.chargeFormElement)) return;

    this.chargeFormElement.addEventListener('submit', (event: Event | SubmitEvent) => {
      event.preventDefault();
      const dataArray = [...new FormData(event.target)];
      const amount = Object.fromEntries(dataArray)['amount'];
      this.store.dispatch('chargeCoin', amount);
      this.render();
    });
  };

  get chargeFormElement() {
    return document.querySelector('.charge-form');
  }

  calculateCoinsSum = (coins: Record<CoinKey, CoinObj>) => {
    return Object.values(coins).reduce((accPrice: number, cur: CoinObj) => {
      accPrice += cur.value * cur.count;
      return accPrice;
    }, 0);
  };

  getMarkup(coins: Record<CoinKey, CoinObj>) {
    const getCoinMarkup = (coin: CoinObj) => {
      return /* html */ ` <tr>
                    <td>${coin.value}원</td>
                    <td>${coin.count}개</td>
                </tr>`;
    };

    return /* html */ `
    <main class="grid grid--2-rows">

      <section>
        <h3>자판기 돈통 충전하기</h3>
        <form class="charge-form">
            <input type="number" name="amount" id="vending-machine-charge-input" autofocus required/>
            <button id="vending-machine-charge-button">충전하기</button>
        </form>
        <p>보유 금액: <em id="vending-machine-charge-amount">
        ${this.calculateCoinsSum(coins)}</em>원</p>
      </section>

      <section>
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
            <colgroup>
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>동전</th>
                    <th>개수</th>
                </tr>
            </thead>
            <tbody>
                ${Object.values(coins).map(getCoinMarkup).join('')}
            </tbody>
        </table>
      </section>

    </main>

`;
  }
}

export default new ChargeContainerView();
