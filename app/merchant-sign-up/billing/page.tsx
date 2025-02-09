import dynamic from 'next/dynamic'

const BillingContent = dynamic(
  () => import('@/components/billing-content'),
  { ssr: false }
)

export default function BillingPage() {
  return <BillingContent />
} 