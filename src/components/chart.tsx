import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  data: any;
  options: any;
}
const Chart: React.FC<Props> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default Chart;
