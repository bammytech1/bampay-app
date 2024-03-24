export const shortenText = (text, n) => {
  if (text?.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

export const shortenMiddle = (text, startChars, endChars) => {
  if (text.length > startChars + endChars) {
    return (
      text.substring(0, startChars) +
      "...." +
      text.substring(text.length - endChars)
    );
  }
  return text;
};

//email validation
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
