'use strict';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import {Axis} from "./js/Axis.js";
import {Range} from "./js/Range.js";
import {Scale} from "./js/Scale.js";
import {Svg} from "./js/Svg.js";
import {SvgGroup} from "./js/SvgGroup.js";
import {Text} from "./js/Text.js";
import {size} from "./js/size.js";

const dataPath = 'data/coins.json';
const svg = new Svg(size.totalWidth, size.totalHeight).render('#container');
const viz = new SvgGroup('viz').render(svg, size.margin.left, size.margin.top);


d3.json(dataPath).then(dataset => {
  const data = filterData(dataset);

  const range = new Range(data);
  const dateScale = new Scale('time', range.get('date'), 0, size.viz.width);
  const priceScale = new Scale('linear', range.get('price_usd'), size.viz.height, 0);

  new Axis(dateScale).render(svg, size.margin.left, (size.margin.top), 'top', 11);
  new Axis(priceScale).render(svg, (size.margin.left + 100),  0, 'left', 11);

  renderViz(data, dateScale, priceScale);

}).catch(error => {
  console.log(error);
})

function filterData(dataset) {
  Object.values(dataset).forEach(coin => {
    coin
      .filter(item => !(item['price_usd'] === null))
      .map(item => {
        item['date'] = d3.timeParse('%m/%d/%Y')(item['date']);
        item['24h_vol'] = Number(item['24h_vol']);
        item['market_cap'] = Number(item['market_cap']);
        item['price_usd'] = Number(item['price_usd']);
      })
  })
  return dataset;
}

function renderViz(data, x, y) {
  const line = d3.line()
    .x(d => x(d['date']))
    .y(d => y(d['price_usd']))

  viz.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    .attr('d', line(data));
}

function filterData2(dataset) {
  dataset.forEach(item => {
    const format = d3.timeParse('%Y');
    item.year = format(item.year);
  })
  return dataset;
}

function renderViz2(data, x, y) {

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value))

  viz.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    .attr('d', line(data));
}

function compareDates(a, b) {
  if (a.date > b.date) return 1;
  if (a.date === b.date) return 0;
  if (a.date < b.date) return -1;
}