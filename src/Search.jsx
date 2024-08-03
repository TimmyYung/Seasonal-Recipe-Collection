import { stateCoordinates } from "./constants/states";

function Search() {

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl mb-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
        🌟 Recipe Finder 🌟
      </h1>
      <div className="flex justify-center space-x-4">
        <button id="findNearestState" className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          Step 1
        </button>
        <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          Step 2
        </button>
        <div id="results"></div>
      </div>
      <script type="module" src="seasonal\script.js"></script>
    </header>
  );
}

export default Search;
