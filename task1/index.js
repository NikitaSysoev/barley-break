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
    if(Object.keys(config).includes(x)){
      arr.unshift(x);
    }
    if(Object.values(config).includes(x) && config[arr[0]] === x){
      arr.shift();
    }
  }
  return !arr.length;
}

console.log(solution1(correct1));
console.log(solution1(correct2));
console.log(solution1(incorrect1));
console.log(solution1(incorrect2));
