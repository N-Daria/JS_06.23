function getDistance(x1, y1, x2, y2) {
  let distance = 0;

  if (arguments.length < 4) {
    throw new Error();
  }

  Array.from(arguments).forEach((element) => {
    if (!Number.isInteger(element) || element < -1000 || element > 1000) {
      throw new Error();
    }
  });

  distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  if (distance % 1 !== 0) {
    distance = +distance.toFixed(2);
  }

  return distance;
}

function switchPlaces(arr) {
  let newArr = null;
  let leftPart = [];
  let rightPart = [];
  let divider = 0;

  if (!arr || !Array.isArray(arr)) {
    throw new Error();
  }

  newArr = arr.slice();

  if (newArr.length <= 1) {
    return newArr;
  }

  if (newArr.length % 2 === 0) {
    divider = newArr.length / 2;

    leftPart = newArr.slice(0, divider);
    rightPart = newArr.slice(divider);
    newArr = rightPart.concat(leftPart);
  } else {
    divider = parseInt(newArr.length / 2) + 1;

    leftPart = newArr.slice(0, divider - 1);
    rightPart = newArr.slice(divider);
    newArr = rightPart.concat(divider).concat(leftPart);
  }

  return newArr;
}

function getDivisors(num) {
  let dividersArr = [];

  if (!num || !Number.isInteger(num)) {
    throw new Error();
  }

  for (let i = num; i > 0; i--) {
    if (num % i == 0) {
      dividersArr.push(i);
    }
  }

  return dividersArr;
}
