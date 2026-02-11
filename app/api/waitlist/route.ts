import { NextRequest, NextResponse } from 'next/server'

async function getGraphToken() {
  const tenantId = process.env.MS_TENANT_ID
  const clientId = process.env.MS_CLIENT_ID
  const clientSecret = process.env.MS_CLIENT_SECRET

  if (!tenantId || !clientId || !clientSecret) return null

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials'
      })
    }
  )

  if (!tokenResponse.ok) return null
  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

async function sendEmailNotification(signupEmail: string, totalCount: string, signupTimestamp: string) {
  const token = await getGraphToken()
  if (!token) {
    console.error('Could not get Graph API token for email notification')
    return
  }

  const formattedTimestamp = new Date(signupTimestamp).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const senderEmail = process.env.MS_EMAIL || 'kit@aitiasoft.com'

  await fetch(
    `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          subject: '🎉 New DriftBox Waitlist Signup',
          body: {
            contentType: 'HTML',
            content: `
              <h3>New DriftBox Waitlist Signup!</h3>
              <p><strong>Email:</strong> ${signupEmail}</p>
              <p><strong>Signed up:</strong> ${formattedTimestamp} EST</p>
              <p><strong>Total waitlist:</strong> ${totalCount}</p>
              <br>
              <p><a href="https://supabase.com/dashboard/project/ubiadvbpaviaocxhqflc/editor">View all signups in Supabase →</a></p>
            `
          },
          toRecipients: [
            { emailAddress: { address: 'rvaldez@aitiasoft.com' } }
          ]
        }
      })
    }
  )
}

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
        const match = countHeader.match(/\/(\d+)$/)
        if (match) {
          totalCount = match[1]
        }
      }
    }

    const signupTimestamp = data[0]?.signed_up_at || new Date().toISOString()

    // Send Telegram notification
    if (telegramBotToken) {
      try {
        const telegramMessage = `🎉 New DriftBox waitlist signup!\n\nEmail: ${email.toLowerCase().trim()}\nTotal signups: ${totalCount}`
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '8559715114',
            text: telegramMessage
          })
        })
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
      }
    }

    // Send email notification via Microsoft Graph
    try {
      await sendEmailNotification(email.toLowerCase().trim(), totalCount, signupTimestamp)
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
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
