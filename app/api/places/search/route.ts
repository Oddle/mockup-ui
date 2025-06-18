import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      )
    }

    // Use Google Places Text Search API
    // Limit to Singapore, no distance limit, and use pagetoken for more results
    const allResults: unknown[] = []
    let pageToken: string | undefined = undefined
    
    // Fetch up to 3 pages (20 results per page = 60 results max)
    for (let i = 0; i < 3; i++) {
      const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
      url.searchParams.append('query', `${query} in Singapore`)
      url.searchParams.append('type', 'restaurant')
      url.searchParams.append('region', 'sg')
      url.searchParams.append('key', apiKey)
      
      if (pageToken) {
        url.searchParams.append('pagetoken', pageToken)
      }
      
      const response = await fetch(url.toString())
      const data = await response.json()
      
      if (data.status === 'OK' && data.results) {
        allResults.push(...data.results)
        
        // Stop if we have 50 or more results
        if (allResults.length >= 50) {
          break
        }
        
        // Check if there's a next page
        pageToken = data.next_page_token
        if (!pageToken) {
          break
        }
        
        // Google requires a short delay before using the next page token
        await new Promise(resolve => setTimeout(resolve, 2000))
      } else {
        break
      }
    }

    if (allResults.length > 0) {
      // Transform and filter results, limit to 50
      const results = allResults.slice(0, 50).map((place: unknown) => {
        const placeData = place as Record<string, unknown>
        return {
          place_id: placeData.place_id as string,
          name: placeData.name as string,
          formatted_address: placeData.formatted_address as string,
          types: placeData.types as string[],
          rating: placeData.rating as number || null,
          user_ratings_total: placeData.user_ratings_total as number || 0,
        }
      })

      return NextResponse.json({ results })
    } else {
      return NextResponse.json({ results: [] })
    }
  } catch (error) {
    console.error('Error in places search:', error)
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    )
  }
}