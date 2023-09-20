export const size ={
  viz: {
    width: 600,
    height: 350,
  },
  margin: {
    left: 20,
    top: 0,
    right: 0,
    bottom: 25,
  },
  get totalWidth() {
    return this.viz.width - this.margin.left - this.margin.right;
  },
  get totalHeight() {
    return this.viz.height - this.margin.top - this.margin.bottom;
  }
}
