import { Component, OnInit, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-health-protected-equipment",
  templateUrl: "./health-protected-equipment.component.html",
  styleUrls: ["./health-protected-equipment.component.scss"]
})
export class HealthProtectedEquipmentComponent implements OnInit {
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
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Kajang, Selangor",
        health: 40,
        protected: 55
      },
      {
        category: "Penang, Pulau Pinang",
        health: 30,
        protected: 78
      },
      {
        category: "Ipoh, Perak",
        health: 27,
        protected: 40
      },
      {
        category: "Rawang, Selangor",
        health: 50,
        protected: 33
      },
      {
        category: "Seremban, Negeri Sembilan",
        health: 45,
        protected: 23
      }
    ];

    createSeries("health", "Health");
    createSeries("protected", "Protected");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function(series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function(series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }

  initChartTwo() {
    let chart = am4core.create("chartdivtwo", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "kpj";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer"
      }
    ];

    pieSeries.alignLabels = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        kpj: "Kajang, Selangor",
        total: 21
      },
      {
        kpj: "Penang, Pulau Pinang",
        total: 23
      },
      {
        kpj: "Ipoh, Perak",
        total: 25
      },
      {
        kpj: "Rawang, Selangor",
        total: 44
      },
      {
        kpj: "Seremban, Negeri Sembilan",
        total: 30
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
