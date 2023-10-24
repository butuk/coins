import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

export class Axis {
  constructor(scale) {
      this.scale = scale;
  }

  render(place, x, y, type, ticks) {
    /*
    Type is the side where the axis text will
    be relatively its line.
    If it will be on the right or left,
    the line will be vertical.
    If top or bottom – horizontal.
    */
    this.ticks = ticks;
    this.axisName = 'axis' + type.slice(0,1).toUpperCase() + type.slice(1,type.length);

    this.setScale(this.scale);

    this.axisElement = place.append('g')
      .attr('transform', `translate(${x}, ${y})`)
      .attr('class', `axis ${this.axisName}`)
      .call(this.axis);

    return this;
  }

  update(scale) {
    this.setScale(scale);
    this.axisElement.call(this.axis);
  }

  setScale(scale) {
    this.axis = d3[`${this.axisName}`](scale)
      .tickSize(0)
      .ticks(this.ticks)
  }
}