import { findNearestState } from "./GetFruits";

export const getRecipes = async () => {
  try {
    const results = await findNearestState();

    if (results && results.context) {
      const shuffled = results.context; // Assuming context is an array or a string that you need to work with
      console.log(shuffled);
    } else {
      console.log("No fruits available or unable to determine the nearest state.");
    }
  } catch (error) {
    console.error("Error finding nearest state or retrieving fruits:", error);
  }
};
