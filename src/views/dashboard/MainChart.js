import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { getPaiementSchoolChart } from '../../services/MainControllerApi'
import { toast } from 'react-toastify'
import { CSpinner } from '@coreui/react'

const MainChart = ({ecole_id, headers}) => {
  const chartRef = useRef(null)
  let dataCharts = []
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPaiements().then(() => setLoading(false)) 
  }, [])

  async function getPaiements() {
    await getPaiementSchoolChart(ecole_id, headers).then((res) => {
      res.filter(p => dataCharts.push(p.montant))
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  return (
    <>
      {loading ? <CSpinner color='primary' /> :
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier'],
          datasets: [
            {
              label: 'Paiement',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: dataCharts,
              fill: true,
            }
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 1000000,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 6,
                stepSize: Math.ceil(1000000 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />}
    </>
  )
}

export default MainChart
