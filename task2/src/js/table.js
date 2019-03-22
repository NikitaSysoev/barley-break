import Api from './api';

export default function Table() {
  // метод начального состояния игровой доски
  this.render = () => {
    // создаем массив от 0 до 15 с рандомным порядком расположении файлов
    this.state = [...Array(16).keys()].sort(() => 0.5 - Math.random());
    // создаем разметку и возвращаем ее
    let div = '<div class="gem-puzzle">';
    div += '<table class="table-bordered">';
    div += '<tbody><tr>';
    for (let i = 0; i < 16; i++) {
      if (i !== 0 && i % 4 === 0) div += '</tr><tr>';
      div += `<td class="p-3${this.state[i] === 0 ? ' table-active' : ''}">
      ${this.state[i] === 0 ? '' : this.state[i]}</td>`;
    }
    div += '</tr></tbody></table>';
    div += '<button class="btn btn-danger" id="restart">Restart</button></div>';
    return div;
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

  // проверяем состояние игры
  this.checkGame = (arr, step, callback) => {
    //  выставляем эталонное состояние доски, при котором игра должна быть завершена
    const winGame = [...Array(16).keys()].splice(1).concat('');
    // Проверяем на идентичность эталонное состояние и то состояние которое мы имеем сейчас
    // если они равны останавливаем игру и предагаем начать все заново
    if (Api.arraysEqual(winGame, arr)) {
      const message = `Победа. Вы сделали ${step} перемещений. Нажмите ОК чтобы начать заново или Отмена чтобы завершить`;
      if (confirm(message)) {
        callback();
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
}
