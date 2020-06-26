export function getFormat(sentTime: Date) {
  const today = new Date().getTime();
  const sentDate = new Date(sentTime).getTime();
  const AMOUNT_OF_MS_IN_DAY = 24 * 60 * 60 * 1000;
  const daysSinceLastMessageSent = (today - sentDate) / AMOUNT_OF_MS_IN_DAY;

  return daysSinceLastMessageSent < 1 ? "HH:mm" : "DD/MM/YYYY";
}
