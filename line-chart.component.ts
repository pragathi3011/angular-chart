import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, Chart } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {
  ngOnInit() {
    Chart.pluginService.register({
      afterUpdate: function (chart) {
        let datasets = chart.config.data.datasets;

        datasets.forEach(function (_dataset, index) {
          let meta = chart.getDatasetMeta(index);

          // grabbing the array with the data...
          let barLabelData = meta.controller._data;
          // console.log(meta.controller._data)

          var sun = new Image();
          sun.src = "https://i.imgur.com/yDYW1I7.png";

          var cloud = new Image();
          cloud.src = "https://i.imgur.com/DIbr9q1.png";

          if (!meta.hidden) {
            meta.data.forEach(function (segment, _index) {
              let model = segment._model;
              let weightValue = barLabelData[_index];
              model.pointStyle = weightValue.y > 205 ? sun : cloud;
            });
          }
        });
      },
    });
  }

  lineChartData: ChartDataSets[] = [
    {
      data: [
        { x: new Date("2020-04-29 1:11:34"), y: 210 },
        { x: new Date("2020-05-01 01:11:20"), y: 210 },
        { x: new Date("2020-05-01 05:12:35"), y: 200 },
        { x: new Date("2020-05-03"), y: 210 },
        { x: new Date("2020-05-04"), y: 215 },
        { x: new Date("2020-05-05"), y: 210 },
        { x: new Date("2020-05-06"), y: 210 },
      ],
      lineTension: 0,
      fill: false,
      label: "Weight",
    },
  ];

  lineChartOptions = {
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10,
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data.y, bar._model.x, bar._model.y - 10);
          });
        });
      },
    },

    tooltips: {
      enabled: false,
      // enabledOnSeries: undefined,
      // marker: {
      //   show: true,
      // },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            borderDash: [5],
            display: true,
          },
          ticks: {
            padding: 5,
            stepSize: 50,
            beginAtZero: true,
            max: 300,
            min: 100,
          },
        },
      ],
      xAxes: [
        {
          position: "right",
          gridLines: {
            display: true,
          },

          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "MM/DD", // This is the default
            },
          },
          ticks: {
            display: true,
            beginAtZero: true,
            autoSkip: true,
          },
        },
      ],
    },
    elements: {
      point: {
        radius: 8,
        hitRadius: 7,
        // hoverRadius: 10,
        // hoverBorderWidth: 1,
      },
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: "rgba(0,0,0,0.6)",
      borderWidth: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  ];

  lineChartType = "line";
}
