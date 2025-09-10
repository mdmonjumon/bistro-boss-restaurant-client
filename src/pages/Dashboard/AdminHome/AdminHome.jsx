import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaJediOrder } from "react-icons/fa6";
import { FaBook, FaUsers } from "react-icons/fa";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, Legend, Tooltip } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];



const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('admin-stats');
            return res.data
        }
    })


    const { data: barChartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('order-stats');
            return res.data;
        }
    })





    // custom shape for bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    // custom shape for pie chart

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = barChartData.map(data => {
        return { name: data.category, value: data.revenue }
    })



    return (
        <div className="mt-10">
            <h2 className="text-2xl">Hi, {user ? user?.displayName : ''}  Welcome Back</h2>

            <div className="flex justify-center">
                <div className="stats shadow my-10">
                    {/* revenue */}
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className="text-3xl"></FaDollarSign>
                        </div>
                        <div className="stat-title text-2xl">Revenue</div>
                        <div className="stat-value">{stats?.sumOfRevenue?.toFixed(2)}</div>
                    </div>

                    {/* users */}
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl"></FaUsers>
                        </div>
                        <div className="stat-title text-2xl">Users</div>
                        <div className="stat-value">{stats?.users}</div>
                    </div>

                    {/* menu items */}
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaBook className="text-3xl"></FaBook>
                        </div>
                        <div className="stat-title text-2xl">Menu Items</div>
                        <div className="stat-value">{stats?.menuItems}</div>
                    </div>

                    {/* orders */}
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaJediOrder className="text-3xl"></FaJediOrder>
                        </div>
                        <div className="stat-title text-2xl">Orders</div>
                        <div className="stat-value">{stats?.orders}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className="flex-1/2">
                    <BarChart
                        width={500}
                        height={400}
                        data={barChartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {barChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                <div className="flex flex-1/2 justify-center">

                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content="name" />
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;