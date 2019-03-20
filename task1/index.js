const { performance } = require('perf_hooks');

const correct1 = '{((a+b)*3) + a + c*[2-x]}*x';
const correct2 = '()[{a}+c]';
const incorrect1 = '(a+{b) *c}';
const incorrect2 = '([a+b]*c}';

function solution1(text) {
  const arr = [];
  for (const x of text) {
    // заполняем массив если есть открывающие
    if (x === '(') arr.push(1);
    if (x === '[') arr.push(2);
    if (x === '{') arr.push(3);
    // завершаем работу программы если нарушен порядок или нет открывающих
    if (x === '}' && arr[arr.length - 1] !== 3) return false;
    if (x === ']' && arr[arr.length - 1] !== 2) return false;
    if (x === ')' && arr[arr.length - 1] !== 1) return false;
    // если предыдущие условия не выполнились и есть закрывающие очищаем массив
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

let t0, t1, res;

t0 = performance.now();
res = solution1(correct1);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution2(correct1);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution1(correct2);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution2(correct2);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution1(incorrect1);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution2(incorrect1);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution1(incorrect2);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);

t0 = performance.now();
res = solution2(incorrect2);
t1 = performance.now();
console.log(`${res} ${t1 - t0}`);
