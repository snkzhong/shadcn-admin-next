import { getTranslations } from 'next-intl/server';


export default async function HomePage() {
  
  const tRoot = await getTranslations();

  return (
    <div>
      <h1>Forms</h1>

    </div>
  );
}