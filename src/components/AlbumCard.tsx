
interface AlbumCardProps {
  image: string;
  title: string;
  follows: string;
}

const AlbumCard = ({ image, title, follows }: AlbumCardProps) => {
  return (
    <div className="bg-qtify-darkCard rounded-lg p-3 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="aspect-square mb-3 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white text-sm font-medium mb-1">{title}</h3>
        <p className="text-qtify-gray text-xs">{follows} Follows</p>
      </div>
    </div>
  );
};

export default AlbumCard;
