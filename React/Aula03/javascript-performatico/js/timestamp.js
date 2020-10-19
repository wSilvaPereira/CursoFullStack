function leftPad(value, count = 2, char = '0') {
  result = value.toString();
  while (result.length < count) {
    result = char + result;
  }
  return result;
}

function getNewTimestamp() {
  const now = new Date();

  let result = '';

  result += leftPad(now.getDate());
  result += '/';
  result += leftPad(now.getMonth() + 1);
  result += '/';
  result += now.getFullYear();

  result += ' ' + leftPad(now.getHours());
  result += ':' + leftPad(now.getMinutes());
  result += ':' + leftPad(now.getSeconds());
  result += '.' + leftPad(now.getMilliseconds(), 3);

  return result;
}
