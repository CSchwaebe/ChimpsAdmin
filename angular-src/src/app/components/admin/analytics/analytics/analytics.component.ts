import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/admin/order';
import { Product } from 'src/app/models/admin/product';
import { Big } from 'big.js';
import { hypenatePropsObject } from '@angular/animations/browser/src/render/shared';

interface Chart {
  data: Line[]
}

interface Line {
  name: String,
  series: Point[]
}

interface Point {
  name: Date,
  value: number,
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  barChartData;
 totalCost: number;
  /*
  public multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    }
  ];
  */

  orders: Order[];
  product_records: Record<string, number>[];
  grossSales: Big;
  netProfit: Big;
  chartData;


  

  // options for the chart
  showGridLines = false;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  xAxisLabel = 'Date';
  yAxisLabel = 'Sales';
  timeline = true;

  bar_chart_colorScheme = {
    domain: ['#5AA454']
  };

  // line, area
  autoScale = true;



  constructor(private OrderService: OrderService) {

  }

  async ngOnInit() {
    this.orders = await this.OrderService.getAll();
    this.salesByItem();
    this.totalSalesAndProfit();
    this.salesByDate();
    this.generateBarChart();

  }

  salesByItem() {
    this.product_records = [];

    for (let i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];
      order.products.forEach(product => {
        if (this.product_records[product.product._id])
          this.product_records[product.product._id] += product.quantity;
        else {
          this.product_records[product.product._id] = product.quantity;
        }
      })
    }

    console.log(this.product_records)
  }

  totalSalesAndProfit() {
    this.grossSales = new Big(0);
    let totalCost: number = 0;
    this.netProfit = new Big(0);

    for (let i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];
      this.grossSales = this.grossSales.plus(order.subtotal);
      let orderCost = 0;
      order.products.forEach(product => {
        let cost = +(new Big(product.product.cost).times(product.quantity)).toFixed(2);
        orderCost += cost;
      });
      totalCost += orderCost;
      //console.log(this.grossSales.toFixed(2))
      //console.log(totalCost)
 

    }

    this.netProfit = this.grossSales.minus(totalCost);
    console.log(this.grossSales.toFixed(2))
    console.log(this.netProfit.toFixed(2));

    let ratio = this.netProfit.div(this.grossSales).times(100).toFixed(0);

    let profitMargin = new Big(100).minus(ratio).toFixed(0);
    console.log()
    console.log("Profit Margin: " + profitMargin + '%')
  }

  salesByDate() {
    //sets up the chart data
    let chart: Chart = {
      data: [],
    }

    let line: Line = {
      name: "Daily Sales",
      series: [],
    }

    this.totalCost = 0;    

    for (let i = 0; i < this.orders.length; i++) {
      //more readable
      let order = this.orders[i];

      //For the Chart
      //If theres already an order on that date
      if (line.series.length) {
        for (let i = 0; i < line.series.length; i++) {
          if (line.series[i].name.getDate() === new Date(order.createdAt).getDate()) {
            line.series[i].value += order.subtotal;
            break;
          } else if (i === line.series.length-1) {
            let dailySale: Point = {
              name: new Date(order.createdAt),
              value: order.subtotal,
            }
            line.series.push(dailySale);
          }
        }
      } else {
        let x: Point = {
          name: new Date(order.createdAt),
          value: order.subtotal,
        }
        line.series.push(x);
      }
    }

    chart.data.push(line);
   
    this.chartData = chart.data;
  }

  calcProfitMargin() {

    for (let i = 0; i < this.orders.length; i++) {
      //more readable
      let order = this.orders[i];

      this.grossSales = this.grossSales.plus(order.subtotal);

      //Calculates the "Cost" of the order
      let orderCost = 0;
      order.products.forEach(product => {
        let cost = +(new Big(product.product.cost).times(product.quantity)).toFixed(2);
        orderCost += cost;
      });

      //Adds the order cost to the total cost
      this.totalCost += orderCost;
    }


    this.netProfit = new Big(0);
    this.netProfit = this.grossSales.minus(this.totalCost);
    console.log(this.grossSales.toFixed(2))
    console.log(this.netProfit.toFixed(2));

    let ratio = this.netProfit.div(this.grossSales).times(100).toFixed(0);

    let profitMargin = new Big(100).minus(ratio).toFixed(0);
    console.log()
    console.log("Profit Margin: " + profitMargin + '%')
  }

  generateBarChart() {

    let obj = [];

    this.totalCost = 0;    

    for (let i = 0; i < this.orders.length; i++) {
      //more readable
      let order = this.orders[i];
      //For the Chart
      //If theres already an order on that date
      if (obj.length) {
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].name.getDate() === new Date(order.createdAt).getDate()) {
            obj[i].value += order.subtotal;
            break;
          } else if (i === obj.length-1) {
            let dailySale: Point = {
              name: new Date(order.createdAt),
              value: order.subtotal,
            }
            obj.push(dailySale);
          }
        }
      } else {
        let x: Point = {
          name: new Date(order.createdAt),
          value: order.subtotal,
        }
        obj.push(x);
      }
    }

   console.log(obj)
   obj.sort((a,b) => {
     return a.name - b.name;
   })
   this.barChartData = obj;
  }
  

}
