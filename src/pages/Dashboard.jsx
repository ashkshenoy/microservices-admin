import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { Package, ShoppingCart, AlertTriangle } from "lucide-react";

const ordersData = [
  { day: "Mon", orders: 20 },
  { day: "Tue", orders: 35 },
  { day: "Wed", orders: 28 },
  { day: "Thu", orders: 45 },
  { day: "Fri", orders: 30 },
  { day: "Sat", orders: 60 },
  { day: "Sun", orders: 40 },
];

const stockData = [
  { name: "Item A", stock: 12 },
  { name: "Item B", stock: 5 },
  { name: "Item C", stock: 8 },
  { name: "Item D", stock: 15 },
  { name: "Item E", stock: 3 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* TOP CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="text-muted-foreground" size={22} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">128</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Orders Today
            </CardTitle>
            <ShoppingCart className="text-muted-foreground" size={22} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">54</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="text-red-600" size={22} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">12</p>
          </CardContent>
        </Card>

      </div>

      {/* CHARTS */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersData}>
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stock Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockData}>
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#ef4444" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* RECENT ORDERS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Table component will come next.
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
