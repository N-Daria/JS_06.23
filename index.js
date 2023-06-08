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
