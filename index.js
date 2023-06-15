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
