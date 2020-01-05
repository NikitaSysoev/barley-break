const correct1 = '{((a+b)*3) + a + c*[2-x]}*x';
const correct2 = '()[{a}+c]';
const incorrect1 = '(a+{b) *c}';
const incorrect2 = '([a+b]*c}';

function solution1(text) {
  const arr = [];
  const config = {
    '{':'}',
    '(':')',
    '[':']'
  }
  for (const x of text) {
    if(config[x]){
      arr.push(x);
    }
    const lastElem = arr[arr.length-1];
    if(x === config[lastElem]){
      arr.pop();
    }
  }
  return !arr.length;
}

console.log(solution1(correct1));
console.log(solution1(correct2));
console.log(solution1(incorrect1));
console.log(solution1(incorrect2));
