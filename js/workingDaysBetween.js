function workingDaysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) return 0;

  let count = 0;
  const current = new Date(start);

  while (current < end) {
    const day = current.getDay(); // 0=Sun … 6=Sat
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

// Export for ES modules
export { workingDaysBetween };
