export const formatDate = (dateString) => {
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
