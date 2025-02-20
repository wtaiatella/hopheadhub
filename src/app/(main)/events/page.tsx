import EventCard from '@/components/eventCard';
import HeroSection from './heroSection';
import SearchSection from './searchSection';

export default function Events() {
  return (
    <main>
      <HeroSection />
      <SearchSection />
      <EventCard />
    </main>
  );
}
