import { Component, OnInit, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-temperature-humidity",
  templateUrl: "./temperature-humidity.component.html",
  styleUrls: ["./temperature-humidity.component.scss"]
})
export class TemperatureHumidityComponent implements OnInit {
  constructor(public zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
      this.initChartTwo();
      this.initChartThree();
    });
  }

  initChartOne() {
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    let data = [];
    let price1 = 25,
      price2 = 27;
    let quantity = 31;
    for (var i = 0; i < 360; i++) {
      price1 += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random()
      );
      data.push({ date1: new Date(2018, 0, i), price1: price1 });
    }
    for (var i = 0; i < 360; i++) {
      price2 += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random()
      );
      data.push({ date2: new Date(2019, 0, i), price2: price2 });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

    valueAxis.renderer.minWidth = 60;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
    valueAxis2.renderer.minWidth = 60;
    valueAxis2.syncWithAxis = valueAxis;

    let series = chart.series.push(new am4charts.LineSeries());
    series.name = "2018";
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "price1";
    series.tooltipText = "{valueY.value}";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");
    //series.strokeWidth = 3;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "2019";
    series2.dataFields.dateX = "date2";
    series2.dataFields.valueY = "price2";
    series2.yAxis = valueAxis2;
    series2.xAxis = dateAxis2;
    series2.tooltipText = "{valueY.value}";
    series2.fill = am4core.color("#dfcc64");
    series2.stroke = am4core.color("#dfcc64");
    //series2.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis2;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }

  initChartTwo() {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);
    chart.maskBullets = false;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

    xAxis.dataFields.category = "weekday";
    yAxis.dataFields.category = "hour";

    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 40;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;
    yAxis.renderer.minGridDistance = 30;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "weekday";
    series.dataFields.categoryY = "hour";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 3000;

    let bgColor = new am4core.InterfaceColorSet().getFor("background");

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = 0.2;
    columnTemplate.stroke = bgColor;
    columnTemplate.tooltipText =
      "{weekday}, {hour}: {value.workingValue.formatNumber('#.')}";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      min: am4core.color(bgColor),
      max: chart.colors.getIndex(0)
    });

    // heat legend
    let heatLegend = chart.bottomAxesContainer.createChild(
      am4charts.HeatLegend
    );
    heatLegend.width = am4core.percent(100);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // heat legend behavior
    series.columns.template.events.on("over", function(event) {
      handleHover(event.target);
    });

    series.columns.template.events.on("hit", function(event) {
      handleHover(event.target);
    });

    function handleHover(column) {
      if (!isNaN(column.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    series.columns.template.events.on("out", function(event) {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.data = [
      {
        hour: "12pm",
        weekday: "Sun",
        value: 2990
      },
      {
        hour: "1am",
        weekday: "Sun",
        value: 2520
      },
      {
        hour: "2am",
        weekday: "Sun",
        value: 2334
      },
      {
        hour: "3am",
        weekday: "Sun",
        value: 2230
      },
      {
        hour: "4am",
        weekday: "Sun",
        value: 2325
      },
      {
        hour: "5am",
        weekday: "Sun",
        value: 2019
      },
      {
        hour: "6am",
        weekday: "Sun",
        value: 2128
      },
      {
        hour: "7am",
        weekday: "Sun",
        value: 2246
      },
      {
        hour: "8am",
        weekday: "Sun",
        value: 2421
      },
      {
        hour: "9am",
        weekday: "Sun",
        value: 2788
      },
      {
        hour: "10am",
        weekday: "Sun",
        value: 2959
      },
      {
        hour: "11am",
        weekday: "Sun",
        value: 3018
      },
      {
        hour: "12am",
        weekday: "Sun",
        value: 3154
      },
      {
        hour: "1pm",
        weekday: "Sun",
        value: 3172
      },
      {
        hour: "2pm",
        weekday: "Sun",
        value: 3368
      },
      {
        hour: "3pm",
        weekday: "Sun",
        value: 3464
      },
      {
        hour: "4pm",
        weekday: "Sun",
        value: 3746
      },
      {
        hour: "5pm",
        weekday: "Sun",
        value: 3656
      },
      {
        hour: "6pm",
        weekday: "Sun",
        value: 3336
      },
      {
        hour: "7pm",
        weekday: "Sun",
        value: 3292
      },
      {
        hour: "8pm",
        weekday: "Sun",
        value: 3269
      },
      {
        hour: "9pm",
        weekday: "Sun",
        value: 3300
      },
      {
        hour: "10pm",
        weekday: "Sun",
        value: 3403
      },
      {
        hour: "11pm",
        weekday: "Sun",
        value: 3323
      },
      {
        hour: "12pm",
        weekday: "Mon",
        value: 3346
      },
      {
        hour: "1am",
        weekday: "Mon",
        value: 2725
      },
      {
        hour: "2am",
        weekday: "Mon",
        value: 3052
      },
      {
        hour: "3am",
        weekday: "Mon",
        value: 3876
      },
      {
        hour: "4am",
        weekday: "Mon",
        value: 4453
      },
      {
        hour: "5am",
        weekday: "Mon",
        value: 3972
      },
      {
        hour: "6am",
        weekday: "Mon",
        value: 4644
      },
      {
        hour: "7am",
        weekday: "Mon",
        value: 5715
      },
      {
        hour: "8am",
        weekday: "Mon",
        value: 7080
      },
      {
        hour: "9am",
        weekday: "Mon",
        value: 8022
      },
      {
        hour: "10am",
        weekday: "Mon",
        value: 8446
      },
      {
        hour: "11am",
        weekday: "Mon",
        value: 9313
      },
      {
        hour: "12am",
        weekday: "Mon",
        value: 9011
      },
      {
        hour: "1pm",
        weekday: "Mon",
        value: 8508
      },
      {
        hour: "2pm",
        weekday: "Mon",
        value: 8515
      },
      {
        hour: "3pm",
        weekday: "Mon",
        value: 8399
      },
      {
        hour: "4pm",
        weekday: "Mon",
        value: 8649
      },
      {
        hour: "5pm",
        weekday: "Mon",
        value: 7869
      },
      {
        hour: "6pm",
        weekday: "Mon",
        value: 6933
      },
      {
        hour: "7pm",
        weekday: "Mon",
        value: 5969
      },
      {
        hour: "8pm",
        weekday: "Mon",
        value: 5552
      },
      {
        hour: "9pm",
        weekday: "Mon",
        value: 5434
      },
      {
        hour: "10pm",
        weekday: "Mon",
        value: 5070
      },
      {
        hour: "11pm",
        weekday: "Mon",
        value: 4851
      },
      {
        hour: "12pm",
        weekday: "Tue",
        value: 4468
      },
      {
        hour: "1am",
        weekday: "Tue",
        value: 3306
      },
      {
        hour: "2am",
        weekday: "Tue",
        value: 3906
      },
      {
        hour: "3am",
        weekday: "Tue",
        value: 4413
      },
      {
        hour: "4am",
        weekday: "Tue",
        value: 4726
      },
      {
        hour: "5am",
        weekday: "Tue",
        value: 4584
      },
      {
        hour: "6am",
        weekday: "Tue",
        value: 5717
      },
      {
        hour: "7am",
        weekday: "Tue",
        value: 6504
      },
      {
        hour: "8am",
        weekday: "Tue",
        value: 8104
      },
      {
        hour: "9am",
        weekday: "Tue",
        value: 8813
      },
      {
        hour: "10am",
        weekday: "Tue",
        value: 9278
      },
      {
        hour: "11am",
        weekday: "Tue",
        value: 10425
      },
      {
        hour: "12am",
        weekday: "Tue",
        value: 10137
      },
      {
        hour: "1pm",
        weekday: "Tue",
        value: 9290
      },
      {
        hour: "2pm",
        weekday: "Tue",
        value: 9255
      },
      {
        hour: "3pm",
        weekday: "Tue",
        value: 9614
      },
      {
        hour: "4pm",
        weekday: "Tue",
        value: 9713
      },
      {
        hour: "5pm",
        weekday: "Tue",
        value: 9667
      },
      {
        hour: "6pm",
        weekday: "Tue",
        value: 8774
      },
      {
        hour: "7pm",
        weekday: "Tue",
        value: 8649
      },
      {
        hour: "8pm",
        weekday: "Tue",
        value: 9937
      },
      {
        hour: "9pm",
        weekday: "Tue",
        value: 10286
      },
      {
        hour: "10pm",
        weekday: "Tue",
        value: 9175
      },
      {
        hour: "11pm",
        weekday: "Tue",
        value: 8581
      },
      {
        hour: "12pm",
        weekday: "Wed",
        value: 8145
      },
      {
        hour: "1am",
        weekday: "Wed",
        value: 7177
      },
      {
        hour: "2am",
        weekday: "Wed",
        value: 5657
      },
      {
        hour: "3am",
        weekday: "Wed",
        value: 6802
      },
      {
        hour: "4am",
        weekday: "Wed",
        value: 8159
      },
      {
        hour: "5am",
        weekday: "Wed",
        value: 8449
      },
      {
        hour: "6am",
        weekday: "Wed",
        value: 9453
      },
      {
        hour: "7am",
        weekday: "Wed",
        value: 9947
      },
      {
        hour: "8am",
        weekday: "Wed",
        value: 11471
      },
      {
        hour: "9am",
        weekday: "Wed",
        value: 12492
      },
      {
        hour: "10am",
        weekday: "Wed",
        value: 9388
      },
      {
        hour: "11am",
        weekday: "Wed",
        value: 9928
      },
      {
        hour: "12am",
        weekday: "Wed",
        value: 9644
      },
      {
        hour: "1pm",
        weekday: "Wed",
        value: 9034
      },
      {
        hour: "2pm",
        weekday: "Wed",
        value: 8964
      },
      {
        hour: "3pm",
        weekday: "Wed",
        value: 9069
      },
      {
        hour: "4pm",
        weekday: "Wed",
        value: 8898
      },
      {
        hour: "5pm",
        weekday: "Wed",
        value: 8322
      },
      {
        hour: "6pm",
        weekday: "Wed",
        value: 6909
      },
      {
        hour: "7pm",
        weekday: "Wed",
        value: 5810
      },
      {
        hour: "8pm",
        weekday: "Wed",
        value: 5151
      },
      {
        hour: "9pm",
        weekday: "Wed",
        value: 4911
      },
      {
        hour: "10pm",
        weekday: "Wed",
        value: 4487
      },
      {
        hour: "11pm",
        weekday: "Wed",
        value: 4118
      },
      {
        hour: "12pm",
        weekday: "Thu",
        value: 3689
      },
      {
        hour: "1am",
        weekday: "Thu",
        value: 3081
      },
      {
        hour: "2am",
        weekday: "Thu",
        value: 6525
      },
      {
        hour: "3am",
        weekday: "Thu",
        value: 6228
      },
      {
        hour: "4am",
        weekday: "Thu",
        value: 6917
      },
      {
        hour: "5am",
        weekday: "Thu",
        value: 6568
      },
      {
        hour: "6am",
        weekday: "Thu",
        value: 6405
      },
      {
        hour: "7am",
        weekday: "Thu",
        value: 8106
      },
      {
        hour: "8am",
        weekday: "Thu",
        value: 8542
      },
      {
        hour: "9am",
        weekday: "Thu",
        value: 8501
      },
      {
        hour: "10am",
        weekday: "Thu",
        value: 8802
      },
      {
        hour: "11am",
        weekday: "Thu",
        value: 9420
      },
      {
        hour: "12am",
        weekday: "Thu",
        value: 8966
      },
      {
        hour: "1pm",
        weekday: "Thu",
        value: 8135
      },
      {
        hour: "2pm",
        weekday: "Thu",
        value: 8224
      },
      {
        hour: "3pm",
        weekday: "Thu",
        value: 8387
      },
      {
        hour: "4pm",
        weekday: "Thu",
        value: 8218
      },
      {
        hour: "5pm",
        weekday: "Thu",
        value: 7641
      },
      {
        hour: "6pm",
        weekday: "Thu",
        value: 6469
      },
      {
        hour: "7pm",
        weekday: "Thu",
        value: 5441
      },
      {
        hour: "8pm",
        weekday: "Thu",
        value: 4952
      },
      {
        hour: "9pm",
        weekday: "Thu",
        value: 4643
      },
      {
        hour: "10pm",
        weekday: "Thu",
        value: 4393
      },
      {
        hour: "11pm",
        weekday: "Thu",
        value: 4017
      },
      {
        hour: "12pm",
        weekday: "Fri",
        value: 4022
      },
      {
        hour: "1am",
        weekday: "Fri",
        value: 3063
      },
      {
        hour: "2am",
        weekday: "Fri",
        value: 3638
      },
      {
        hour: "3am",
        weekday: "Fri",
        value: 3968
      },
      {
        hour: "4am",
        weekday: "Fri",
        value: 4070
      },
      {
        hour: "5am",
        weekday: "Fri",
        value: 4019
      },
      {
        hour: "6am",
        weekday: "Fri",
        value: 4548
      },
      {
        hour: "7am",
        weekday: "Fri",
        value: 5465
      },
      {
        hour: "8am",
        weekday: "Fri",
        value: 6909
      },
      {
        hour: "9am",
        weekday: "Fri",
        value: 7706
      },
      {
        hour: "10am",
        weekday: "Fri",
        value: 7867
      },
      {
        hour: "11am",
        weekday: "Fri",
        value: 8615
      },
      {
        hour: "12am",
        weekday: "Fri",
        value: 8218
      },
      {
        hour: "1pm",
        weekday: "Fri",
        value: 7604
      },
      {
        hour: "2pm",
        weekday: "Fri",
        value: 7429
      },
      {
        hour: "3pm",
        weekday: "Fri",
        value: 7488
      },
      {
        hour: "4pm",
        weekday: "Fri",
        value: 7493
      },
      {
        hour: "5pm",
        weekday: "Fri",
        value: 6998
      },
      {
        hour: "6pm",
        weekday: "Fri",
        value: 5941
      },
      {
        hour: "7pm",
        weekday: "Fri",
        value: 5068
      },
      {
        hour: "8pm",
        weekday: "Fri",
        value: 4636
      },
      {
        hour: "9pm",
        weekday: "Fri",
        value: 4241
      },
      {
        hour: "10pm",
        weekday: "Fri",
        value: 3858
      },
      {
        hour: "11pm",
        weekday: "Fri",
        value: 3833
      },
      {
        hour: "12pm",
        weekday: "Sat",
        value: 3503
      },
      {
        hour: "1am",
        weekday: "Sat",
        value: 2842
      },
      {
        hour: "2am",
        weekday: "Sat",
        value: 2808
      },
      {
        hour: "3am",
        weekday: "Sat",
        value: 2399
      },
      {
        hour: "4am",
        weekday: "Sat",
        value: 2280
      },
      {
        hour: "5am",
        weekday: "Sat",
        value: 2139
      },
      {
        hour: "6am",
        weekday: "Sat",
        value: 2527
      },
      {
        hour: "7am",
        weekday: "Sat",
        value: 2940
      },
      {
        hour: "8am",
        weekday: "Sat",
        value: 3066
      },
      {
        hour: "9am",
        weekday: "Sat",
        value: 3494
      },
      {
        hour: "10am",
        weekday: "Sat",
        value: 3287
      },
      {
        hour: "11am",
        weekday: "Sat",
        value: 3416
      },
      {
        hour: "12am",
        weekday: "Sat",
        value: 3432
      },
      {
        hour: "1pm",
        weekday: "Sat",
        value: 3523
      },
      {
        hour: "2pm",
        weekday: "Sat",
        value: 3542
      },
      {
        hour: "3pm",
        weekday: "Sat",
        value: 3347
      },
      {
        hour: "4pm",
        weekday: "Sat",
        value: 3292
      },
      {
        hour: "5pm",
        weekday: "Sat",
        value: 3416
      },
      {
        hour: "6pm",
        weekday: "Sat",
        value: 3131
      },
      {
        hour: "7pm",
        weekday: "Sat",
        value: 3057
      },
      {
        hour: "8pm",
        weekday: "Sat",
        value: 3227
      },
      {
        hour: "9pm",
        weekday: "Sat",
        value: 3060
      },
      {
        hour: "10pm",
        weekday: "Sat",
        value: 2855
      },
      {
        hour: "11pm",
        weekday: "Sat",
        value: 2625
      }
    ];
  }

  initChartThree() {
    let chart = am4core.create("chartdivthree", am4charts.RadarChart);
    chart.innerRadius = am4core.percent(30);
    chart.fontSize = 11;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    yAxis.renderer.minGridDistance = 5;

    xAxis.renderer.labels.template.location = 0.5;
    xAxis.renderer.labels.template.bent = true;
    xAxis.renderer.labels.template.radius = 5;

    xAxis.dataFields.category = "hour";
    yAxis.dataFields.category = "weekday";

    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 10;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;

    // this makes the y axis labels to be bent. By default y Axis labels are regular AxisLabels, so we replace them with AxisLabelCircular
    // and call fixPosition for them to be bent
    let yAxisLabel = new am4charts.AxisLabelCircular();
    yAxisLabel.bent = true;
    yAxisLabel.events.on("validated", function(event) {
      event.target.fixPosition(
        -90,
        am4core.math.getDistance({
          x: event.target.pixelX,
          y: event.target.pixelY
        }) - 5
      );
      event.target.dx = -event.target.pixelX;
      event.target.dy = -event.target.pixelY;
    });
    yAxis.renderer.labels.template = yAxisLabel;

    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = "hour";
    series.dataFields.categoryY = "weekday";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#ffffff");
    columnTemplate.tooltipText =
      "{weekday}, {hour}: {value.workingValue.formatNumber('#.')}";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);

    chart.seriesContainer.zIndex = -5;

    columnTemplate.hiddenState.properties.opacity = 0;

    // heat rule, this makes columns to change color depending on value
    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      min: am4core.color("#fffb77"),
      max: am4core.color("#fe131a")
    });

    // heat legend

    let heatLegend = chart.bottomAxesContainer.createChild(
      am4charts.HeatLegend
    );
    heatLegend.width = am4core.percent(100);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // heat legend behavior
    series.columns.template.events.on("over", function(event) {
      handleHover(event.target);
    });

    series.columns.template.events.on("hit", function(event) {
      handleHover(event.target);
    });

    function handleHover(column) {
      if (!isNaN(column.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    series.columns.template.events.on("out", function(event) {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.data = [
      {
        hour: "12pm",
        weekday: "Sunday",
        value: 2990
      },
      {
        hour: "1am",
        weekday: "Sunday",
        value: 2520
      },
      {
        hour: "2am",
        weekday: "Sunday",
        value: 2334
      },
      {
        hour: "3am",
        weekday: "Sunday",
        value: 2230
      },
      {
        hour: "4am",
        weekday: "Sunday",
        value: 2325
      },
      {
        hour: "5am",
        weekday: "Sunday",
        value: 2019
      },
      {
        hour: "6am",
        weekday: "Sunday",
        value: 2128
      },
      {
        hour: "7am",
        weekday: "Sunday",
        value: 2246
      },
      {
        hour: "8am",
        weekday: "Sunday",
        value: 2421
      },
      {
        hour: "9am",
        weekday: "Sunday",
        value: 2788
      },
      {
        hour: "10am",
        weekday: "Sunday",
        value: 2959
      },
      {
        hour: "11am",
        weekday: "Sunday",
        value: 3018
      },
      {
        hour: "12am",
        weekday: "Sunday",
        value: 3154
      },
      {
        hour: "1pm",
        weekday: "Sunday",
        value: 3172
      },
      {
        hour: "2pm",
        weekday: "Sunday",
        value: 3368
      },
      {
        hour: "3pm",
        weekday: "Sunday",
        value: 3464
      },
      {
        hour: "4pm",
        weekday: "Sunday",
        value: 3746
      },
      {
        hour: "5pm",
        weekday: "Sunday",
        value: 3656
      },
      {
        hour: "6pm",
        weekday: "Sunday",
        value: 3336
      },
      {
        hour: "7pm",
        weekday: "Sunday",
        value: 3292
      },
      {
        hour: "8pm",
        weekday: "Sunday",
        value: 3269
      },
      {
        hour: "9pm",
        weekday: "Sunday",
        value: 3300
      },
      {
        hour: "10pm",
        weekday: "Sunday",
        value: 3403
      },
      {
        hour: "11pm",
        weekday: "Sunday",
        value: 3323
      },
      {
        hour: "12pm",
        weekday: "Monday",
        value: 3346
      },
      {
        hour: "1am",
        weekday: "Monday",
        value: 2725
      },
      {
        hour: "2am",
        weekday: "Monday",
        value: 3052
      },
      {
        hour: "3am",
        weekday: "Monday",
        value: 3876
      },
      {
        hour: "4am",
        weekday: "Monday",
        value: 4453
      },
      {
        hour: "5am",
        weekday: "Monday",
        value: 3972
      },
      {
        hour: "6am",
        weekday: "Monday",
        value: 4644
      },
      {
        hour: "7am",
        weekday: "Monday",
        value: 5715
      },
      {
        hour: "8am",
        weekday: "Monday",
        value: 7080
      },
      {
        hour: "9am",
        weekday: "Monday",
        value: 8022
      },
      {
        hour: "10am",
        weekday: "Monday",
        value: 8446
      },
      {
        hour: "11am",
        weekday: "Monday",
        value: 9313
      },
      {
        hour: "12am",
        weekday: "Monday",
        value: 9011
      },
      {
        hour: "1pm",
        weekday: "Monday",
        value: 8508
      },
      {
        hour: "2pm",
        weekday: "Monday",
        value: 8515
      },
      {
        hour: "3pm",
        weekday: "Monday",
        value: 8399
      },
      {
        hour: "4pm",
        weekday: "Monday",
        value: 8649
      },
      {
        hour: "5pm",
        weekday: "Monday",
        value: 7869
      },
      {
        hour: "6pm",
        weekday: "Monday",
        value: 6933
      },
      {
        hour: "7pm",
        weekday: "Monday",
        value: 5969
      },
      {
        hour: "8pm",
        weekday: "Monday",
        value: 5552
      },
      {
        hour: "9pm",
        weekday: "Monday",
        value: 5434
      },
      {
        hour: "10pm",
        weekday: "Monday",
        value: 5070
      },
      {
        hour: "11pm",
        weekday: "Monday",
        value: 4851
      },
      {
        hour: "12pm",
        weekday: "Tuesday",
        value: 4468
      },
      {
        hour: "1am",
        weekday: "Tuesday",
        value: 3306
      },
      {
        hour: "2am",
        weekday: "Tuesday",
        value: 3906
      },
      {
        hour: "3am",
        weekday: "Tuesday",
        value: 4413
      },
      {
        hour: "4am",
        weekday: "Tuesday",
        value: 4726
      },
      {
        hour: "5am",
        weekday: "Tuesday",
        value: 4584
      },
      {
        hour: "6am",
        weekday: "Tuesday",
        value: 5717
      },
      {
        hour: "7am",
        weekday: "Tuesday",
        value: 6504
      },
      {
        hour: "8am",
        weekday: "Tuesday",
        value: 8104
      },
      {
        hour: "9am",
        weekday: "Tuesday",
        value: 8813
      },
      {
        hour: "10am",
        weekday: "Tuesday",
        value: 9278
      },
      {
        hour: "11am",
        weekday: "Tuesday",
        value: 10425
      },
      {
        hour: "12am",
        weekday: "Tuesday",
        value: 10137
      },
      {
        hour: "1pm",
        weekday: "Tuesday",
        value: 9290
      },
      {
        hour: "2pm",
        weekday: "Tuesday",
        value: 9255
      },
      {
        hour: "3pm",
        weekday: "Tuesday",
        value: 9614
      },
      {
        hour: "4pm",
        weekday: "Tuesday",
        value: 9713
      },
      {
        hour: "5pm",
        weekday: "Tuesday",
        value: 9667
      },
      {
        hour: "6pm",
        weekday: "Tuesday",
        value: 8774
      },
      {
        hour: "7pm",
        weekday: "Tuesday",
        value: 8649
      },
      {
        hour: "8pm",
        weekday: "Tuesday",
        value: 9937
      },
      {
        hour: "9pm",
        weekday: "Tuesday",
        value: 10286
      },
      {
        hour: "10pm",
        weekday: "Tuesday",
        value: 9175
      },
      {
        hour: "11pm",
        weekday: "Tuesday",
        value: 8581
      },
      {
        hour: "12pm",
        weekday: "Wednesday",
        value: 8145
      },
      {
        hour: "1am",
        weekday: "Wednesday",
        value: 7177
      },
      {
        hour: "2am",
        weekday: "Wednesday",
        value: 5657
      },
      {
        hour: "3am",
        weekday: "Wednesday",
        value: 6802
      },
      {
        hour: "4am",
        weekday: "Wednesday",
        value: 8159
      },
      {
        hour: "5am",
        weekday: "Wednesday",
        value: 8449
      },
      {
        hour: "6am",
        weekday: "Wednesday",
        value: 9453
      },
      {
        hour: "7am",
        weekday: "Wednesday",
        value: 9947
      },
      {
        hour: "8am",
        weekday: "Wednesday",
        value: 11471
      },
      {
        hour: "9am",
        weekday: "Wednesday",
        value: 12492
      },
      {
        hour: "10am",
        weekday: "Wednesday",
        value: 9388
      },
      {
        hour: "11am",
        weekday: "Wednesday",
        value: 9928
      },
      {
        hour: "12am",
        weekday: "Wednesday",
        value: 9644
      },
      {
        hour: "1pm",
        weekday: "Wednesday",
        value: 9034
      },
      {
        hour: "2pm",
        weekday: "Wednesday",
        value: 8964
      },
      {
        hour: "3pm",
        weekday: "Wednesday",
        value: 9069
      },
      {
        hour: "4pm",
        weekday: "Wednesday",
        value: 8898
      },
      {
        hour: "5pm",
        weekday: "Wednesday",
        value: 8322
      },
      {
        hour: "6pm",
        weekday: "Wednesday",
        value: 6909
      },
      {
        hour: "7pm",
        weekday: "Wednesday",
        value: 5810
      },
      {
        hour: "8pm",
        weekday: "Wednesday",
        value: 5151
      },
      {
        hour: "9pm",
        weekday: "Wednesday",
        value: 4911
      },
      {
        hour: "10pm",
        weekday: "Wednesday",
        value: 4487
      },
      {
        hour: "11pm",
        weekday: "Wednesday",
        value: 4118
      },
      {
        hour: "12pm",
        weekday: "Thursday",
        value: 3689
      },
      {
        hour: "1am",
        weekday: "Thursday",
        value: 3081
      },
      {
        hour: "2am",
        weekday: "Thursday",
        value: 6525
      },
      {
        hour: "3am",
        weekday: "Thursday",
        value: 6228
      },
      {
        hour: "4am",
        weekday: "Thursday",
        value: 6917
      },
      {
        hour: "5am",
        weekday: "Thursday",
        value: 6568
      },
      {
        hour: "6am",
        weekday: "Thursday",
        value: 6405
      },
      {
        hour: "7am",
        weekday: "Thursday",
        value: 8106
      },
      {
        hour: "8am",
        weekday: "Thursday",
        value: 8542
      },
      {
        hour: "9am",
        weekday: "Thursday",
        value: 8501
      },
      {
        hour: "10am",
        weekday: "Thursday",
        value: 8802
      },
      {
        hour: "11am",
        weekday: "Thursday",
        value: 9420
      },
      {
        hour: "12am",
        weekday: "Thursday",
        value: 8966
      },
      {
        hour: "1pm",
        weekday: "Thursday",
        value: 8135
      },
      {
        hour: "2pm",
        weekday: "Thursday",
        value: 8224
      },
      {
        hour: "3pm",
        weekday: "Thursday",
        value: 8387
      },
      {
        hour: "4pm",
        weekday: "Thursday",
        value: 8218
      },
      {
        hour: "5pm",
        weekday: "Thursday",
        value: 7641
      },
      {
        hour: "6pm",
        weekday: "Thursday",
        value: 6469
      },
      {
        hour: "7pm",
        weekday: "Thursday",
        value: 5441
      },
      {
        hour: "8pm",
        weekday: "Thursday",
        value: 4952
      },
      {
        hour: "9pm",
        weekday: "Thursday",
        value: 4643
      },
      {
        hour: "10pm",
        weekday: "Thursday",
        value: 4393
      },
      {
        hour: "11pm",
        weekday: "Thursday",
        value: 4017
      },
      {
        hour: "12pm",
        weekday: "Friday",
        value: 4022
      },
      {
        hour: "1am",
        weekday: "Friday",
        value: 3063
      },
      {
        hour: "2am",
        weekday: "Friday",
        value: 3638
      },
      {
        hour: "3am",
        weekday: "Friday",
        value: 3968
      },
      {
        hour: "4am",
        weekday: "Friday",
        value: 4070
      },
      {
        hour: "5am",
        weekday: "Friday",
        value: 4019
      },
      {
        hour: "6am",
        weekday: "Friday",
        value: 4548
      },
      {
        hour: "7am",
        weekday: "Friday",
        value: 5465
      },
      {
        hour: "8am",
        weekday: "Friday",
        value: 6909
      },
      {
        hour: "9am",
        weekday: "Friday",
        value: 7706
      },
      {
        hour: "10am",
        weekday: "Friday",
        value: 7867
      },
      {
        hour: "11am",
        weekday: "Friday",
        value: 8615
      },
      {
        hour: "12am",
        weekday: "Friday",
        value: 8218
      },
      {
        hour: "1pm",
        weekday: "Friday",
        value: 7604
      },
      {
        hour: "2pm",
        weekday: "Friday",
        value: 7429
      },
      {
        hour: "3pm",
        weekday: "Friday",
        value: 7488
      },
      {
        hour: "4pm",
        weekday: "Friday",
        value: 7493
      },
      {
        hour: "5pm",
        weekday: "Friday",
        value: 6998
      },
      {
        hour: "6pm",
        weekday: "Friday",
        value: 5941
      },
      {
        hour: "7pm",
        weekday: "Friday",
        value: 5068
      },
      {
        hour: "8pm",
        weekday: "Friday",
        value: 4636
      },
      {
        hour: "9pm",
        weekday: "Friday",
        value: 4241
      },
      {
        hour: "10pm",
        weekday: "Friday",
        value: 3858
      },
      {
        hour: "11pm",
        weekday: "Friday",
        value: 3833
      },
      {
        hour: "12pm",
        weekday: "Saturday",
        value: 3503
      },
      {
        hour: "1am",
        weekday: "Saturday",
        value: 2842
      },
      {
        hour: "2am",
        weekday: "Saturday",
        value: 2808
      },
      {
        hour: "3am",
        weekday: "Saturday",
        value: 2399
      },
      {
        hour: "4am",
        weekday: "Saturday",
        value: 2280
      },
      {
        hour: "5am",
        weekday: "Saturday",
        value: 2139
      },
      {
        hour: "6am",
        weekday: "Saturday",
        value: 2527
      },
      {
        hour: "7am",
        weekday: "Saturday",
        value: 2940
      },
      {
        hour: "8am",
        weekday: "Saturday",
        value: 3066
      },
      {
        hour: "9am",
        weekday: "Saturday",
        value: 3494
      },
      {
        hour: "10am",
        weekday: "Saturday",
        value: 3287
      },
      {
        hour: "11am",
        weekday: "Saturday",
        value: 3416
      },
      {
        hour: "12am",
        weekday: "Saturday",
        value: 3432
      },
      {
        hour: "1pm",
        weekday: "Saturday",
        value: 3523
      },
      {
        hour: "2pm",
        weekday: "Saturday",
        value: 3542
      },
      {
        hour: "3pm",
        weekday: "Saturday",
        value: 3347
      },
      {
        hour: "4pm",
        weekday: "Saturday",
        value: 3292
      },
      {
        hour: "5pm",
        weekday: "Saturday",
        value: 3416
      },
      {
        hour: "6pm",
        weekday: "Saturday",
        value: 3131
      },
      {
        hour: "7pm",
        weekday: "Saturday",
        value: 3057
      },
      {
        hour: "8pm",
        weekday: "Saturday",
        value: 3227
      },
      {
        hour: "9pm",
        weekday: "Saturday",
        value: 3060
      },
      {
        hour: "10pm",
        weekday: "Saturday",
        value: 2855
      },
      {
        hour: "11pm",
        weekday: "Saturday",
        value: 2625
      }
    ];
  }
}
