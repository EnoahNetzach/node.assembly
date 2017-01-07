export default class {
  constructor(getter, setter) {
    this.getter = getter
    this.setter = setter
  }

  get() {
    if (typeof this.getter === 'function' && this.getter.next) {
      const next = this.getter.next(this)
      this.value = next.done ? this.value : next.value
    } else if (typeof this.getter === 'function') {
      this.value = this.getter(this)
    } else {
      this.value = this.getter
    }

    return this.value
  }

  set(value) {
    if (typeof this.setter === 'function') {
      this.setter(this, value)
    }
  }

  peek() {
    return this.value
  }
}
