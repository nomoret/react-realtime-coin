import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./components/chart";

const styles = (theme: any) => ({
  "chart-container": {
    height: 400,
  },
});

interface IApp {
  theme: any;
  classes: any;
}

interface ILineChartData {
  labels: Array<String>;
  datasets: Array<any>;
}

const App = (props: IApp) => {
  const [lineChartData, setLineChartData] = useState<ILineChartData>({
    labels: [],
    datasets: [
      {
        type: "line",
        label: "BTC-USD",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: props.theme.palette.primary.main,
        pointBackgroundColor: props.theme.palette.secondary.main,
        pointBorderColor: props.theme.palette.secondary.main,
        borderWidth: "2",
        lineTension: 0.45,
        data: [],
      },
    ],
  });

  const [lineChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
      ],
    },
  });

  useEffect(() => {
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"],
        },
      ],
    };

    const ws = new WebSocket("wss://ws-feed.gdax.com");

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (e) => {
      const value: any = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      setLineChartData((prevLineChartData) => {
        const oldBtcDataSet = prevLineChartData.datasets[0];
        const newBtcDataSet: any = { ...oldBtcDataSet };
        newBtcDataSet.data.push(value.price);

        const updateLabel = prevLineChartData.labels.concat(
          new Date().toLocaleTimeString()
        );

        const newChartData = {
          ...prevLineChartData,
          datasets: [newBtcDataSet],
          labels: updateLabel,
        };
        return newChartData;
      });
    };

    return () => {
      console.log("close");
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>실시간 가격 현황</h1>
      <div className={props.classes["chart-container"]}>
        <Chart data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(App);
