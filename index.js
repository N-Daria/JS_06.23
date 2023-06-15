class Stack {
  constructor(num) {
    if (!num) {
      this.maxLength = 10;
    } else if (!Number.isInteger(num) || num < 0) {
      throw new Error("Invalid limit value");
    } else {
      this.maxLength = num;
    }
    this.stack = [];
  }

  push(elem) {
    if (this.stack.length < this.maxLength) {
      this.stack.push(elem);
    } else {
      throw new Error("Limit exceeded");
    }
  }

  pop() {
    if (this.stack.length === 0) {
      throw new Error("Empty stack");
    }

    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1] || null;
  }

  isEmpty() {
    return this.stack.length > 0 ? false : true;
  }

  toArray() {
    return this.stack.length > 0 ? this.stack.slice() : [];
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
