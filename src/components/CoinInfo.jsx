import React, { useEffect } from 'react'
import { useState } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/api'
// import './CoinInfo.css';
import SelectButton from './SelectButton';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { chartDays } from "../config/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)

  const { currency, symbol } = CryptoState()

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff', // Sets primary color
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
           <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-4 md:p-10">
        {!historicData ? (
          <div className="w-full flex justify-center">
            <CircularProgress
              className="text-yellow-500"
              size={250}
              thickness={1}
            />
          </div>
        ) : (
          <>
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                      borderWidth: 2,
                      fill: true,
                      backgroundColor: "rgba(238, 188, 29, 0.1)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  elements: {
                    point: {
                      radius: 0,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: 'white',
                        font: {
                          size: 12,
                          family: 'Montserrat'
                        }
                      }
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleFont: {
                        size: 14,
                      },
                      bodyFont: {
                        size: 12,
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white',
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                          size: 8,
                          family: 'Montserrat'
                        }
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white',
                        font: {
                          size: 8,
                          family: 'Montserrat'
                        },
                        callback: function(value) {
                          return `${symbol}${value.toLocaleString()}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-5 justify-center w-full">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};


export default CoinInfo