/* eslint-disable */
import EventSourceMixin from '../common/EventSourceMixin';
import {getScrollbarWidth} from "../common/util";

class ClientInput {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      keysPressed: new Set(), // клавиши, зажатые в данный момент
      keyStateHandlers: {}, // обработчики, срабатывающие каждый рендер, если нажата клавиша
      keyHandlers: {}, // обработчики при нажатии определенной клавиши
    });
    canvas.addEventListener('keydown', (e) => this.onKeyDown(e), false);
    canvas.addEventListener('keyup', (e) => this.onKeyUp(e), false);
  }

  onKeyDown(e) {
    this.keysPressed.add(e.code);
    this.keyHandlers[e.code] && this.keyHandlers[e.code](true);
    this.trigger('keydown', e);

    const scrollWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollWidth + 'px';
  }

  onKeyUp(e) {
    this.keysPressed.delete(e.code);
    this.keyHandlers[e.code] && this.keyHandlers[e.code](false);
    this.trigger('keyup', e);
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = 0;
  }

  onKey({ ...handlers }) {
    this.keyHandlers = { ...this.keyHandlers, ...handlers };
  }
}

Object.assign(ClientInput.prototype, EventSourceMixin);

export default ClientInput;
