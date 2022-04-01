import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [usersJ, setUsersJ] = useState([]);
  const [usersO, setUsersO] = useState([]);
  const [usersN, setUsersN] = useState([]);
  const [usersNN, setUsersNN] = useState([]);
  const [usersG, setUsersG] = useState([]);
  const getDAta = () => {
    axios("http://localhost:7000/users/sortchart")
      .then(async (res) => {
        // console.log(res.data);
        await setUsersJ(
          res.data.map((get) => {
            return get.userJ;
          })
        );
        await setUsersG(
          res.data.map((get) => {
            return get.userG;
          })
        );
        await setUsersN(
          res.data.map((get) => {
            return get.userN;
          })
        );
        await setUsersNN(
          res.data.map((get) => {
            return get.userNN;
          })
        );
        await setUsersO(
          res.data.map((get) => {
            return get.userO;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDAta();
  }, []);

  const lineChart = {
    series: [
      {
        name: "Jauhar",
        data: usersJ,
        offsetY: 0,
      },
      {
        name: "Gulshan",
        data: usersG,
        offsetY: 0,
      },
      {
        name: "Orangi",
        data: usersO,
        offsetY: 0,
      },
      {
        name: "Nazimabad",
        data: usersN,
        offsetY: 0,
      },
      {
        name: "North-Nazimabad",
        data: usersNN,
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
