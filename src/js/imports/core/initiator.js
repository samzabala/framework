import { UIBodyClass } from './../util/ui.js';
import Settings from './settings.js';

class FwQueue {
  constructor() {
    this._on_load = [];
    this._on_ready = [];
    this._on_resize = [];
    this._on_scroll = [];
    this._on_rightAway = [];
    this._on_init = [];
  }

  get on_load() {
    return this._on_load;
  }
  get on_ready() {
    return this._on_ready;
  }
  get on_resize() {
    return this._on_resize;
  }
  get on_scroll() {
    return this._on_scroll;
  }
  get on_rightAway() {
    return this._on_rightAway;
  }
  get on_init() {
    return this._on_init;
  }
  set on_load(fn) {
    this._on_load.push(fn);
  }
  set on_ready(fn) {
    this._on_ready.push(fn);
  }
  set on_resize(fn) {
    this._on_resize.push(fn);
  }
  set on_scroll(fn) {
    this._on_scroll.push(fn);
  }
  set on_rightAway(fn) {
    this._on_rightAway.push(fn);
  }
  set on_init(fn) {
    this._on_init.push(fn);
  }
}

const INITIATOR_QUEUE = new FwQueue();

let is_started = false;

class Initiator {
  constructor() {
    this.resizeTimerInternal = null;
    this.scrollTimerInternal = null;
  }

  static get isStarted() {
    return is_started;
  }

  static set isStarted(val) {
    is_started = val;
  }

  static get Q() {
    return INITIATOR_QUEUE;
  }

  #execqt(fnsArray) {
    fnsArray.forEach((fn) => {
      fn();
    });
  }

  static isDocReady(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  #runRightAway() {
    this.#execqt(Initiator.Q.on_rightAway);
  }

  #runReady() {
    this.#execqt(Initiator.Q.on_ready);
  }

  #runLoad() {
    this.#execqt(Initiator.Q.on_load);
  }

  #runResize() {
    const ini = this;
    clearTimeout(ini.resizeTimerInternal);
    ini.resizeTimerInternal = setTimeout(() => {
      ini.#execqt(Initiator.Q.on_resize);
    }, 100);
  }

  #runScroll() {
    const ini = this;
    // clearTimeout(ini.scrollTimerInternal);
    // ini.scrollTimerInternal = setTimeout(() => {
    ini.#execqt(Initiator.Q.on_scroll);
    // }, 100);
  }

  static setState(mode) {
    mode = mode || 'complete';

    const body = document.querySelector('body');

    switch (mode) {
      case 'loading':
        body.classList.remove(UIBodyClass.loaded);
        body.classList.add(UIBodyClass.loading);
        break;
      case 'complete':
      default:
        setTimeout(() => {
          body.classList.remove(UIBodyClass.loading);
          body.classList.add(UIBodyClass.loaded);
        }, 100);
        break;
    }
  }

  static setLoadingState() {
    Initiator.setState('loading');
  }

  static setCompleteState() {
    Initiator.setState('complete');
  }

  static start() {
    //component events
    const ini = new Initiator();

    //fw core class so we can see if fw js is on ya boi

    document.documentElement &&
      document.documentElement.classList.add(`${Settings.get('prefix')}-js-ready`);

    Initiator.isStarted = true;

    ini.#execqt(Initiator.Q.on_init);

    ini.#runRightAway();

    Initiator.isDocReady(() => {
      ini.#runReady();
      Initiator.setCompleteState();
    });

    window.addEventListener('load', () => {
      ini.#runLoad();
    });
    window.addEventListener('resize', () => {
      ini.#runResize();
    });
    document.addEventListener('scroll', () => {
      ini.#runScroll();
    });
  }

  static restart() {
    if (!Initiator.isStarted) {
      return;
    }
    const ini = new Initiator();

    Initiator.setLoadingState();
    ini.#runRightAway();
    ini.#runReady();
    Initiator.setCompleteState();
    ini.#runLoad();
    console.info('frameWork restarted');
  }
}

Initiator.start();

export default Initiator;
