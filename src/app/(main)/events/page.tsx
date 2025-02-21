import EventCard from '@/components/eventCard'
import HeroSection from './heroSection'
import SearchSection from './searchSection'
import CategoryCard from '@/components/categoryCard'

export default function Events() {
   return (
      <main>
         <HeroSection />
         <SearchSection />
         <CategoryCard
            imagePath="/assets/cat-networking.jpeg"
            categoryGroupName="Enthusiastic"
            categoryGroupDescription="Find tournments, classes, and more"
         />
         <EventCard />
      </main>
   )
}
