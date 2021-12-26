import 'chartjs-plugin-doughnutlabel';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {
    const graphdata = {
        datasets: [
            {
                data: [props.rep, props.maxReps-props.rep],
                backgroundColor: ["#3ec556", '#777777'],
                borderWidth: [
                    0, 0
                ]
            },
        ],
    };

    const doughnutOptions = {
        legend: {
            display: false,
        },
        cutoutPercentage: 83,
        animation: {
            animationRotate: true,
            duration: 2000
        },
        tooltips: {
            enabled: false
        },
        responsive: false,
        plugins: {
            doughnutlabel: {
                labels: [
                    {
                        text: `Set ${props.set}/${props.maxSet}`,
                        color: '#ffffff',
                        font: {
                            size: 14,
                        },
                    },
                    {
                        text: `Reps ${props.rep}/${props.maxReps}`,
                        color: '#ffffff',
                        font: {
                            size: 14,
                        },
                    },
                ],
            },
        },
    };

    return (
        <div>
            <div>
                <Doughnut
                    data={graphdata}
                    options={doughnutOptions} 
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}

export default DoughnutChart;