import { FC, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import api from '../../services/restApi'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const WordsLearnedChart: FC = () => {
  const [dates, setDates] = useState<string[]>([])
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
        labels: {
          font: {
            family: 'Poppins'
          }
        }
      },
      title: {
        display: true,
        fullSize: true,
        align: 'center',
        text: t('wordbank.new-words-learned'),
        position: 'left',
        padding: 10,
        font: {
          size: 16,
          family: 'Poppins',
          weight: 500
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
        },
        min: 0,
        ticks: {
          stepSize: 5
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    api.vocabulary.progress().then((res) => {
      setDates(Object.keys(res).map((d) => dayjs(d, 'DD/MM/YYYY').format('M/D')))
      setData(Object.values(res).map((t) => t.total_words))
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex gap-40 justify-center w-full h-[300px]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <h3 className="text-slate-400 text-xl">{t('loading')}</h3>
        </div>
      ) : (
        <Line
          options={options}
          data={{
            labels: dates,
            datasets: [
              {
                label: 'New words',
                data,
                pointRadius: 0,
                borderColor: '#CA8A04',
                tension: 0.4,
                fill: true,
                backgroundColor: (context: ScriptableContext<'line'>) => {
                  const ctx = context.chart.ctx
                  const gradient = ctx.createLinearGradient(0, 0, 0, 200)
                  gradient.addColorStop(0, '#CA8A0430')
                  gradient.addColorStop(1, '#CA8A0400')
                  return gradient
                }
              }
            ]
          }}
        />
      )}
    </div>
  )
}

export default WordsLearnedChart
