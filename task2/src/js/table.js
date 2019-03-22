import Api from './api';

export default function Table() {
  // метод рендера начального состояния игровой доски
  this.render = () => {
    // создаем массив от 0 до 15 с рандомным порядком расположении файлов
    this.state = [...Array(16).keys()].sort(() => 0.5 - Math.random());
    // устанавливаем кол-во перемещенйи по умолчанию 0
    this.step = 0;
    // this.state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13, 14, 15, 12];
    // создаем разметку и возвращаем ее
    let div = '<div class="gem-puzzle">';
    div +=
      '<table class="table-bordered" width="300px" height="300px" style="table-layout: fixed;">';
    div += '<tbody><tr>';
    for (let i = 0; i < 16; i++) {
      if (i !== 0 && i % 4 === 0) div += '</tr><tr>';
      div += `<td class="text-center p-3${this.state[i] === 0 ? ' table-active' : ''}">
      ${this.state[i] === 0 ? '' : this.state[i]}</td>`;
    }
    div += '</tr></tbody></table>';
    div += '<div class="d-flex justify-content-center">';
    div += '<button class="btn btn-danger" id="restart" style="margin-top: 10px;">Restart</button>';
    div += '</div></div>';
    return div;
  };

  // метод увеличения кол-ва перемещений
  this.increaseStep = () => {
    this.step++;
  };

  // метод определения возможности перемещения ячейки
  this.isCellMove = (event, cellEmpty) => {
    // находим положение ячейки на которую щелкаем внутри строки
    let index = [...event.parentElement.children].indexOf(event);
    if (
      event.nextSibling === cellEmpty ||
      event.previousSibling === cellEmpty ||
      (event.parentNode.previousSibling !== null &&
        event.parentNode.previousSibling.childNodes[index] === cellEmpty) ||
      (event.parentNode.nextSibling !== null &&
        event.parentNode.nextSibling.childNodes[index] === cellEmpty)
    ) {
      return true;
    }
    return false;
  };

  // метод передвижения ячеек по таблице
  this.cellMove = (event, cellEmpty) => {
    // присваиваем пустой ячейке значение той ячейки на которую мы кликнули
    cellEmpty.innerHTML = event.innerHTML;
    // удаляем с некогда пустой ячейки класс table-active
    cellEmpty.classList.remove('table-active');
    // присваиваем той ячейки на которую мы кликнули пустое значение
    event.innerHTML = '';
    // присваиваем той ячейки на которую мы кликнули класс table-active
    event.classList.add('table-active');
  };

  // обновление состояния таблицы
  this.updateState = () => {
    // находим ячейки чтобы иметь текущее состояние порядка элементов
    const cells = document.querySelectorAll('.p-3');
    // обнуляем старый порядок
    this.state = [];
    // обновляем порядок элементов на новый
    for (let j = 0; j < cells.length; j++) {
      const item = cells[j].textContent ? parseInt(cells[j].textContent) : '';
      this.state.push(item);
    }
    return this.state;
  };

  // проверяем состояние игры
  this.checkGame = callback => {
    //  выставляем эталонное состояние доски, при котором игра должна быть завершена
    const winGame = [...Array(16).keys()].splice(1).concat('');
    // получим текущее состояние таблицы
    const currentGame = this.state;
    // Проверяем на идентичность эталонное состояние и то состояние которое мы имеем сейчас
    // если они равны останавливаем игру и предагаем начать все заново
    if (Api.arraysEqual(winGame, currentGame)) {
      const message = `Победа. Вы сделали ${
        this.step
      } перемещений. Нажмите ОК чтобы начать заново или Отмена чтобы завершить`;
      if (confirm(message)) {
        callback();
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  // метод получения состояния таблицы
  this.getState = () => {
    return this.state;
  };
}
