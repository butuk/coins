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
  //console.log(dataset);

  const coins = Object.keys(dataset);
  Object.values(dataset).forEach(coin => {
    coin.map(item => {
      const format = d3.timeParse('%m/%d/%Y');
      item['date'] = format(item['date']);
      item['24h_vol'] = Number(item['24h_vol']);
      item['market_cap'] = Number(item['market_cap']);
      item['price_usd'] = Number(item['price_usd']);
    })
  });
  const range = new Range(dataset);

  const dateScale = new Scale('linear', range.get('date'), 0, size.viz.width);
  const priceScale = new Scale('linear', range.get('price_usd'), size.viz.height, 0);

  renderViz(dataset['bitcoin'], dateScale, priceScale);

}).catch(error => {
  console.log(error);
})

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