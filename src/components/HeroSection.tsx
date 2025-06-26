
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b to-qtify-dark py-20 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl font-bold text-qtify-white mb-4 leading-tight">
            100 Thousand Songs, ad-free
          </h1>
          <h2 className="text-4xl font-bold text-qtify-white mb-6 leading-tight">
            Over thousands podcast episodes
          </h2>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="w-80 h-80 relative">
            <img
              src="./headphone.svg"
              alt="Vibrant Headphones"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
