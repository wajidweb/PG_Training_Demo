'use client'

import React, { useEffect, useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Download, 
  RefreshCcw, 
  Calendar,
  Building,
  Tag,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchEnquiries } from '@/lib/api'
import { cn } from '@/lib/utils'

interface Enquiry {
  _id: string
  name: string
  email: string
  org: string
  category: string
  message: string
  createdAt: string
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const itemsPerPage = 10

  const loadEnquiries = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchEnquiries()
      setEnquiries(data)
      setCurrentPage(1) // Reset on refresh
    } catch (err) {
      setError('Failed to load enquiries. Ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnquiries()
  }, [])

  const filteredEnquiries = enquiries.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage)
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleExportCSV = () => {
    if (enquiries.length === 0) return
    
    const headers = ['Name', 'Email', 'Organisation', 'Category', 'Message', 'Submitted At']
    const csvContent = [
      headers.join(','),
      ...filteredEnquiries.map(item => [
        `"${item.name.replace(/"/g, '""')}"`,
        `"${item.email.replace(/"/g, '""')}"`,
        `"${item.org.replace(/"/g, '""')}"`,
        `"${item.category.replace(/"/g, '""')}"`,
        `"${item.message.replace(/"/g, '""')}"`,
        new Date(item.createdAt).toLocaleString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Enquiries Database</h1>
          <p className="text-muted-foreground mt-1">View and manage contact requests, scoping reviews, and course enquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadEnquiries} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button 
            onClick={handleExportCSV} 
            disabled={loading || enquiries.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer border-2 border-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">TOTAL SUBMISSIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{enquiries.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">FILTERED RESULT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{filteredEnquiries.length}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">ACTIVE SERVICE</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-extrabold uppercase tracking-wide text-green-600">DB Status: Connected</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-[#E2E8F0]">
        <CardContent className="p-0">
          {/* Search bar */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email, organisation, or message..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>
          </div>

          {/* Table list */}
          {error && (
            <div className="p-6 flex flex-col items-center justify-center text-center text-red-600 gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-bold">{error}</p>
              <Button size="sm" variant="outline" onClick={loadEnquiries} className="mt-2">Try Again</Button>
            </div>
          )}

          {!error && loading && (
            <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
              <p className="text-xs text-muted-foreground">Loading submitted enquiries...</p>
            </div>
          )}

          {!error && !loading && filteredEnquiries.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#B89047]" />
              <p className="text-sm font-bold">No enquiries found</p>
              <p className="text-xs">Adjust your search parameters or submit a new enquiry.</p>
            </div>
          )}

          {!error && !loading && filteredEnquiries.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-muted/40 border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Name & Email</th>
                    <th className="p-4">Organisation</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Submitted At</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 text-xs sm:text-sm">
                  {paginatedEnquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0B1B3D]">{item.name}</div>
                        <div className="text-[11px] text-muted-foreground">{item.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-[#0B1B3D]">
                          <Building className="h-3.5 w-3.5 text-[#B89047] shrink-0" />
                          <span>{item.org}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-[#B89047]/10 text-[#B89047] border border-[#B89047]/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#B89047] shrink-0" />
                          <span>{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSelectedEnquiry(item)}
                          className="cursor-pointer text-[10px] font-bold uppercase tracking-wider h-8"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="p-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} submissions
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    size="sm"
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(i + 1)}
                    className="h-8 w-8 p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View modal detail overlay */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden border border-[#E2E8F0] shadow-2xl relative">
            <button 
              onClick={() => setSelectedEnquiry(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b pb-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PGT SUBMISSION DETAILS</span>
                <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">ENQUIRY FOR {selectedEnquiry.category.toUpperCase()}</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Full Name:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">{selectedEnquiry.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Email Address:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-[#B89047] hover:underline">{selectedEnquiry.email}</a>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Organisation:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">{selectedEnquiry.org}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Submitted At:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide block">Detailed Message:</span>
                  <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-4 rounded-xl text-xs sm:text-sm text-[#0B1B3D] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button onClick={() => setSelectedEnquiry(null)} className="bg-[#0B1B3D] text-white">Close Details</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
