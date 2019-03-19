export default class Table {
  constructor() {
    // создаем массив из 16 рандомно расположенных элементов
    this.state = [...Array(16).keys()].sort(() => 0.5 - Math.random());
  }

  getStatus() {
    // возвращаем массив чтобы иметь порядок элементов
    return this.state;
  }

  render() {
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
    div += '</div><button class="btn btn-danger" id="restart">Restart</button>';
    return div;
  }
}
