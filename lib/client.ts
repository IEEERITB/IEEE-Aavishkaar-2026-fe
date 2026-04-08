import type { TechfestEvent } from '@/types/event'
import type { RegistrationFormValues } from '@/lib/validations/registration'

// Default to local backend if .env isn't set
const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:8000'

/** List visible events — uses API */
export async function fetchEvents(): Promise<TechfestEvent[]> {
  const res = await fetch(`${base}/api/events`)
  if (!res.ok) throw new Error('Failed to load events')
  const events = await res.json() as TechfestEvent[]
  
  // Override dates for specific events
  return events.map(event => {
    const s = event.slug.toLowerCase()
    if (s.includes('ispy') || s.includes('i-spy')) {
      return { 
        ...event, 
        dateTime: '2026-04-11T03:30:00.000Z', // 9:00 AM IST
        endTime: '2026-04-11T07:30:00.000Z'    // 1:00 PM IST
      }
    }
    if (s.includes('soccer')) {
      return { 
        ...event, 
        dateTime: '2026-04-11T07:30:00.000Z', // 1:00 PM IST
        endTime: '2026-04-11T11:30:00.000Z'    // 5:00 PM IST
      }
    }
    return event
  })
}

/** Fetch specific event by slug */
export async function fetchEventBySlug(slug: string): Promise<TechfestEvent | null> {
  const res = await fetch(`${base}/api/events/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to load event')
  const event = await res.json() as TechfestEvent

  // Override date for specific event
  const s = event.slug.toLowerCase()
  if (s.includes('ispy') || s.includes('i-spy')) {
    return { 
      ...event, 
      dateTime: '2026-04-11T03:30:00.000Z', 
      endTime: '2026-04-11T07:30:00.000Z' 
    }
  }
  if (s.includes('soccer')) {
    return { 
      ...event, 
      dateTime: '2026-04-11T07:30:00.000Z', 
      endTime: '2026-04-11T11:30:00.000Z' 
    }
  }
  
  return event
}

export interface RegistrationResponse {
  ok: boolean
  referenceId: string
  eventSlug: string
  message: string
}

export async function submitRegistration(
  eventId: string,
  payload: RegistrationFormValues
): Promise<RegistrationResponse> {
  const res = await fetch(`${base}/api/registrations/${eventId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Registration failed')
  }
  
  return res.json() as Promise<RegistrationResponse>
}
