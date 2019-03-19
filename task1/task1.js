const correct1 = '{((a+b)*3) + a + c*[2-x]}*x';
const correct2 = '()[{a}+c]';
const incorrect1 = '(a+{b) *c}';
const incorrect2 = '([a+b]*c}';

function solution1(text) {
  const arr = [];
  for (const x of text) {
    // сразу завершаем работу программы если нарушен порядок
    if (x === '}' && arr[arr.length - 1] !== 3) return false;
    if (x === ']' && arr[arr.length - 1] !== 2) return false;
    if (x === ')' && arr[arr.length - 1] !== 1) return false;
    // заполняем массив если есть открывающие
    if (x === '(') arr.push(1);
    if (x === '[') arr.push(2);
    if (x === '{') arr.push(3);
    // очищаем массив если есть закрывающие
    if (x === ')' || x === ']' || x === '}') arr.pop();
  }
  // если программа не завершена и массив пустой значит порядок соблюден и незакрытых нет
  return !arr.length;
}

function solution2(text) {
  const arr = [],
    open = '([{',
    close = ')]}';
  for (const x of text) {
    let i = open.indexOf(x);
    if (i > -1) arr.push(close[i]);
    if (close.includes(x) && x != arr.pop()) return false;
  }
  return !arr.length;
}

function checkSolution1(alg) {
  console.log(`solution1(${alg})`);
  console.time(solution1(alg));
  solution1(alg);
  console.timeEnd(solution1(alg));
  console.log('');
}

function checkSolution2(alg) {
  console.log(`solution2(${alg})`);
  console.time(solution2(alg));
  solution2(alg);
  console.timeEnd(solution2(alg));
  console.log('');
}

checkSolution1(correct1);
checkSolution2(correct1);
checkSolution1(correct2);
checkSolution2(correct2);
checkSolution1(incorrect1);
checkSolution2(incorrect1);
checkSolution1(incorrect2);
checkSolution2(incorrect2);
