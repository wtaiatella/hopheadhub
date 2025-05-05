import Newsletter from '@/components/commom/newsletter'
import HeroSection from './heroSection'
import AnimatedTextSection from './animatedTextSection'
import IllustrativeSection from './illustrativeSection'
import EventSection from './eventSection'
import StoresSection from './storesSection'
import RecipeSection from './recipeSection'

export default function Home() {
   return (
      <>
         <HeroSection />
         <AnimatedTextSection />
         <IllustrativeSection />
         <EventSection />
         <StoresSection />
         <RecipeSection />
         <Newsletter />
      </>
   )
}
