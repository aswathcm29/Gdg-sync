
const CardShimmer = () => {
  return (
    <div className="max-w-[400px] rounded-lg bg-transparent text-[#f0f0f0] shadow-sm shadow-blue animate-pulse">
      <div className="w-full h-[150px] bg-gray-700 rounded-md"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-700 rounded-md w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-600 rounded-md w-full mb-2"></div>
        <div className="h-3 bg-gray-600 rounded-md w-5/6 mb-4"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            <div className="h-4 bg-gray-600 rounded-md w-2/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            <div className="h-4 bg-gray-600 rounded-md w-1/2"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            <div className="h-4 bg-gray-600 rounded-md w-3/4"></div>
          </div>
        </div>
        <div className="mt-4 h-8 bg-gray-700 rounded-md w-1/2"></div>
      </div>
    </div>
  )
}

export default CardShimmer