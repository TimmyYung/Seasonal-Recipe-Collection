
import PropTypes from 'prop-types';

function Result({ location }) {
  return (
    <div className="search-bar p-6 bg-gray-100 border border-gray-300 shadow-md">
      {/* conditional rendering block, it checks if the location prop has a value. */}
      {location ? (
        <p className="text-lg font-medium">
          Showing seasonal dishes for: <span className="font-bold">{location}</span>
        </p>
      ) : (
        <p className="text-lg">Please enter your location to see seasonal dishes.</p>
      )}
    </div>
  );
}

// Define the prop types for the SearchBar component
Result.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Result;
