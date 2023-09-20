export class Range {
  constructor(data) {
    this.data = data;
  }

  get(param) {
    const parameters = new Set();

    let all = Object.values(this.data);

    for (let array of all) {
      for (let item of array) {
        parameters.add(item[param]);
      }
    }

    return Array.from(parameters);
  }
}