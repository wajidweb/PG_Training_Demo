'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  RefreshCcw, 
  Loader2,
  AlertCircle,
  Calendar,
  CreditCard,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { fetchOrders } from '@/lib/api'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/pricing'

interface Order {
  _id: string
  orderNumber: string
  contact: {
    firstName: string
    lastName: string
    email: string
    organisation: string
    role?: string
    phone?: string
  }
  items: Array<{
    courseTitle: string
    courseCode: string
    participants: number
    finalPrice: number
    deliveryMethod: { label: string }
    selectedDate?: string
    addOns?: Array<{ name: string }>
  }>
  total: number
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Details Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadOrders = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchOrders()
      setOrders(data)
    } catch (err) {
      setError('Failed to load orders. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.contact.organisation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const openDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Order Management</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Track payments, enrolments, and customer details.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadOrders} 
          disabled={loading}
          className="cursor-pointer border-2 font-bold"
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <Card className="border-2 shadow-md overflow-hidden">
        <CardHeader className="bg-white border-b-2 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#223292] transition-colors" />
              <input
                type="text"
                placeholder="Search by order #, email, or institution..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223292]/20 focus:bg-white focus:border-[#223292] transition-all font-medium"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {filteredOrders.length} Total Orders
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-[#223292] animate-spin" />
              <p className="text-muted-foreground font-medium italic">Synchronizing orders...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
              <div className="bg-red-50 p-4 rounded-full text-red-500">
                <AlertCircle className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-foreground">{error}</p>
                <p className="text-muted-foreground max-w-sm">Unable to connect to the order database.</p>
              </div>
              <Button onClick={loadOrders} variant="outline" className="mt-2 border-2 font-bold">Try Again</Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="bg-slate-50 p-6 rounded-full border-2 border-dashed border-slate-200 text-slate-300">
                <CreditCard className="h-12 w-12" />
              </div>
              <p className="text-slate-400 font-bold tracking-tight text-lg">No orders found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b-2">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-r-2">Order #</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-r-2">Customer / Institution</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-r-2">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-r-2">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2">
                    {paginatedOrders.map((order) => (
                      <tr 
                        key={order._id} 
                        className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                        onClick={() => openDetails(order)}
                      >
                        <td className="px-6 py-4 border-r-2">
                          <span className="font-mono text-xs font-black text-[#223292] bg-blue-50 px-2 py-1 rounded border border-blue-100">
                            {order.orderNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900 text-sm">{order.contact.firstName} {order.contact.lastName}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                              <Building2 className="w-3 h-3" /> {order.contact.organisation}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 shadow-sm",
                            order.status === 'paid' ? "bg-green-50 text-green-700 border-green-200" : 
                            order.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-red-50 text-red-700 border-red-200"
                          )}>
                            {order.status === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {order.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2">
                          <span className="font-black text-sm text-gray-900">{formatPrice(order.total)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50/50 border-t-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-2 font-black h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="border-2 font-black h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl border-2 p-0 overflow-hidden bg-white">
          {selectedOrder && (
            <>
              <div className="bg-[#223292] p-8 text-white relative">
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-2 block">Purchase Record</span>
                    <DialogTitle className="text-3xl font-black text-white tracking-tighter">Order {selectedOrder.orderNumber}</DialogTitle>
                    <div className="mt-4 flex items-center gap-3">
                       <div className={cn(
                          "px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2",
                          selectedOrder.status === 'paid' ? "bg-green-500 border-white/20 text-white" : "bg-amber-400 border-white/20 text-amber-900"
                       )}>
                          {selectedOrder.status}
                       </div>
                       <span className="text-blue-100 font-bold text-sm">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              </div>

              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                {/* Section: Customer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Users className="w-4 h-4" /> Customer Information
                    </h4>
                    <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl space-y-3">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Full Name</p>
                        <p className="font-bold text-gray-900">{selectedOrder.contact.firstName} {selectedOrder.contact.lastName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Email Address</p>
                        <p className="font-bold text-gray-900">{selectedOrder.contact.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Building2 className="w-4 h-4" /> Professional Context
                    </h4>
                    <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl space-y-3">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Institution</p>
                        <p className="font-bold text-gray-900">{selectedOrder.contact.organisation}</p>
                      </div>
                      {selectedOrder.contact.role && (
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Position / Role</p>
                          <p className="font-bold text-gray-900">{selectedOrder.contact.role}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section: Items */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Enrolled Courses</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-sm hover:border-blue-100 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black text-[#223292] uppercase tracking-widest mb-1">{item.courseCode}</p>
                            <h5 className="font-black text-gray-900 text-lg leading-tight">{item.courseTitle}</h5>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-black text-gray-900">{formatPrice(item.finalPrice)}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Net Total</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap gap-4">
                           <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100">
                              <Calendar className="w-4 h-4 text-[#223292]" />
                              <span className="text-xs font-bold text-[#223292]">{item.selectedDate ? new Date(item.selectedDate.split('|')[0]).toLocaleDateString() : 'Self-Paced'}</span>
                           </div>
                           <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                              <Users className="w-4 h-4 text-slate-500" />
                              <span className="text-xs font-bold text-slate-700">{item.participants} Participant(s)</span>
                           </div>
                           <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                              <CreditCard className="w-4 h-4 text-slate-500" />
                              <span className="text-xs font-bold text-slate-700">{item.deliveryMethod.label}</span>
                           </div>
                        </div>

                        {item.addOns && item.addOns.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                             {item.addOns.map((addon, aIdx) => (
                               <span key={aIdx} className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-tighter">+ {addon.name}</span>
                             ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border-t-2 p-8 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Transaction Value</p>
                   <p className="text-3xl font-black text-gray-900">{formatPrice(selectedOrder.total)}</p>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#223292] hover:bg-[#1a2875] text-white font-black px-8 py-6 rounded-2xl shadow-xl shadow-blue-900/10 transition-all active:scale-95 cursor-pointer"
                >
                  Close Record
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
