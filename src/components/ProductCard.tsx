type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img src={image} alt={name} className="w-32 h-32 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-blue-600 font-bold mb-2">${price.toFixed(2)}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
    </div>
  );
}
