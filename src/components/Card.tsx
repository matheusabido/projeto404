export default function Card() {
  return <div className="w-80 shadow border border-gray-100 rounded p-4">
    <div className="w-full h-64 bg-gray-300 animate-pulse rounded mb-4"></div>
    <div className="w-full h-8 bg-gray-300 animate-pulse rounded mb-2"></div>
    <div className="w-full h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
    <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
  </div>;
}