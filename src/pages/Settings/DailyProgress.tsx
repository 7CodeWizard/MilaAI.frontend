import { FC, useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Line, Radar } from 'react-chartjs-2'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      display: true,
      fullSize: true,
      align: 'center',
      text: 'Words gained last 7 days',
      position: 'bottom',
      font: {
        size: 14,
        family: 'Inter',
        color: '#475569'
      }
    }
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
        color: 'red'
      },
      border: {
        color: '#F1F5F9'
      }
    },
    y: {
      grid: {
        color: '#F1F5F9'
      },
      border: {
        display: false
      }
    }
  }
}

const labels = ['7/29', '7/30', '7/31', '8/1', '8/2', '8/3', '8/4']

const data = {
  labels,
  datasets: [
    {
      label: 'Correct',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: '#f97316',
      maxBarThickness: 30,
      borderRadius: 6,
      categoryPercentage: 0.4,
      barPercentage: 1.0
    }
  ]
}

const options2: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      display: true,
      fullSize: true,
      align: 'center',
      text: 'Sentences spoken last 7 days',
      position: 'bottom',
      font: {
        size: 14,
        family: 'Inter',
        color: '#475569'
      }
    }
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
        color: 'red'
      },
      border: {
        color: '#F1F5F9'
      }
    },
    y: {
      grid: {
        color: '#F1F5F9'
      },
      border: {
        display: false
      }
    }
  }
}

const data2 = {
  labels,
  datasets: [
    {
      label: 'Correct',
      data: labels.map(() => Math.floor(Math.random() * 10)),
      backgroundColor: '#f97316',
      maxBarThickness: 30,
      borderRadius: 6,
      categoryPercentage: 0.4,
      barPercentage: 1.0
    }
  ]
}

const DailyProgress: FC = () => {
  const [wordData, setWordData] = useState(data)
  const [sentenceData, setSentenceData] = useState(data2)
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  useEffect(() => {
    setWordData((wordData) => {
      return {
        ...wordData,
        datasets: wordData.datasets.map((data) => ({
          ...data,
          backgroundColor: classNames(
            themeColor === 'blue' ? '#3b82f6' : '',
            themeColor === 'pink' ? '#ec4899' : '',
            themeColor === 'orange' ? '#fb923c' : ''
          )
        }))
      }
    })

    setSentenceData((sentenceData) => {
      return {
        ...sentenceData,
        datasets: sentenceData.datasets.map((data) => ({
          ...data,
          backgroundColor: classNames(
            themeColor === 'blue' ? '#3b82f6' : '',
            themeColor === 'pink' ? '#ec4899' : '',
            themeColor === 'orange' ? '#fb923c' : ''
          )
        }))
      }
    })
  }, [themeColor])

  return (
    <>
      <div className="text-gray-600 border-b border-gray-300 border-dashed pb-2 w-full mt-10">
        Daily Progress
      </div>
      <div className="flex gap-40 justify-center mt-4">
        <Bar options={options} data={wordData} />
      </div>
      <div className="flex gap-40 justify-center mt-4">
        <Line options={options2} data={sentenceData} />
      </div>
    </>
  )
}

export default DailyProgress
