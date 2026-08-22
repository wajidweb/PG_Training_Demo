'use client'

import React, { useEffect, useState } from 'react'
import { 
  Users, 
  Search, 
  Download, 
  RefreshCcw, 
  Calendar,
  Mail,
  ShieldCheck,
  UserCheck,
  Loader2,
  AlertCircle,
  Eye,
  X,
  Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchUsers } from '@/lib/api'
import { cn } from '@/lib/utils'

interface RegisteredUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: 'user' | 'admin'
  purchasedResources: string[]
  downloadedFreeResources: string[]
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<RegisteredUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError('Failed to load users database. Ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers = users.filter(item => 
    `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExportCSV = () => {
    if (users.length === 0) return
    
    const headers = ['First Name', 'Last Name', 'Email', 'Role', 'Free Downloads Count', 'Premium Purchases Count', 'Registered At']
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(item => [
        `"${item.firstName.replace(/"/g, '""')}"`,
        `"${item.lastName.replace(/"/g, '""')}"`,
        `"${item.email.replace(/"/g, '""')}"`,
        `"${item.role.toUpperCase()}"`,
        item.downloadedFreeResources?.length || 0,
        item.purchasedResources?.length || 0,
        new Date(item.createdAt).toLocaleString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `members_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members Database</h1>
          <p className="text-muted-foreground mt-1">Monitor user registrations, continuous learning activities, and purchased premium toolkits.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadUsers} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button 
            onClick={handleExportCSV} 
            disabled={loading || users.length === 0}
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
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">TOTAL REGISTERED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{users.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">FILTERED MEMBERS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{filteredUsers.length}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">MEMBERS ACCESS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-extrabold uppercase tracking-wide text-green-600">Portal: Active</p>
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
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>
          </div>

          {/* Table list */}
          {error && (
            <div className="p-6 flex flex-col items-center justify-center text-center text-red-600 gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-bold">{error}</p>
              <Button size="sm" variant="outline" onClick={loadUsers} className="mt-2">Try Again</Button>
            </div>
          )}

          {!error && loading && (
            <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
              <p className="text-xs text-muted-foreground">Loading members roster...</p>
            </div>
          )}

          {!error && !loading && filteredUsers.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#B89047]" />
              <p className="text-sm font-bold">No registered users found</p>
              <p className="text-xs">Adjust your search parameters or wait for new registrations.</p>
            </div>
          )}

          {!error && !loading && filteredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-muted/40 border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Full Name & Email</th>
                    <th className="p-4">Access Role</th>
                    <th className="p-4">Activity Log</th>
                    <th className="p-4">Registered At</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 text-xs sm:text-sm">
                  {filteredUsers.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0B1B3D] capitalize">{item.firstName} {item.lastName}</div>
                        <div className="text-[11px] text-muted-foreground">{item.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                          item.role === 'admin' 
                            ? "bg-red-50 text-red-700 border-red-200" 
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        )}>
                          {item.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          <span>{item.role}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-[11px] text-[#0B1B3D] font-medium">
                          Premium Purchases: <span className="font-extrabold text-[#B89047]">{item.purchasedResources?.length || 0}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          Free Downloads: {item.downloadedFreeResources?.length || 0}
                        </div>
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
                          onClick={() => setSelectedUser(item)}
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
        </CardContent>
      </Card>

      {/* View modal detail overlay */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden border border-[#E2E8F0] shadow-2xl relative">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b pb-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PGT MEMBER PROFILE</span>
                <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">PROFILE FOR {selectedUser.firstName.toUpperCase()}</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Full Name:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal capitalize">{selectedUser.firstName} {selectedUser.lastName}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Email:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">
                    <a href={`mailto:${selectedUser.email}`} className="text-[#B89047] hover:underline">{selectedUser.email}</a>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">System Role:</span>
                  <span className="col-span-2 capitalize font-bold text-blue-700">{selectedUser.role}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Registered:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">{new Date(selectedUser.createdAt).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide">Free Opt-ins:</span>
                  <span className="col-span-2 text-[#0B1B3D] font-normal">{selectedUser.downloadedFreeResources?.length || 0} files</span>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <span className="font-extrabold text-[#0B1B3D] uppercase tracking-wide block">Purchased Toolkits ({selectedUser.purchasedResources?.length || 0}):</span>
                  <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-4 rounded-xl text-xs text-[#0B1B3D] leading-relaxed max-h-36 overflow-y-auto space-y-1">
                    {selectedUser.purchasedResources?.length === 0 ? (
                      <span className="text-muted-foreground">No purchased products found.</span>
                    ) : (
                      selectedUser.purchasedResources.map((prodId, idx) => (
                        <div key={idx} className="font-mono text-[11px] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#B89047]" />
                          <span>ID: {prodId}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button onClick={() => setSelectedUser(null)} className="bg-[#0B1B3D] text-white">Close Details</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
