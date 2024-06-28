// import React from 'react';
// import {
//     LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell
// } from 'recharts';
// import styles from './Content.module.css';

// const data = [
//     { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
// ];

// const DashboardContent = () => {
//     return (
//         <div className={styles.dashboardContent}>
//             <div className={styles.card}>
//                 <h3>Total Page Views</h3>
//                 <LineChart width={600} height={300} data={data}>
//                     <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//                     <CartesianGrid stroke="#ccc" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                 </LineChart>
//             </div>
//             <div className={styles.card}>
//                 <h3>Unique Visitors</h3>
//                 <BarChart width={600} height={300} data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="uv" fill="#8884d8" />
//                 </BarChart>
//             </div>
//         </div>
//     );
// };

// export default DashboardContent;

import React from 'react';
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar
} from 'recharts';
import styles from './Content.module.css';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardContent = () => {
    return (
        <div className={styles.dashboardContent}>
            <section className={styles.summarySection}>
                <h2>Today's Summary</h2>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h3>Visitors</h3>
                        <p>50</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Leads</h3>
                        <p>20</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Investments</h3>
                        <p>10</p>
                    </div>
                </div>
            </section>

            <section className={styles.summarySection}>
                <h2>All Over Summary</h2>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h3>Visitors</h3>
                        <p>500</p> {/* Example of different data */}
                    </div>
                    <div className={styles.card}>
                        <h3>Leads</h3>
                        <p>200</p> {/* Example of different data */}
                    </div>
                    <div className={styles.card}>
                        <h3>Investments</h3>
                        <p>100</p> {/* Example of different data */}
                    </div>
                </div>
            </section>

            <div className={styles.charts}>
                <div className={styles.chart}>
                    <h3>Total Page Views</h3>
                    <LineChart width={400} height={300} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
                <div className={styles.chart}>
                    <h3>Unique Visitors</h3>
                    <BarChart width={400} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
