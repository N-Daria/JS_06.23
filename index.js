Object.defineProperty(Array.prototype, "customFilter", {
  value: function (func, context) {
    let boundFunc = func;
    const result = [];

    if (
      !func ||
      typeof func !== "function" ||
      (context && context === null) ||
      (context && typeof context !== "object") ||
      Array.isArray(context)
    ) {
      throw new Error("Invalid argument");
    }

    if (context) {
      boundFunc = boundFunc.bind(context);
    }

    this.forEach((el, index, arr) => {
      if (boundFunc(el, index, arr)) {
        result.push(el);
      }
    });

    return result;
  },
});

function bubbleSort(arr) {
  let newArr = [];

  if (!arr || !Array.isArray(arr)) {
    throw new Error("Invalid argument");
  }

  const isInvalid = arr.some((el) => {
    return !isFinite(el) || typeof el !== "number";
  });

  if (isInvalid) {
    throw new Error("Invalid argument");
  }

  newArr = arr.slice();

  if (newArr.length < 1) {
    return newArr;
  }

  for (let i = newArr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (newArr[j] > newArr[j + 1]) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
      }
    }
  }

  return newArr;
}
