export const formatDateToString = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  console.log("herreee");

  // Format the date as "11 Aug 24"
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
};

// format the date as "11-08-2024"
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getDayOfWeek = (dateString) => {
  const date = new Date(dateString.split("-").reverse().join("-")); // Convert to YYYY-MM-DD format
  const options = { weekday: "short" }; // 'short' for Mon, Tue, etc.
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Function to get start and end dates of the current week (Monday to Sunday)
export const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the difference to the previous Monday
  const diffToMonday = (dayOfWeek + 6) % 7; // Converts Sunday (0) to 6, Monday (1) to 0, etc.

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 13); // Sunday of the same week

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};
