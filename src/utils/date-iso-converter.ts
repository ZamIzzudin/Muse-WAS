/** @format */

export const TimeStamp2Date = (ISO: Date) => {
  if (ISO) {
    const converted = ISO.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return converted;
  } else {
    return "-";
  }
};

export const TimeDifference = (before: Date, after: Date) => {
  if (before && after) {
    const T1 = new Date(before);
    const T2 = new Date(after);

    const difference = T2.getTime() - T1.getTime();

    const hour = Math.floor(difference / (1000 * 60 * 60));
    const minute = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hour} hr, ${minute} m, ${second} s`;
  } else {
    return "-";
  }
};
