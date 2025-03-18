"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ReservationDetailsModal } from "./reservation-details-modal"

export type Reservation = {
  id: string
  status: 'COMPLETED'
  date: string
  customer: {
    name: string
    phone: string
    email: string
  }
  ticket: {
    type: string
    amount: number
    paymentType: 'Prepaid' | 'Manual' | 'Deposit' | 'Card Guarantee'
  }
  paymentStatus: 'Paid' | 'Guaranteed'
  paymentDate: string
  canRefund: boolean
}

const mockData: Reservation[] = [
  {
    id: 'xWMiJWUikW',
    status: 'COMPLETED',
    date: '11 Oct 2024, 06:15 PM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Ramen Festival',
      amount: 355.52,
      paymentType: 'Prepaid'
    },
    paymentStatus: 'Paid',
    paymentDate: '11 Oct 2024',
    canRefund: true
  },
  {
    id: 'QE3h3AhJJ',
    status: 'COMPLETED',
    date: '12 Oct 2024, 06:30 PM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Ramen Festival',
      amount: 88.88,
      paymentType: 'Prepaid'
    },
    paymentStatus: 'Paid',
    paymentDate: '11 Oct 2024',
    canRefund: true
  },
  {
    id: 'COXFiOzu30',
    status: 'COMPLETED',
    date: '07 Oct 2024, 11:45 AM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Ramen Festival',
      amount: 266.64,
      paymentType: 'Manual'
    },
    paymentStatus: 'Paid',
    paymentDate: '11 Oct 2024',
    canRefund: false
  },
  {
    id: 'DYdlzSfZ8y',
    status: 'COMPLETED',
    date: '07 Oct 2024, 11:00 AM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Ramen Festival',
      amount: 266.64,
      paymentType: 'Manual'
    },
    paymentStatus: 'Paid',
    paymentDate: '7 Oct 2024',
    canRefund: true
  },
  {
    id: 'g5nx1SmmF0',
    status: 'COMPLETED',
    date: '07 Oct 2024, 11:00 AM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Ramen Festival',
      amount: 177.76,
      paymentType: 'Prepaid'
    },
    paymentStatus: 'Paid',
    paymentDate: '7 Oct 2024',
    canRefund: true
  },
  {
    id: 'UHXThunSFf',
    status: 'COMPLETED',
    date: '01 Oct 2024, 06:00 PM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Patio Reservation',
      amount: 70,
      paymentType: 'Deposit'
    },
    paymentStatus: 'Paid',
    paymentDate: '1 Oct 2024',
    canRefund: true
  },
  {
    id: 'sNG1hWxnRY',
    status: 'COMPLETED',
    date: '01 Oct 2024, 06:00 PM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Patio Reservation',
      amount: 70,
      paymentType: 'Manual'
    },
    paymentStatus: 'Paid',
    paymentDate: '1 Oct 2024',
    canRefund: false
  },
  {
    id: '5Pyk2tvYpe',
    status: 'COMPLETED',
    date: '01 Oct 2024, 06:00 PM',
    customer: {
      name: 'Kate Ong',
      phone: '+6596414209',
      email: 'kate.ong*5@oddle.me'
    },
    ticket: {
      type: 'Reservation with Guarantee',
      amount: 250,
      paymentType: 'Card Guarantee'
    },
    paymentStatus: 'Guaranteed',
    paymentDate: '1 Oct 2024',
    canRefund: false
  }
]

export function ReservationsTable() {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reservation Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Ticket</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((reservation) => (
              <TableRow 
                key={reservation.id}
                className="cursor-pointer"
                onClick={() => setSelectedReservation(reservation)}
              >
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="secondary">COMPLETED</Badge>
                    <span className="text-sm text-gray-500">{reservation.date}</span>
                    <span className="text-xs text-gray-400">#{reservation.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{reservation.customer.name}</span>
                    <span className="text-sm text-gray-500">{reservation.customer.phone}</span>
                    <span className="text-sm text-gray-500">{reservation.customer.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{reservation.ticket.type}</span>
                    <span className="text-sm text-gray-500">
                      S${reservation.ticket.amount.toFixed(2)} {reservation.ticket.paymentType}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {reservation.paymentStatus}
                  </Badge>
                  <div className="text-sm text-gray-500 mt-1">
                    {reservation.paymentDate}
                  </div>
                </TableCell>
                <TableCell>
                  {reservation.canRefund ? (
                    <Button 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle refund
                      }}
                    >
                      Refund
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-500">
                      Unable to refund as it was a manual payment
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReservationDetailsModal
        reservation={selectedReservation}
        open={selectedReservation !== null}
        onOpenChange={(open) => !open && setSelectedReservation(null)}
      />
    </>
  )
} 