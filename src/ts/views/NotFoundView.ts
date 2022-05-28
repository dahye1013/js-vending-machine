import AbstractView from './abstractView';

class NotFoundView extends AbstractView {
  override setEvent(): never {
    throw new Error("NotFoundView doesn't' need event.");
  }

  private errorMessage = '🚨 Not Found! 🚨';

  override render() {
    super.render(this.errorMessage);
  }

  getMarkup(message: string) {
    return /* html */ `
    <section class="error-page-section">
      <h2>
          <span>
            ${message}
          </span>
      </h2> 
      <a href="#">Home</a>
    </section>
    `;
  }
}

export default new NotFoundView();
