## task1 - Валидатор скобок

- npm run task1

Дано алгебраическое выражение, использующее скобки только трех типов: (), [] {}. Необходимо написать функцию, которая получает на вход алгебраическое выражение в виде строки и валидирует расстановку скобок в выражении. Функция возвращает true, если все скобки расставлены верно и false, если в расстановке скобок есть ошибка. Открывающаяся скобка должна быть закрыта скобкой своего типа. Попробовать оценить получившийся алгоритм по скорости и по памяти. Демонстрация нескольких решений будет огромным плюсом.

Пример работы функции:<br>
const correct1 = ‘{((a+b)_3) + a + c_[2-x]}*x’;<br>
const correct2 = ‘()[{a}+c]’;<br>
const incorrect1 = ‘(a+{b) *c}’;<br>
const incorrect2 = ‘([a+b]\*c}’;<br>

solution(correct1) === true;<br>
solution(correct2) === true;<br>
solution(incorrect1) === false;<br>
solution(incorrect2) === false;<br>

## task2 - Игра “Пятнашки”

- npm run task2

Игра в 15 или пятнашки — популярная головоломка, которая представляет собой набор одинаковых квадратных костяшек с нанесенными числами, заключённых в квадратную коробку. Длина стороны коробки в четыре раза больше длины стороны костяшек для набора из 15 элементов, соответственно в коробке остаётся незаполненным одно квадратное поле. Цель игры — перемещая костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав как можно меньше перемещений.

<div class="gem-puzzle">
  <table class="table-bordered">
    <tbody>
      <tr>
        <td class="p-3">8</td>
        <td class="p-3">11</td>
        <td class="p-3">7</td>
        <td class="p-3">12</td>
      </tr>
      <tr>
        <td class="p-3">3</td>
        <td class="p-3">15</td>
        <td class="p-3">6</td>
        <td class="p-3">10</td>
      </tr>
      <tr>
        <td class="p-3">2</td>
        <td class="p-3">5</td>
        <td class="p-3">13</td>
        <td class="p-3">14</td>
      </tr>
      <tr>
        <td class="p-3">9</td>
        <td class="p-3">1</td>
        <td class="p-3">4</td>
        <td class="p-3 table-active"></td>
      </tr>
    </tbody>
  </table>
</div>

Реализуйте эту игру внутри функции, учитывая следующие моменты:
Можно использовать как нативный JS, так и библиотеку react. Главное, чтобы вся логика генерации верстки (включая начальное представление) была описана на JS. Можно использовать Bootstrap.
Перемещение происходит по клику. Если номер, на котором был клик, находится рядом с пустой областью, то он перемещается на эту область. Если пустой области рядом нет, то ничего не происходит.
При перемещении числа, из текущей ячейки удаляется класс table-active и добавляется на ту, откуда происходит перемещение (та что становится пустой).
Для простоты порядок значений в таблице может быть предопределен.
