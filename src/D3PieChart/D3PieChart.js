import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function D3PieChart() {
  const svgRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget');
        const budgetData = response.data.myBudget.map(d => ({
          ...d,
          value: +d.value
        }));
        setData(budgetData);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 960;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#3464eb"]);

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const slices = g.append("g").attr("class", "slices");
    const labels = g.append("g").attr("class", "labels");
    const lines = g.append("g").attr("class", "lines");

    const slice = slices.selectAll("path.slice")
      .data(pie(data), d => d.data.label);

    slice.enter()
      .append("path")
      .attr("class", "slice")
      .style("fill", d => color(d.data.label))
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => arc(interpolate(t));
      });

    const text = labels.selectAll("text")
      .data(pie(data), d => d.data.label);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(d => d.data.label)
      .transition()
      .duration(1000)
      .attrTween("transform", function (d) {
        const interpolate = d3.interpolate(this._current || d, d);
        this._current = interpolate(0);
        return t => {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        };
      })
      .styleTween("text-anchor", function (d) {
        const interpolate = d3.interpolate(this._current || d, d);
        this._current = interpolate(0);
        return t => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
      });

    const polyline = lines.selectAll("polyline")
      .data(pie(data), d => d.data.label);

    polyline.enter()
      .append("polyline")
      .transition()
      .duration(1000)
      .attrTween("points", function (d) {
        const interpolate = d3.interpolate(this._current || d, d);
        this._current = interpolate(0);
        return t => {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

  }, [data]);

  return (
    <div className="d3">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3PieChart;
