import { VectorMap } from '~/components/map/vector-map';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function MapPage() {
  const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets/style.json?key=cW7fBe0uwCBquW5Uad5i';

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Maptiler Map</h1>
      
      <VectorMap styleUrl={MAP_STYLE_URL} />
    </div>
  );
}