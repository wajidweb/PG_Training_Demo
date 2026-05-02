'use client'

import React from 'react'
import { 
  Users, 
  Mail, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { name: 'Total Courses', value: '24', icon: BookOpen, change: '+2', changeType: 'increase' },
  { name: 'Campaign Emails', value: '1,284', icon: Mail, change: '+12%', changeType: 'increase' },
  { name: 'Total Orders', value: '456', icon: Users, change: '+5%', changeType: 'increase' },
  { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '-0.4%', changeType: 'decrease' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Admin</h1>
        <p className="text-muted-foreground mt-1">Here is what's happening with Paragon Academy today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                )}
                <span className={stat.changeType === 'increase' ? 'text-green-500 text-xs font-medium' : 'text-destructive text-xs font-medium'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground text-xs ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Emails */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Recent Campaign Subscriptions</CardTitle>
            <button className="text-xs text-primary font-semibold hover:underline cursor-pointer">View All</button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { email: 'sarah.jones@example.com', date: '2 mins ago', source: 'Home Popup' },
                { email: 'mike.ross@pearson.edu', date: '45 mins ago', source: 'Footer' },
                { email: 'emma.watson@oxford.ac.uk', date: '3 hours ago', source: 'Home Popup' },
                { email: 'david.beck@ucl.ac.uk', date: '5 hours ago', source: 'Footer' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs">
                      {item.email.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">{item.email}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {item.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
            <button className="text-xs text-primary font-semibold hover:underline cursor-pointer">View All</button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { order: '#ORD-7281', status: 'Completed', amount: '$1,299', user: 'University of Malta' },
                { order: '#ORD-7280', status: 'Pending', amount: '$850', user: 'London School of Economics' },
                { order: '#ORD-7279', status: 'Completed', amount: '$2,400', user: 'Global Education Group' },
                { order: '#ORD-7278', status: 'Processing', amount: '$950', user: 'St. Mary\'s University' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      item.status === 'Completed' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {item.status === 'Completed' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.order}</p>
                      <p className="text-xs text-muted-foreground">{item.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{item.amount}</p>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      item.status === 'Completed' ? "text-green-600" : "text-orange-600"
                    )}>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
