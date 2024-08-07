export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate.replace(",", "");
}
