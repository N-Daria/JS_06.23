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
      const newel = new StackElement(this.lastElement, elem);
      this.lastElement = newel;
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

class LinkedList {
  constructor() {
    this.list = [];
  }

  // добавляет элемент в конец связного списка
  append(elem) {}

  //  добавляет элемент в начало связного списка
  prepend(elem) {}

  // осуществляет поиск по элементам по заданному значению и возвращает найденный элемент (null если такого элемента нет) (можно использовать обычный цикл для итерации по элементам связного списка)
  find(elem) {}

  //  - возвращает новый массив, состоящий из элементов связного списка (пустой массив, если список пуст)  Можно использовать:
  // - цикл для итерации по элементам листа
  // - методы и свойства массива
  toArray() {}

  // Реализовать статические публичные методы:
  // fromIterable(iterable) - возвращает новый LinkedList, элементами которого служат элементы переданной итерируемой сущности. Если сущность не является итерируемой выкидывает ошибку. (Not iterable). (можно использовать цикл для итерации по элементам массива, из элементов которого нужно собрать Linked list. Для записи используем ваш метод .append)
  fromIterable(iterable) {}
}
