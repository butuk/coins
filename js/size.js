export const size ={
  viz: {
    width: 600,
    height: 400,
  },
  margin: {
    left: 100,
    top: 50,
    right: 20,
    bottom: 25,
  },
  get width() {
    return this.viz.width - this.margin.left - this.margin.right;
  },
  get height() {
    return this.viz.height - this.margin.top - this.margin.bottom;
  }
}
