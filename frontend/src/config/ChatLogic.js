export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderComplete = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  const val =
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId;
  return val;
};

export const isLastMessasge = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const capatalise = (u) => {
  return u;
};

export const timeCalc = (timeStr) => {
  let secs = Math.floor(timeStr / 1000);

  if (secs < 60) return `${secs} second${secs !== 1 ? "s" : ""} ago`;

  let mins = Math.floor(secs / 60);

  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;

  let hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;

  let days = Math.floor(hrs / 24);

  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

  let months = Math.floor(days / 30);

  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  let years = Math.floor(months / 12);

  return `${years} year${years !== 1 ? "s" : ""} ago`;
};
