import Header from '../../../components/Header';
import EventCard from '../../../components/EventCard';

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4">
        <EventCard />
      </main>
    </>
  );
}
