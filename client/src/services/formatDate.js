// export function formatDate(dateString) {
//   const date = new Date(dateString);

//   const options = { month: "short", day: "2-digit", year: "numeric" };
//   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

//   return formattedDate.replace(",", "");
// }

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    console.log(dateString);
    // If the date is invalid, return a fallback string or handle as needed
    console.error("Invalid Date:", dateString);
    return "Date";
  }

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate.replace(",", "");
}
