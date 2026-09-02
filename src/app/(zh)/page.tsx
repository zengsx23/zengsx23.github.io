import HomePageClient from '@/components/home/HomePageClient';
import { loadHomePageData } from '@/lib/home-page';

export default function ChineseHomePage() {
  return <HomePageClient data={loadHomePageData('zh')} locale="zh" />;
}
