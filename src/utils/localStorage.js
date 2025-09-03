import toast from "react-hot-toast"

const getStoredList = (type) => {
    const storedListString = localStorage.getItem(type);
    return storedListString ? JSON.parse(storedListString) : [];
  };


export  { getStoredList }