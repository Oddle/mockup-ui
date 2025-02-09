"use client"

import dynamic from 'next/dynamic'

const DetailsContent = dynamic(
  () => import('@/components/details-content'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }
)

export default function DetailsPage() {
  return <DetailsContent />
} 