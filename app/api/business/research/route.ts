import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { businessName } = await request.json()

    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    // Call Latitude API
    const response = await fetch(
      'https://gateway.latitude.so/api/v3/projects/18600/versions/26170bb4-8764-43f2-b643-f96f359f71a3/documents/run',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 48ba91f8-a5d8-4a9d-85e4-7ce39c91ef1f',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: 'RestaurantResearcher',
          stream: false,
          parameters: {
            userMessage: businessName
          }
        })
      }
    )

    if (!response.ok) {
      console.error('Latitude API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch business information' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Store in server-side session or return to client for localStorage
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in business research:', error)
    return NextResponse.json(
      { error: 'Failed to research business' },
      { status: 500 }
    )
  }
}