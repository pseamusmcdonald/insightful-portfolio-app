import React, { useEffect, useRef } from 'react'

import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns';



Chart.defaults.font.family = 'DM Sans'

const LineChart = ({data}) => {

	console.log(data)
    
    const chartRef = useRef(null)

    useEffect(() => {

        const chartCtx = chartRef.current.getContext('2d')

		console.log(data)
            
        const lineChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: data,
                    fill: true,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        displayColors: false,
                        titleFont: {
                            size: 16,
                        },
                        bodyFont: {
                            size: 14,
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || ''
        
                                if (label) {
                                    label += ': '
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                                }
                                return label
                            }
                        },
                    },
                },
                tension: .5,
                scales: {
                    y: {
						beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                            },
                            padding: 10,
                        },
                        grid: {
                            drawBorder: false,
                        },
                    },
                    x: {
						type: 'timeseries',
						adapters: {
							date: {
							}
						},
						time: {
							format: "HH:mm",
							unit: 'minute',
							stepSize: 30,
						},
                        grid: {
                            display: false,
                        },
                    },
                }
            }
        }) 

        return () => {
            lineChart.destroy()
        }

    })

    Chart.register(...registerables)


    return (
        <canvas id='lineChart' ref={chartRef}/>
    )
}

export default LineChart