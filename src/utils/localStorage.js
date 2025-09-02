import toast from "react-hot-toast"

const getStoredList = (type) => {
    const storedListStr = localStorage.getItem(type);
    return storedListStr ? JSON.parse(storedListStr) : [];
  };

const addToStoredList = (single, type) => {
    const storedListStr = localStorage.getItem(type)
    const storedList = storedListStr ? JSON.parse(storedListStr) : []; //convert value to integer

  const isExists = storedList.find(item => item.id === single.id) // check in cart
  if (isExists) {
    toast.error(`already selected in ${type}`);
    return false;
  }

    // check if the item exists in other list
    const otherType = type === 'cart' ? 'wish-list' : 'cart';
    const otherListStr = localStorage.getItem(otherType)
    const otherList = otherListStr ? JSON.parse(otherListStr) : []

    if (otherList.find(item => item.id === single.id)) {
      toast.error(`item already in ${otherType}`);
      return false;
    }

    storedList.push(single)
    localStorage.setItem(type, JSON.stringify(storedList)) // stored as string
    toast.success(`added to ${type}`)
    return true;
}


const removeList = (id, type) => {
    const storedListStr = localStorage.getItem(type); // Retrieve from localStorage
    const storedList = storedListStr ? JSON.parse(storedListStr) : [];
  
    // Filter out the item to be removed
    const remaining = storedList.filter(item => item.id !== id);
  
    // Save back to localStorage
    localStorage.setItem(type, JSON.stringify(remaining));
    toast.success(`Removed from ${type}`);
  };
  

export {addToStoredList, getStoredList, removeList}