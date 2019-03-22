// подключаем bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// подключаем вспомогательный модуль
import Table from './js/table';

// метод запуска самой игры
function start() {
  // true - игра в работе, false - игра закончена
  let game = true;
  // создаем новую таблицу и рендерим ее
  const table = new Table();
  document.getElementById('app').innerHTML = table.render();
  // находим кнопку и добавляем на нее событие для рестарта игры
  const button = document.getElementById('restart');
  button.addEventListener('click', restart);
  // находим пустой элемент в таблице
  let cellEmpty = document.getElementsByClassName('table-active')[0];
  // находим все ячейки таблицы
  const cells = document.querySelectorAll('.p-3');
  // добавляем на каждую ячейку таблицы обработчик
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {
      // если кликаем на те ячейки, на которые необходимо кликать,
      // чтобы кубик двигался, то выполяем код
      if (table.isCellMove(this, cellEmpty)) {
        // увеличиваем кол-во перемещений на 1 для статистики
        table.increaseStep();
        // перемещаем кубик
        table.cellMove(this, cellEmpty);
        // обновляем пустой элемент в таблице на новый
        cellEmpty = document.getElementsByClassName('table-active')[0];
        // обновляем порядок элементов на новый
        table.updateState();
        // При каждом клике, если игра не завершена, проверяем соответвует ли состояние игры победе
        // ставим setTimeout чтобы в случае победы все визуальные изменения успели выполниться
        if (game) setTimeout(() => (game = table.checkGame(restart)), 0);
      }
    });
  }
}

//  метод перезапуска игры
function restart() {
  return start();
}

window.onload = function() {
  // как только вся страница загрузится и сработает событие onload запускаем игру
  start();
};
