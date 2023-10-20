export class SelectControl {
  constructor(dataArr) {
    this.element = document.createElement('select');
    this.optionsArr = [];
    dataArr.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.innerText = item;
      this.optionsArr.push(option);
    })
    return this;
  }

  render(place, formatFunc) {
    document.querySelector(place).append(this.element);
    this.optionsArr.forEach(item => {
      item.innerText = formatFunc(item.innerText);
      this.element.append(item);
    })
    this.listen();
    return this.element;
  }

  listen() {
    this.element.addEventListener('change', () => {
      this.selectedValue = this.element.options[this.element.selectedIndex].value;
    })
  }

  get value() {
    return this.selectedValue;
  }

}