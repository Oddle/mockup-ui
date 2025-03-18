"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Reservation } from "./reservations-table"

interface TransactionDetailsModalProps {
  reservation: Reservation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailsModal({
  reservation,
  open,
  onOpenChange
}: TransactionDetailsModalProps) {
  if (!reservation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <div className="flex items-center justify-between p-6 pb-4 border-b">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Transaction Details Card */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">PAYMENT STATUS</h4>
                <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">TRANSACTION ID</h4>
                <p>RES-22414694-DEP</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">PAYMENT VIA</h4>
                <Badge variant="outline" className="bg-teal-50 text-teal-700">Manual Payment</Badge>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">AMOUNT PAID</h4>
                <p>S$70</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 font-medium mb-1">DATE AND TIME PAID</h4>
                <p>01 Oct 2024, 05:33 PM</p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Reservation Details */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Reservation Details</h3>
                <Badge variant="outline">Reserved via Host</Badge>
              </div>
              <div className="flex items-start gap-2 mb-6">
                <span className="w-2 h-2 mt-2 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium">Patio Reservation</p>
                  <p className="text-sm text-gray-500">S$10 Deposit</p>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-2">STATUS</h4>
                    <Badge variant="secondary" className="text-xs">COMPLETED</Badge>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-2">DATE AND TIME</h4>
                    <p className="text-sm">01 Oct 2024, 06:00 PM</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-2">PAX</h4>
                    <p className="text-sm">7</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-medium mb-2">TABLE NO.</h4>
                    <p className="text-sm">A2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details */}
            <div>
              <h3 className="font-semibold mb-6">Customer Details</h3>
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
              <div className="mt-4">
                <h4 className="text-xs text-gray-500 font-medium mb-2">SEGMENTS</h4>
                <Badge variant="outline" className="bg-gray-50">At Risk</Badge>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="font-semibold mb-4">Transaction History</h3>
            <div className="border rounded-md">
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1fr] text-xs text-gray-500 font-medium p-3 border-b">
                <span>Date</span>
                <span>Time</span>
                <span>Payment Status</span>
                <span>Total Amount</span>
                <span>Done by</span>
                <span>Reason</span>
              </div>
              {/* Add transaction history rows here */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 