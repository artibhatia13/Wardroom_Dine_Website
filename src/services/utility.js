export const formatDateToString = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  console.log("herreee");

  // Format the date as "11 Aug 24"
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
};

// format the date as "2024-08-11"
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getDayOfWeek = (dateString) => {
  console.log("dateString", dateString);
  const date = new Date(dateString); // Parse the date string into a Date object
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
