import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";

import * as L from 'leaflet';
import * as moment from 'moment';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  today = new Date();
  todaydate: string;

  momentdate;

  // leaflet
  leafletOptions = {
    layers: [
      L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }
      )
    ],
    zoom: 9,
    center: L.latLng(3.0738, 101.5183)
  };
  public markers = [];

  constructor(public zone: NgZone) {}

  ngOnInit() {
    this.todaydate = this.yearMonthDate();

    this.addMarker();

    setInterval(() => {
      this.momentdate = moment().format('MMMM Do YYYY, h:mm:ss a');
    }, 1000);
  }

  yearMonthDate() {
    let year = this.today.getFullYear();

    let month = this.today.getMonth();
    let monthstring = month < 10 ? "0" + month : month.toString();

    let date = this.today.getDate();
    let datestring = date < 10 ? "0" + date : date.toString();

    return (
      this.day[this.today.getDay()] +
      " " +
      year +
      "-" +
      monthstring +
      "-" +
      datestring
    );
  }

  initChartOne() {
    // create chart
    let chart = am4core.create("chartdivone", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
     */

    let axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    });

    /**
     * Axis for ranges
     */

    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    /**
     * Label
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50%";

    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = 50;

    hand.events.on("propertychanged", function(ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      axis2.invalidate();
    });

    setInterval(function() {
      let value = Math.round(Math.random() * 100);
      let animation = new am4core.Animation(
        hand,
        {
          property: "value",
          to: value
        },
        1000,
        am4core.ease.cubicOut
      ).start();
    }, 2000);
  }

  initChartTwo() {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "2009",
        income: 23.5,
        expenses: 21.1
      },
      {
        year: "2010",
        income: 26.2,
        expenses: 30.5
      },
      {
        year: "2011",
        income: 30.1,
        expenses: 34.9
      },
      {
        year: "2012",
        income: 29.5,
        expenses: 31.1
      },
      {
        year: "2013",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5"
      },
      {
        year: "2014",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)"
      }
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Power Consumption";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
      this.initChartTwo();
    });
  }

  addMarker() {
		let marker1 = L.marker(
			[2.940298, 101.47522],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-green.svg'
				})
			}
		);
    this.markers.push(marker1);
    let marker2 = L.marker(
			[3.196735, 101.431274],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-red.svg'
				})
			}
		);
    this.markers.push(marker2);
    let marker3 = L.marker(
			[3.126804, 101.862488],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-yellow.svg'
				})
			}
		);
		this.markers.push(marker3);
	}
}
