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
    if (x === ')' || x === ']' || x === '}') {
      arr.pop();
    }
  }
  // если программа не завершена и массив пустой значит порядок соблюден и незакрытых нет
  return arr.length === 0;
}

solution1(correct1);
solution1(correct2);
solution1(incorrect1);
solution1(incorrect2);
