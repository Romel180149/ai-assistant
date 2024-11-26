import React from "react";

const ResultDisplay = ({ results }) => (
  <div className="container mx-auto px-4 py-6">
    {results.length === 0 ? (
      <div className="text-center text-gray-500 mt-6">
        <h2 className="text-2xl font-bold">No Results Found</h2>
        <p className="mt-2 text-gray-600">Try searching for something else!</p>
      </div>
    ) : (
      <div>
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          {results.length} Professionals Found
        </h2>
        <hr className="w-full border-t border-gray-200 mt-4 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result) => (
            <div
              key={result._id}
              className="relative border border-gray-300 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100 p-6"
            >
             

              <div className="flex flex-col items-start">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {result.name}
                </h3>


                {/* Category */}
                <p className="text-gray-600 mb-2">
                  <strong>Category:</strong> {result.category}
                </p>

                {/* Ranking */}
                <p className="text-gray-600 mb-2">
                  <strong>Ranking:</strong> {result.ranking || "Not Available"}
                </p>

                {/* Rating */}
                {result.rating && (
                  <p className="text-gray-600 mb-2">
                    <strong>Rating:</strong> ⭐ {result.rating}
                  </p>
                )}

                {/* Zone */}
                {result.zone && (
                  <p className="text-gray-600 mb-2">
                    <strong>Zone:</strong> {result.zone.join(", ")}
                  </p>
                )}

               

                {/* View Details Button */}
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300">
                    View Details
                  </button>
                </div>
                 {/* Separator */}
                 <hr className="w-full border-t border-gray-200 mt-4 mb-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ResultDisplay;
