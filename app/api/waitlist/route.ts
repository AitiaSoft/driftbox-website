import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Insert into Supabase waitlist table
    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        source: 'website'
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Supabase error:', errorData)
      
      // Check if it's a duplicate email error
      if (response.status === 409) {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    // Get total waitlist count
    const countResponse = await fetch(`${supabaseUrl}/rest/v1/waitlist?select=count`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    })

    let totalCount = 'unknown'
    if (countResponse.ok) {
      const countHeader = countResponse.headers.get('content-range')
      if (countHeader) {
        // Format: "0-24/25" where 25 is the total count
        const match = countHeader.match(/\/(\d+)$/)
        if (match) {
          totalCount = match[1]
        }
      }
    }

    // Send Telegram notification to Roberto
    if (telegramBotToken) {
      const telegramMessage = `🎉 New DriftBox waitlist signup!\n\nEmail: ${email.toLowerCase().trim()}\nTotal signups: ${totalCount}`
      
      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: '8559715114',
            text: telegramMessage
          })
        })
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
        // Don't fail the request if Telegram notification fails
      }
    }

    // Send email notification to Roberto via FormSubmit.co
    try {
      const signupTimestamp = data[0]?.signed_up_at || new Date().toISOString()
      const formattedTimestamp = new Date(signupTimestamp).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short'
      })

      const emailBody = `New signup!\n\nEmail: ${email.toLowerCase().trim()}\nSigned up: ${formattedTimestamp} EST\nTotal waitlist: ${totalCount}`

      const formData = new URLSearchParams()
      formData.append('_subject', 'New DriftBox Waitlist Signup')
      formData.append('_captcha', 'false')
      formData.append('email', email.toLowerCase().trim())
      formData.append('message', emailBody)
      formData.append('timestamp', formattedTimestamp)
      formData.append('total_signups', totalCount.toString())

      await fetch('https://formsubmit.co/rvaldez@aitiasoft.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formData
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email notification fails
    }
    
    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
