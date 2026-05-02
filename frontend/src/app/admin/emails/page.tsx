'use client'

import React, { useEffect, useState } from 'react'
import { 
  Mail, 
  Search, 
  Download, 
  RefreshCcw, 
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchCampaignEmails } from '@/lib/api'
import { cn } from '@/lib/utils'

interface CampaignEmail {
  _id: string
  email: string
  campaignName: string
  source: string
  createdAt: string
}

export default function CampaignEmailsPage() {
  const [emails, setEmails] = useState<CampaignEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchByTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const loadEmails = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchCampaignEmails()
      setEmails(data)
      setCurrentPage(1) // Reset to first page on refresh
    } catch (err) {
      setError('Failed to load campaign emails. Ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmails()
  }, [])

  const filteredEmails = emails.filter(item => 
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.source.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage)
  const paginatedEmails = filteredEmails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleExportCSV = () => {
    if (emails.length === 0) return
    
    const headers = ['Email', 'Campaign', 'Source', 'Subscribed At']
    const csvContent = [
      headers.join(','),
      ...filteredEmails.map(item => [
        item.email,
        item.campaignName,
        item.source,
        new Date(item.createdAt).toLocaleString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `campaign_emails_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaign Emails</h1>
          <p className="text-muted-foreground mt-1">Manage and export collected user emails for your campaigns.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadEmails} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={handleExportCSV} 
            disabled={loading || emails.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer border-2 border-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border-2 shadow-md overflow-hidden">
        <CardHeader className="bg-white border-b-2 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by email, campaign or source..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchByTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Showing {paginatedEmails.length} of {filteredEmails.length} results
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-muted-foreground font-medium">Fetching subscribers...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
              <div className="bg-destructive/10 p-4 rounded-full text-destructive">
                <AlertCircle className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-foreground">{error}</p>
                <p className="text-muted-foreground max-w-sm">Please check if the backend server is running on port 5001.</p>
              </div>
              <Button onClick={loadEmails} variant="outline" className="mt-2 border-2">Try Again</Button>
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="bg-muted p-4 rounded-full">
                <Mail className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No subscribers found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b-2">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-r-2">Subscriber</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-r-2">Campaign</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-r-2">Source</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2">
                    {paginatedEmails.map((item) => (
                      <tr key={item._id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4 border-r-2">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border-2 border-slate-200">
                              {item.email.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="font-medium text-foreground">
                              {item.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2">
                          <div className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm text-slate-600 capitalize">
                              {item.campaignName.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold capitalize border-2 border-slate-200">
                            {item.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 bg-white border-t-2">
                  <div className="text-sm text-muted-foreground">
                    Page <span className="font-bold text-foreground">{currentPage}</span> of <span className="font-bold text-foreground">{totalPages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-2 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show current page, first, last, and neighbors
                        return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
                      })
                      .map((page, index, array) => {
                        const showEllipsis = index > 0 && page - array[index - 1] > 1
                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && <span className="text-muted-foreground">...</span>}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="icon-sm"
                              onClick={() => setCurrentPage(page)}
                              className={cn("border-2 cursor-pointer", currentPage === page ? "" : "hover:bg-muted")}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        )
                      })}
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-2 cursor-pointer"
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
    </div>
  )
}
