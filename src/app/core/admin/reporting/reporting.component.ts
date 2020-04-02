import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart
  private chart1: am4charts.XYChart
  private chart2: am4charts.SlicedChart
  private chart3: am4charts.XYChart

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChart()
        this.initChart1()
        this.initChart2()
        this.initChart3()
      }
    )
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          this.chart.dispose()
        }
        if (this.chart1) {
          this.chart1.dispose()
        }
        if (this.chart2) {
          this.chart2.dispose()
        }
        if (this.chart3) {
          this.chart3.dispose()
        }
      }
    )
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [{
      "year": 2005,
      "income": 23.5,
      "expenses": 18.1
    }, {
      "year": 2006,
      "income": 26.2,
      "expenses": 22.8
    }, {
      "year": 2007,
      "income": 30.1,
      "expenses": 23.9
    }, {
      "year": 2008,
      "income": 29.5,
      "expenses": 25.1
    }, {
      "year": 2009,
      "income": 24.6,
      "expenses": 25
    }];

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "year";
      series.name = name;
      //series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;

    }

    createSeries("income", "Data 1");
    createSeries("expenses", "Data 2");

    this.chart = chart
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);

    // Add data
    chart.data = [{
      "ax": 1,
      "ay": 0.5,
      "bx": 1,
      "by": 2.2
    }, {
      "ax": 2,
      "ay": 1.3,
      "bx": 2,
      "by": 4.9
    }, {
      "ax": 3,
      "ay": 2.3,
      "bx": 3,
      "by": 5.1
    }, {
      "ax": 4,
      "ay": 2.8,
      "bx": 4,
      "by": 5.3
    }, {
      "ax": 5,
      "ay": 3.5,
      "bx": 5,
      "by": 6.1
    }, {
      "ax": 6,
      "ay": 5.1,
      "bx": 6,
      "by": 8.3
    }, {
      "ax": 7,
      "ay": 6.7,
      "bx": 7,
      "by": 10.5
    }, {
      "ax": 8,
      "ay": 8,
      "bx": 8,
      "by": 12.3
    }, {
      "ax": 9,
      "ay": 8.9,
      "bx": 9,
      "by": 14.5
    }, {
      "ax": 10,
      "ay": 9.7,
      "bx": 10,
      "by": 15
    }, {
      "ax": 11,
      "ay": 10.4,
      "bx": 11,
      "by": 18.8
    }, {
      "ax": 12,
      "ay": 11.7,
      "bx": 12,
      "by": 19
    }];

    // Create axes
    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = 'X Axis';
    valueAxisX.renderer.minGridDistance = 40;

    // Create value axis
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = 'Y Axis';

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "ay";
    lineSeries.dataFields.valueX = "ax";
    lineSeries.strokeOpacity = 0;

    let lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = "by";
    lineSeries2.dataFields.valueX = "bx";
    lineSeries2.strokeOpacity = 0;

    // Add a bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "middle";
    arrow.strokeWidth = 0;
    arrow.fill = chart.colors.getIndex(0);
    arrow.direction = "top";
    arrow.width = 12;
    arrow.height = 12;

    // Add a bullet
    let bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow2 = bullet2.createChild(am4core.Triangle);
    arrow2.horizontalCenter = "middle";
    arrow2.verticalCenter = "middle";
    arrow2.rotation = 180;
    arrow2.strokeWidth = 0;
    arrow2.fill = chart.colors.getIndex(3);
    arrow2.direction = "top";
    arrow2.width = 12;
    arrow2.height = 12;

    //add the trendlines
    let trend = chart.series.push(new am4charts.LineSeries());
    trend.dataFields.valueY = "value2";
    trend.dataFields.valueX = "value";
    trend.strokeWidth = 2
    trend.stroke = chart.colors.getIndex(0);
    trend.strokeOpacity = 0.7;
    trend.data = [
      { "value": 1, "value2": 2 },
      { "value": 12, "value2": 11 }
    ];

    let trend2 = chart.series.push(new am4charts.LineSeries());
    trend2.dataFields.valueY = "value2";
    trend2.dataFields.valueX = "value";
    trend2.strokeWidth = 2
    trend2.stroke = chart.colors.getIndex(3);
    trend2.strokeOpacity = 0.7;
    trend2.data = [
      { "value": 1, "value2": 1 },
      { "value": 12, "value2": 19 }
    ];

    //scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart1 = chart
  }

  initChart2() {
    let chart = am4core.create("chartdiv2", am4charts.SlicedChart);
    chart.paddingBottom = 30;
    chart.data = [{
      "name": "Data #1",
      "value": 600
    }, {
      "name": "Data #2",
      "value": 300
    }, {
      "name": "Data #3",
      "value": 200
    }, {
      "name": "Data #4",
      "value": 180
    }, {
      "name": "Data #5",
      "value": 50
    }, {
      "name": "Data #6",
      "value": 20
    }, {
      "name": "Data #7",
      "value": 280
    }];

    let series = chart.series.push(new am4charts.PyramidSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = true;
    series.valueIs = "height";

    this.chart2 = chart
  }

  initChart3() {
    let chart = am4core.create("chartdiv3", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 3025
    }, {
      "country": "Feb",
      "visits": 1882
    }, {
      "country": "Mac",
      "visits": 1809
    }, {
      "country": "Apr",
      "visits": 1322
    }, {
      "country": "Mei",
      "visits": 1122
    }, {
      "country": "Jun",
      "visits": 1114
    }, {
      "country": "Jul",
      "visits": 984
    }, {
      "country": "Ogs",
      "visits": 711
    }, {
      "country": "Sep",
      "visits": 665
    }, {
      "country": "Okt",
      "visits": 580
    }, {
      "country": "Nov",
      "visits": 443
    }, {
      "country": "Dis",
      "visits": 441
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    this.chart3 = chart
  }

}
