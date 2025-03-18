import { ReservationsTable } from './components/reservations-table'
import { ReservationsFilter } from './components/reservations-filter'

export default function ReservationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <ReservationsFilter />
        <ReservationsTable />
      </div>
    </div>
  )
} 