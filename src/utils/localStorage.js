const getStoredList = (type) => {
  try {
    const storedListString = localStorage.getItem(type);
    return storedListString ? JSON.parse(storedListString) : [];
  } catch (error) {
    console.error(`Error parsing localStorage item "${type}":`, error);
    return [];
  }
};

export { getStoredList }

