const enToBnDigits: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export const translateNumber = (
  input: string | number,
  lang: "en" | "bn" = "en"
) => {
  const bnToEnDigits: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  if (lang === "en") {
    return input.toLocaleString();
  } else if (lang == "bn") {
    const str = input.toLocaleString();

    const isBangla = /[০-৯]/.test(str);

    const converted = str
      .split("")
      .map((char: string) =>
        isBangla ? bnToEnDigits[char] ?? char : enToBnDigits[char] ?? char
      )
      .join("");

    return converted;
  }
};

export const formatTimestampToDate = (
  timestamp: number | string,
  lang: "en" | "bn" = "en"
): string => {
  const date = new Date(Number(timestamp));

  const banglaMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const englishMonthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (lang === "bn") {
    const convertToBanglaDigits = (num: number): string =>
      num
        .toString()
        .split("")
        .map((d) => enToBnDigits[d] ?? d)
        .join("");

    const banglaDay = convertToBanglaDigits(day);
    const banglaMonth = banglaMonths[monthIndex];
    const banglaYear = convertToBanglaDigits(year);

    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  } else {
    const englishMonth = englishMonthsShort[monthIndex];
    return `${day} ${englishMonth} ${year}`;
  }
};
