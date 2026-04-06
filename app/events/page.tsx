import Link from "next/link"
import { fetchEvents } from "@/api/client"
import { EventCard } from "@/components/ui/EventCard"
import { SectionHeader } from "@/components/ui/SectionHeader"
import GlitchTitle from "@/components/GlitchTitle"

export default async function EventsPage() {
  const events = await fetchEvents()

  return (
    <main className="relative min-h-screen bg-[#05070d] selection:bg-primary/30 pb-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 mb-12">
          <div className="w-full flex justify-center">
           <GlitchTitle/>
          </div>

          <p className="max-w-3xl text-on-surface-variant leading-relaxed">
            Explore the available Techfest experiences and open protocols. Select any event to view its full details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center self-start rounded-sm border border-primary-container/40 bg-primary-container/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-primary-container transition hover:bg-primary-container/10"
          >
            Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </main>
  )
}
