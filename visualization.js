'use strict';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

import {SelectControl} from "./js/SelectControl.js";
import {Axis} from "./js/Axis.js";
import {Range} from "./js/Range.js";
import {Scale} from "./js/Scale.js";
import {Svg} from "./js/Svg.js";
import {SvgGroup} from "./js/SvgGroup.js";
import {Text} from "./js/Text.js";
import {size} from "./js/size.js";
const controls = document.querySelector('#controls');
const dataPath = 'data/coins.json';
const svg = new Svg(size.viz.width, size.viz.height).render('#container');
const viz = new SvgGroup('viz').render(svg, size.margin.left, size.margin.top);

new Text('Price, $', 'labelY').render(viz, 0, 0)
new Text('Time', 'labelX').render(viz,(size.width+size.margin.right), size.height);

d3.json(dataPath).then(dataset => {
  const data = filterData(dataset);

  const range = new Range(data);
  const dateScale = new Scale('time', range.get('date'), 0, size.width);
  const priceScale = new Scale('linear', range.get('price_usd'), size.height, 0);

  new Axis(dateScale).render(svg, size.margin.left, (size.margin.top + size.height), 'bottom', 4);
  new Axis(priceScale).render(svg, size.margin.left,  size.margin.top, 'left', 5);

  const coinSelect = new SelectControl(Object.keys(data)).render('#controls', formatSelectOption);
//-------
  const but = document.querySelector('#container');
  but.addEventListener('click', () => {
    console.log(coinSelect.value);
  })
//-------
  renderViz(data['bitcoin'], dateScale, priceScale);

}).catch(error => {
  console.log(error);
})

function filterData(dataset) {
  let newDataset = {};
  Object.keys(dataset).forEach(coin => {
    newDataset[coin] = dataset[coin]
      .filter(item => !(item['price_usd'] === null))
      .map(item => {
        item['date'] = d3.timeParse('%d/%m/%Y')(item['date']);
        item['24h_vol'] = Number(item['24h_vol']);
        item['market_cap'] = Number(item['market_cap']);
        item['price_usd'] = Number(item['price_usd']);
        return item;
      })
  })
  return newDataset;
}

function renderViz(data, x, y) {
  const line = d3.line()
    .x(d => x(d['date']))
    .y(d => y(d['price_usd']))

  viz.append('path')
    .classed('line', true)
    .attr('d', line(data));
}

function formatSelectOption(optText) {
  return optText.slice(0,1).toUpperCase() + optText.slice(1);
}