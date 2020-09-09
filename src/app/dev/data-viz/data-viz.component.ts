import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import * as am4Core from '@amcharts/amcharts4/core';
import * as am4Charts from '@amcharts/amcharts4/charts';
import am4DarkTheme from '@amcharts/amcharts4/themes/dark';
import am4AnimatedThemes from '@amcharts/amcharts4/themes/animated';

@Component({
	selector: 'app-data-viz',
	templateUrl: './data-viz.component.html',
	styleUrls: ['./data-viz.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataVizComponent implements OnInit, AfterViewInit, OnDestroy {
	charts: (am4Charts.Chart | am4Core.Container)[] = [];

	constructor(@Inject(PLATFORM_ID) private platFormId) {}

	ngOnInit() {}

	ngAfterViewInit() {
		if (isPlatformServer(this.platFormId)) {
			console.log('amcharts do not work here');
		} else {
			setTimeout(() => {
				// add timeout so that tab changes first and then charts load
				this.createXYChart('chartDiv');
				this.createComplexCharts('chartDiv2');
			}, 500);
		}
	}

	createXYChart(divId: string) {
		// Create themes
		am4Core.useTheme(am4DarkTheme);
		am4Core.useTheme(am4AnimatedThemes);

		// Create chart
		const chart = am4Core.create(divId, am4Charts.XYChart);

		// Create data
		const data = [];
		let value = 50;
		for (let i = 0; i < 300; i++) {
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			date.setDate(i);
			value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
			data.push({ date, value });
		}
		chart.data = data;

		// Create axes
		const dateAxis = chart.xAxes.push(new am4Charts.DateAxis());
		dateAxis.renderer.minGridDistance = 60;

		const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis());

		// Create series
		const series = chart.series.push(new am4Charts.LineSeries());
		series.dataFields.valueY = 'value';
		series.dataFields.dateX = 'date';
		series.tooltipText = '{value}';
		series.tooltip.pointerOrientation = 'vertical';

		// Create cursor
		chart.cursor = new am4Charts.XYCursor();
		chart.cursor.snapToSeries = series;
		chart.cursor.xAxis = dateAxis;
		chart.cursor.yAxis = valueAxis;

		// Create scrollbar
		chart.scrollbarX = new am4Core.Scrollbar();

		this.charts.push(chart);
	}

	createComplexCharts(divId: string) {
		// Themes
		am4Core.useTheme(am4DarkTheme);
		am4Core.useTheme(am4AnimatedThemes);

		// Create chart instance
		const container = am4Core.create(divId, am4Core.Container);
		container.layout = 'grid';
		container.fixedWidthGrid = false;
		container.width = am4Core.percent(100);
		container.height = am4Core.percent(100);

		// Color set
		const colors = new am4Core.ColorSet();

		this.createLine(
			'AAPL (Price)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 57 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 27 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 24 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 59 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 33 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 46 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 20 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 59, opacity: 1 }
			],
			colors.getIndex(0),
			container
		);

		this.createColumn(
			'AAPL (Turnover)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 22 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 25 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 40 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 35 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 1 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 15 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 }
			],
			colors.getIndex(0),
			container
		);

		this.createPie(
			[
				{ category: 'Marketing', value: 501 },
				{ category: 'Research', value: 301 },
				{ category: 'Sales', value: 201 },
				{ category: 'HR', value: 165 }
			],
			colors.getIndex(0),
			container
		);

		this.createLine(
			'MSFT (Price)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 22 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 25 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 40 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 35 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 1 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 15 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 }
			],
			colors.getIndex(1),
			container
		);

		this.createColumn(
			'MSFT (Turnover)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 57 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 27 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 24 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 59 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 33 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 46 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 20 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 59, opacity: 1 }
			],
			colors.getIndex(1),
			container
		);

		this.createPie(
			[
				{ category: 'Marketing', value: 130 },
				{ category: 'Research', value: 450 },
				{ category: 'Sales', value: 400 },
				{ category: 'HR', value: 200 }
			],
			colors.getIndex(1),
			container
		);

		this.createLine(
			'AMZN (Price)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 16 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 62 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 55 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 34 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 28 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 32 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 30, opacity: 1 }
			],
			colors.getIndex(2),
			container
		);

		this.createColumn(
			'AMZN (Turnover)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 50 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 51 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 62 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 60 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 25 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 20 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 70 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 }
			],
			colors.getIndex(2),
			container
		);

		this.createPie(
			[
				{ category: 'Marketing', value: 220 },
				{ category: 'Research', value: 200 },
				{ category: 'Sales', value: 150 },
				{ category: 'HR', value: 125 }
			],
			colors.getIndex(2),
			container
		);

		this.createLine(
			'FB (Price)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 52 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 55 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 35 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 34 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 39 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 42 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 22 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 15, opacity: 1 }
			],
			colors.getIndex(3),
			container
		);

		this.createColumn(
			'FB (Turnover)',
			[
				{ date: new Date(2018, 0, 1, 8, 0, 0), value: 20 },
				{ date: new Date(2018, 0, 1, 9, 0, 0), value: 20 },
				{ date: new Date(2018, 0, 1, 10, 0, 0), value: 25 },
				{ date: new Date(2018, 0, 1, 11, 0, 0), value: 26 },
				{ date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
				{ date: new Date(2018, 0, 1, 13, 0, 0), value: 27 },
				{ date: new Date(2018, 0, 1, 14, 0, 0), value: 25 },
				{ date: new Date(2018, 0, 1, 15, 0, 0), value: 32 },
				{ date: new Date(2018, 0, 1, 16, 0, 0), value: 30, opacity: 1 }
			],
			colors.getIndex(3),
			container
		);

		this.createPie(
			[
				{ category: 'Marketing', value: 120 },
				{ category: 'Research', value: 150 },
				{ category: 'Sales', value: 125 },
				{ category: 'HR', value: 250 }
			],
			colors.getIndex(3),
			container
		);

		this.charts.push(container);
	}

	createLine(title: string, data: any, color: am4Core.Color, container: am4Core.Container) {
		const chart = container.createChild(am4Charts.XYChart);
		chart.width = am4Core.percent(45);
		chart.height = 70;

		chart.data = data;

		chart.titles.template.fontSize = 10;
		chart.titles.template.textAlign = 'start';
		chart.titles.template.isMeasured = false;
		chart.titles.create().text = title;

		chart.padding(20, 5, 2, 5);

		const dateAxis = chart.xAxes.push(new am4Charts.DateAxis());
		dateAxis.renderer.grid.template.disabled = true;
		dateAxis.renderer.labels.template.disabled = true;
		dateAxis.startLocation = 0.5;
		dateAxis.endLocation = 0.7;
		dateAxis.cursorTooltipEnabled = false;

		const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		chart.cursor = new am4Charts.XYCursor();
		chart.cursor.lineY.disabled = true;
		chart.cursor.behavior = 'none';

		const series = chart.series.push(new am4Charts.LineSeries());
		series.tooltipText = '{date}: [bold]{value}';
		series.dataFields.dateX = 'date';
		series.dataFields.valueY = 'value';
		series.tensionX = 0.8;
		series.strokeWidth = 2;
		series.stroke = color;

		// render data points as bullets
		const bullet = series.bullets.push(new am4Charts.CircleBullet());
		bullet.circle.opacity = 0;
		bullet.circle.fill = color;
		bullet.circle.propertyFields.opacity = 'opacity';
		bullet.circle.radius = 3;

		return chart;
	}

	createColumn(title: string, data: any, color: am4Core.Color, container: am4Core.Container) {
		const chart = container.createChild(am4Charts.XYChart);
		chart.width = am4Core.percent(45);
		chart.height = 70;

		chart.data = data;

		chart.titles.template.fontSize = 10;
		chart.titles.template.textAlign = 'start';
		chart.titles.template.isMeasured = false;
		chart.titles.create().text = title;

		chart.padding(20, 5, 2, 5);

		const dateAxis = chart.xAxes.push(new am4Charts.DateAxis());
		dateAxis.renderer.grid.template.disabled = true;
		dateAxis.renderer.labels.template.disabled = true;
		dateAxis.cursorTooltipEnabled = false;

		const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		chart.cursor = new am4Charts.XYCursor();
		chart.cursor.lineY.disabled = true;

		const series = chart.series.push(new am4Charts.ColumnSeries());
		series.tooltipText = '{date}: [bold]{value}';
		series.dataFields.dateX = 'date';
		series.dataFields.valueY = 'value';
		series.strokeWidth = 0;
		series.fillOpacity = 0.5;
		series.columns.template.propertyFields.fillOpacity = 'opacity';
		series.columns.template.fill = color;

		return chart;
	}

	createPie(data: any, color: am4Core.Color, container: am4Core.Container) {
		const chart = container.createChild(am4Charts.PieChart);
		chart.width = am4Core.percent(10);
		chart.height = 70;
		chart.padding(20, 0, 2, 0);

		chart.data = data;

		// Add and configure Series
		const pieSeries = chart.series.push(new am4Charts.PieSeries());
		pieSeries.dataFields.value = 'value';
		pieSeries.dataFields.category = 'category';
		pieSeries.labels.template.disabled = true;
		pieSeries.ticks.template.disabled = true;
		pieSeries.slices.template.fill = color;
		pieSeries.slices.template.adapter.add('fill', (fill: am4Core.Color, target) => {
			return fill.lighten(0.1 * target.dataItem.index);
		});
		pieSeries.slices.template.stroke = am4Core.color('#fff');

		return chart;
	}

	ngOnDestroy() {
		this.charts.map(chart => chart.dispose());
		this.charts = [];
	}
}

/**
 * Charts work only on browser so need to include platform id to prevent errors with universal
 * Both chart examples were pretty much copied rather than self-made
 * It stutters when changing the tab as the containers get destroyed and it takes time
 */
