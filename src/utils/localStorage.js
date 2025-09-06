/**
 * Retrieves a list from localStorage.
 * @param {string} key The key for the localStorage item.
 * @returns {Array} The parsed list or an empty array if not found.
 */
export const getStoredList = (key) => {
  try {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : [];
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return [];
  }
};

/**
 * Stores a list in localStorage.
 * @param {string} key The key for the localStorage item.
 * @param {Array} list The list to store.
 */
export const setStoredList = (key, list) => {
    try {
        localStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
        console.error(`Error writing to localStorage for key "${key}":`, error);
    }
};
