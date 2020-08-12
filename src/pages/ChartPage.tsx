import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Chart from "../components/Chart";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 400,
    },
  })
);

interface ILineChartData {
  labels: Array<String>;
  datasets: Array<any>;
}

interface Props {}

const ChartPage = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const [lineChartData, setLineChartData] = useState<ILineChartData>({
    labels: [],
    datasets: [
      {
        type: "line",
        label: "BTC-USD",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: theme.palette.primary.main,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: theme.palette.secondary.main,
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

  const { payload }: any = useSelector<any>((state) => state.currencies);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "CONNECT_SOCKET_REQUEST",
    });

    return () => {
      dispatch({
        type: "CLOSE_SOCKET_REQUEST",
      });
    };
  }, []);

  useEffect(() => {
    payload?.map((value: any) => {
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
    });
  }, [payload]);

  return (
    <div>
      <h1>실시간 가격 현황</h1>
      <div className={classes.container}>
        <Chart data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default ChartPage;
