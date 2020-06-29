import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";

const styles = (theme) => ({
  "chart-container": {
    height: 400,
  },
});

const App = (props) => {
  const [lineChartData, setLineChartData] = useState({
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
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      const oldBtcDataSet = lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);

      const newChartData = {
        ...lineChartData,
        datasets: [newBtcDataSet],
        labels: lineChartData.labels.concat(new Date().toLocaleTimeString()),
      };

      console.log(newChartData);

      setLineChartData(newChartData);
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
