import EventCard from '@/components/eventCard'
import HeroSection from './heroSection'
import SearchSection from './searchSection'
import CategorySection from './categorySection'
import EventSection from './eventSection'

export default function Events() {
   return (
      <main>
         <HeroSection />
         <CategorySection />
         <SearchSection />
         <EventSection />
      </main>
   )
}
