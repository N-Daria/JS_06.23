function makeDeepCopy(obj) {
  const copiedObj = {};

  if (
    !obj ||
    typeof obj !== "object" ||
    Array.isArray(obj) ||
    obj === null ||
    obj instanceof Set ||
    obj instanceof Map
  ) {
    throw new Error();
  }

  function makeCopy(replicated) {
    for (const key in replicated) {
      if (typeof replicated[key] === "object" && replicated !== null) {
        makeCopy(replicated[key]);
      } else {
        copiedObj[key] = replicated[key];
      }
    }
  }

  makeCopy(obj);

  return copiedObj;
}

function createIterable(from, to) {
  const arr = [];

  if (
    !from ||
    !to ||
    !Number.isInteger(from) ||
    !Number.isInteger(to) ||
    !Number.isInteger(from) ||
    to <= from
  ) {
    throw new Error();
  }

  for (i = from; i <= to; i++) {
    arr.push(i);
  }

  return arr;
}

function createProxy(obj) {
  if (!obj || typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    throw new Error();
  }

  let proxy = new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        target[prop].readAmount += 1;

        return target[prop];
      }
    },

    set(target, prop, val) {
      if (prop in target) {
        if (typeof val === typeof target[prop].value) {
          target[prop].value = val;

          return true;
        }

        return false;
      } else {
        target[prop] = { value: val, readAmount: 0 };

        return true;
      }
    },
  });

  return proxy;
}
