import { getTranslations, setRequestLocale } from 'next-intl/server';
// import { useTranslations } from 'next-intl';
import { Button } from "~/components/ui/button";
import { Home, Search, Plus, ArrowRight } from 'lucide-react';


export default async function HomePage() {
  
  const tRoot = await getTranslations();

  // Enable static rendering
  // setRequestLocale(locale);

  return (
    <div>
      <h1>{tRoot('welcome')}</h1>
      <p>{tRoot('description')}</p>

      {/* 使用原始 ShadCN Button */}
      <Button variant="default">{tRoot('components.button.ok')}</Button>

    </div>
  );
}