
interface SongCardProps {
  image: string;
  title: string;
  likes: string;
}

const SongCard = ({ image, title, likes }: SongCardProps) => {
  return (
    <div className="bg-qtify-white rounded-lg p-3 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="aspect-square mb-3 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-qtify-dark text-sm font-medium mb-1">{title}</h3>
        <p className="text-qtify-gray text-xs">{likes} likes</p>
      </div>
    </div>
  );
};

export default SongCard;
