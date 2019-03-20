// подключаем bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// подключаем вспомогательыне модули и css
import Api from './js/api';
import Table from './js/table';
import './main.css';

window.onload = function() {
  // как только вся страница загрузится и сработает событие onload запускаем игру
  start();

  //  метод перезапуска игры
  function restart() {
    return start();
  }

  // метод запуска самой игры
  function start() {
    let play = true;
    // устанавливаем количество перемещений и подсчитываем перемещения для статистики
    let step = 0;
    const increase = () => step++;
    // проверяем состояние игры
    function checkGame(arr) {
      //  выставляем эталонное состояние доски, при котором игра должна быть завершена
      const winGame = [...Array(16).keys()].splice(1).concat('');
      // Проверяем на идентичность эталонное состояние и то состояние которое мы имеем сейчас
      // если они равны останавливаем игру и предагаем начать все заново
      if (Api.arraysEqual(winGame, arr)) {
        const message = `Победа. Вы сделали ${step} перемещений. Нажмите ОК чтобы начать заново или Отмена чтобы завершить`;
        if (confirm(message)) {
          restart();
        } else {
          play = false;
        }
      } else {
        return false;
      }
    }
    // создаем новую таблицу и рендерим ее
    const table = new Table();
    document.getElementById('app').innerHTML = table.render();
    // текущее состояние поля
    let tableStatus = table.getStatus();
    // находим кнопку и добавляем на нее событие для рестарта игры
    const button = document.getElementById('restart');
    button.onclick = () => restart();
    // находим пустой элемент в таблице
    let cellEmpty = document.getElementsByClassName('table-active')[0];
    // находим все ячейки таблицы
    const cells = document.querySelectorAll('.p-3');
    // добавляем на каждую ячейку таблицы обработчик
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function() {
        // находим положение ячейки на которую щелкаем внутри строки
        let index = [...this.parentElement.children].indexOf(this);
        // если кликаем на те ячейки, на которые необходимо кликать,
        // чтобы кубик двигался,
        // то выполяем код
        if (
          this.nextSibling === cellEmpty ||
          this.previousSibling === cellEmpty ||
          (this.parentNode.previousSibling !== null &&
            this.parentNode.previousSibling.childNodes[index] === cellEmpty) ||
          (this.parentNode.nextSibling !== null &&
            this.parentNode.nextSibling.childNodes[index] === cellEmpty)
        ) {
          // увеличиваем кол-во перемещенйи на 1 для статистики
          increase();
          // присваиваем пустой ячейке значение той ячейки на которую мы кликнули
          cellEmpty.innerHTML = this.innerHTML;
          // удаляем с некогда пустой ячейки класс table-active
          cellEmpty.classList.remove('table-active');
          // присваиваем той ячейки на которую мы кликнули пустое значение
          this.innerHTML = '';
          // присваиваем той ячейки на которую мы кликнули класс table-active
          this.classList.add('table-active');
          // обновляем пустой элемент в таблице на новый
          cellEmpty = document.getElementsByClassName('table-active')[0];
          // снова находим ячейки чтобы иметь текущее состояние порядка элементов
          const cells = document.querySelectorAll('.p-3');
          // обнуляем старый порядок
          tableStatus = [];
          // обновляем порядок элементов на новый
          for (let j = 0; j < cells.length; j++) {
            const item = cells[j].textContent ? parseInt(cells[j].textContent) : '';
            tableStatus.push(item);
          }
          // При каждом клике, если игра не завершена, проверяем соответвует ли состояние игры победе
          // ставим setTimeout чтобы в случае победы все визуальные изменения успели выполниться
          if (play) setTimeout(() => checkGame(tableStatus), 0);
        }
      });
    }
  }
};
