export const translateNumber = (input: string | number): string => {
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

  const str = input.toString();

  const isBangla = /[০-৯]/.test(str);

  const converted = str
    .split("")
    .map((char: string) =>
      isBangla ? bnToEnDigits[char] ?? char : enToBnDigits[char] ?? char
    )
    .join("");

  return converted;
};
