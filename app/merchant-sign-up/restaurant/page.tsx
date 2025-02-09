import dynamic from 'next/dynamic'

const RestaurantContent = dynamic(
  () => import('@/components/restaurant-content'),
  { ssr: false }
)

export default function RestaurantPage() {
  return <RestaurantContent />
} 