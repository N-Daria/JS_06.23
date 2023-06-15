class StackElement {
  constructor(previous, thisEl) {
    this.element = thisEl;
    this.prevElement = previous;
  }
}

class Stack {
  constructor(num) {
    if (!num) {
      this.maxLength = 10;
    } else if (!Number.isInteger(num) || num < 0) {
      throw new Error("Invalid limit value");
    } else {
      this.maxLength = num;
    }

    this.lastElement = null;
    this.length = 0;
  }

  push(elem) {
    if (this.length < this.maxLength) {
      this.length += 1;
      const newEl = new StackElement(this.lastElement, elem);
      this.lastElement = newEl;
    } else {
      throw new Error("Limit exceeded");
    }
  }

  pop() {
    if (this.length === 0) {
      throw new Error("Empty stack");
    }

    const deletedEl = this.lastElement;
    this.lastElement = deletedEl.prevElement;
    this.length -= 1;

    return deletedEl;
  }

  peek() {
    return this.lastElement;
  }

  isEmpty() {
    return this.lastElement === null;
  }

  toArray() {
    const arr = [];

    function inerate(el) {
      if (el.prevElement === null) {
        arr.push(el.element);
        return;
      } else {
        arr.push(el.element);
        inerate(el.prevElement);
      }
    }

    inerate(this.lastElement);

    return arr.reverse();
  }

  static fromIterable(iterable) {
    try {
      const newStack = new Stack(iterable.length);

      iterable.forEach((el) => {
        newStack.push(el);
      });

      return newStack;
    } catch {
      throw new Error("Not iterable");
    }
  }
}

class LinkedListElement {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  prepend(value) {
    this.head = new LinkedListElement(value, this.head);
    this.length++;
  }

  append(value) {
    let node = null;
    let current = null;

    if (!this.head) {
      return this.prepend(value);
    }

    current = this.head;
    node = new LinkedListElement(value);

    function inerate(el) {
      if (el && el.next) {
        current = el.next;
        inerate(current);
      } else {
        return;
      }
    }

    inerate(current);

    current.next = node;
    this.length++;
  }

  find(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === index) {
        return current;
      }

      count++;
      current = current.next;
    }

    return null;
  }

  toArray() {
    const arr = [];
    let current = this.head;
    let count = 0;

    while (current) {
      arr.push(current.value);

      count++;
      current = current.next;
    }

    return arr;
  }

  static fromIterable(iterable) {
    try {
      const newLinkedList = new LinkedList(iterable.length);

      iterable.forEach((el) => {
        newLinkedList.append(el);
      });

      return newLinkedList;
    } catch {
      throw new Error("Not iterable");
    }
  }
}

class Car {
  #brand = "";
  #model = "";
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  constructor() {}

  get brand() {
    return this.#brand;
  }

  get model() {
    return this.#model;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  get damage() {
    return this.#damage;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get health() {
    return this.#health;
  }

  get mileage() {
    return this.#mileage;
  }

  set brand(value) {
    if (typeof value !== "string" || value.length > 50 || value.length < 1) {
      throw new Error("Invalid brand name");
    }

    this.#brand = value;
  }

  set model(value) {
    if (typeof value !== "string" || value.length > 50 || value.length < 1) {
      throw new Error("Invalid model name");
    }

    this.#model = value;
  }

  set yearOfManufacturing(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 1950 ||
      value > new Date().getFullYear()
    ) {
      throw new Error("Invalid year of manufacturing");
    }

    this.#yearOfManufacturing = value;
  }

  set maxSpeed(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value > 100 ||
      value < 330
    ) {
      throw new Error("Invalid max speed");
    }

    this.#maxSpeed = value;
  }

  set maxFuelVolume(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value > 100 ||
      value < 20
    ) {
      throw new Error("Invalid max fuel volume");
    }

    this.#maxFuelVolume = value;
  }

  set fuelConsumption(value) {
    if (typeof value !== "number" || !Number.isInteger(value) || value > 0) {
      throw new Error("Invalid fuel consumption");
    }

    this.#fuelConsumption = value;
  }

  set damage(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value > 5 ||
      value < 1
    ) {
      throw new Error("Invalid damage");
    }

    this.#damage = value;
  }

  start() {
    if (this.#isStarted) {
      throw new Error("Car has already started");
    } else {
      this.#isStarted = true;
    }
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    } else {
      this.#isStarted = false;
    }
  }

  fillUpGasTank(num) {
    if (typeof num !== "number" || !Number.isInteger(num) || num < 0) {
      throw new Error("Invalid fuel amount");
    } else if (num + this.#currentFuelVolume > this.#maxFuelVolume) {
      throw new Error("Too much fuel");
    } else if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }

    this.#currentFuelVolume = num + this.#currentFuelVolume;
  }

  drive(speed, hours) {
    if (typeof speed !== "number" || !Number.isInteger(speed) || speed < 0) {
      throw new Error("Invalid speed");
    } else if (
      typeof hours !== "number" ||
      !Number.isInteger(hours) ||
      hours < 0
    ) {
      throw new Error("Invalid duration");
    } else if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    } else if (!this.#isStarted) {
      throw new Error("You have to start your car first");
      // needs to finish
    } else if (
      this.#fuelConsumption / ((speed * hours) / 100) >
      this.#currentFuelVolume
    ) {
      throw new Error("You don't have enough fuel");
    } else if (((speed * hours) / 100) * this.#damage > this.#health) {
      throw new Error("Your car won’t make it");
    }

    const neededFuel = this.#fuelConsumption / ((speed * hours) / 100);
    const neededHealth = ((speed * hours) / 100) * this.#damage;

    this.#currentFuelVolume = this.#currentFuelVolume - neededFuel;
    this.#health = this.#health - neededHealth;
    this.#mileage = this.#mileage + speed * hours;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    } else if (this.#currentFuelVolume < this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first");
    }

    this.#health = 100;
  }

  getFullAmount() {
    debugger;

    if (this.#currentFuelVolume === this.#maxFuelVolume) {
      return 0;
    }

    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
