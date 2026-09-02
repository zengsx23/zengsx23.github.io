import HomePageClient from '@/components/home/HomePageClient';
import { loadHomePageData } from '@/lib/home-page';

export default function EnglishHomePage() {
  return <HomePageClient data={loadHomePageData('en')} locale="en" />;
}
