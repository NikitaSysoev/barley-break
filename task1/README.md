## Available Scripts

node index

##  Валидатор скобок

Дано алгебраическое выражение, использующее скобки только трех типов: (), [] {}. Необходимо написать функцию, которая получает на вход алгебраическое выражение в виде строки и валидирует расстановку скобок в выражении. Функция возвращает true, если все скобки расставлены верно и false, если в расстановке скобок есть ошибка. Открывающаяся скобка должна быть закрыта скобкой своего типа. Попробовать оценить получившийся алгоритм по скорости и по памяти. Демонстрация нескольких решений будет огромным плюсом.

Пример работы функции:<br>
const correct1 = ‘{((a+b)*3) + a + c*[2-x]}*x’;<br>
const correct2 = ‘()[{a}+c]’;<br>
const incorrect1 = ‘(a+{b) *c}’;<br>
const incorrect2 = ‘([a+b]*c}’;<br>

solution(correct1) === true;<br>
solution(correct2) === true;<br>
solution(incorrect1) === false;<br>
solution(incorrect2) === false;<br>