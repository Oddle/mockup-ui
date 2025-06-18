export interface BusinessResearch {
  brand: {
    name: string
    description: string
    squareLogo: string
    altLogo: string
    primaryColour: string
    website: string
    socialLinks: {
      instagram?: string
      facebook?: string
      tiktok?: string | null
    }
    metadata: {
      brand_history: string
      identity_and_philosophy: string
      signature_dishes: string[]
      menu_summary: string
      seasonal_offerings: Array<{
        item: string
        start_date: string
        end_date: string
        notes: string
      }>
      celebrity_mentions: string
      slogans: string[]
      media_mentions: Array<{
        source: string
        title: string
        url: string
        date_published: string
      }>
    }
  }
  stores: Array<{
    store_name: string
    address: string
    email: string
    phone: string
    googlerelated: {
      placeid: string
      pricelevel: number
      openingHours: Record<string, string>
    }
  }>
}

export interface StoredBusinessResearch {
  timestamp: string
  query: string
  data: BusinessResearch
}

export function getStoredBusinessResearch(): StoredBusinessResearch | null {
  try {
    const stored = localStorage.getItem('businessResearch')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to retrieve business research:', error)
  }
  return null
}

export function clearBusinessResearch(): void {
  localStorage.removeItem('businessResearch')
}