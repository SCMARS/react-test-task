import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
}

const RecipeCard = memo(function RecipeCard({ id, name, image }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`} className="block group">
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
});

export default RecipeCard;
