const checkValidateDate = (date) => {
  // required date
  const requiredDate = new Date(date);
  // current date
  const currentDate = new Date().toISOString();
  const convertCurrentDate = new Date(currentDate);

  if (requiredDate > convertCurrentDate) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkValidateDate;
