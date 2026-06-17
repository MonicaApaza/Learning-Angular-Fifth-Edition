function solution(number) {
  let sum = 0;

  for (let i = number - 1; i > 0; i--) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

function solution2(number) {
  const iterator = Array(number).keys();
  return iterator;
}

// var result = solution(10);
// console.log(result);
// var result2 = [...solution2(10)]
// var sum = result2.map(x => x % 3 === 0 || x % 5 ===0 ? x:0).reduce((a,b) =>a+b)
// console.log(result2);
// console.log(sum);

function solution3(number) {
  var array = [...Array(number).keys()];
  var result = array
    .map((y) => (y % 3 === 0 || y % 5 === 0 ? y : 0))
    .reduce((a, b) => a + b);
  return result;
}

function evenOrOdd(number) {
  if (number % 2 === 0) {
    return `${number} is even`;
  } else return `${number} is odd`;
}

function splitOddAndEven(n) {
  var array = [...String(n)];
  var result = [];
  var initialResult = array[0] % 2;
  var concatNum = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] % 2 == initialResult) concatNum += array[i];
    else {
      result.push(Number(concatNum));
      concatNum = array[i];
      initialResult = array[i] % 2;
    }
  }
  result.push(Number(concatNum));
  return result;
}

// var result = splitOddAndEven(123446724);
// console.log(result);

function isEven(digit) {
  return digit % 2 === 0;
}

function hasSameParity(stra, strb){
  numa = String(stra);
  numb = String(strb);
  return numa%2 ===numb%2;

}


function splitOddAndEven(number) {
  return [...String(number)]
    .reduce((groups, digit) => {

      const lastGroup = groups[groups.length - 1];

      if (
        !lastGroup ||
        !hasSameParity(lastGroup,digit)
        // isEven(Number(lastGroup[lastGroup.length - 1])) !==
        //   isEven(Number(digit))
      ) {
        groups.push(digit);
      } else {
        groups[groups.length - 1] += digit;
      }

      return groups;
    }, [])

    .map(Number);
}

// var result = splitOddAndEven(12672452);
//  console.log(result);

const digits = ["1", "2", "3"];
const result = digits.map(String);
console.log(result)

