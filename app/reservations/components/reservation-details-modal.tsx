"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, Info, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { Reservation } from "./reservations-table"
import { useState } from "react"
import { TransactionDetailsModal } from "./transaction-details-modal"
import { cn } from "@/lib/utils"

interface ReservationDetailsModalProps {
  reservation: Reservation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationDetailsModal({ 
  reservation, 
  open, 
  onOpenChange 
}: ReservationDetailsModalProps) {
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)

  if (!reservation) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl p-0 gap-0">
          <div className="flex items-center justify-between p-6 pb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-7 gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-500" />
                COMPLETED
              </Badge>
              <h2 className="text-xl font-semibold">Reservation on {reservation.date}</h2>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-7">Reserved via Host</Badge>
              <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 p-6">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Reservation Details</h3>
                <div className="flex items-start gap-2 mb-6">
                  <Badge variant="secondary">{reservation.ticket.type}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-1">DATE AND TIME</h4>
                    <p>{reservation.date} (1.5h)</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-1">PAX</h4>
                    <p>7</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-1">TABLE NO.</h4>
                    <p>A2, 11</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">OCCASIONS</h4>
                <p className="text-gray-400">-</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">RESERVATION TAG</h4>
                <p className="text-gray-400">-</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">CUSTOMER&apos;S SPECIAL REQUEST</h4>
                <p className="text-gray-400">-</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">STAFF NOTES</h4>
                <p className="text-gray-400">-</p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Payment Details</h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 text-xs text-gray-500 font-medium p-3 border-b">
                    <span>DATE AND TIME</span>
                    <span>PAYMENT STATUS</span>
                    <span>TICKET TYPE</span>
                    <span>TOTAL AMOUNT</span>
                  </div>
                  <div className="grid grid-cols-4 p-3">
                    <span>{reservation.paymentDate}</span>
                    <Badge variant="outline" className="w-fit bg-green-50 text-green-700">Paid</Badge>
                    <span>{reservation.ticket.paymentType}</span>
                    <span>S${reservation.ticket.amount.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-purple-700 hover:text-purple-800 hover:bg-purple-50"
                  onClick={() => setShowTransactionDetails(true)}
                >
                  View Full Transaction
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Customer Details</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-100">
                      <span className="text-gray-500">KO</span>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{reservation.customer.name}</span>
                      <span className="px-2 py-0.5 bg-teal-600 text-white text-sm rounded">Kate Ong</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Last visited 5 months ago</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">📞 {reservation.customer.phone}</p>
                  <p className="text-sm">✉️ {reservation.customer.email}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-2">SEGMENTS</h4>
                <Badge variant="outline" className="bg-gray-50">At Risk</Badge>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs text-gray-500 font-medium">CUSTOMER TAGS</h4>
                  <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">View Full Profile</Button>

              <div className="grid grid-cols-3 text-center bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-2xl font-semibold">0</p>
                  <p className="text-sm text-gray-500">Cancellations</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">8</p>
                  <p className="text-sm text-gray-500">Visits</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">0</p>
                  <p className="text-sm text-gray-500">No Shows</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">Customer Notifications</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">All notifications will be sent by you via email.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Payment Request Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>7 Adult</span>
                    </div>
                    <span>S$70</span>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-1">PAYMENT TYPE</h4>
                    <p>Manual Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 p-6 pt-0">
            Updated 1 Oct 2024, 5:33 PM by Totto Ramen @ Ion Orchard Edited
          </div>
        </DialogContent>
      </Dialog>

      <TransactionDetailsModal
        reservation={reservation}
        open={showTransactionDetails}
        onOpenChange={setShowTransactionDetails}
      />
    </>
  )
} 