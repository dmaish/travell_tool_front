const checkUserPermission = (history, allowedRoles, userRoles) => {
  const hasPermission = userRoles.some(role => allowedRoles.includes(role));
  if (!hasPermission && allowedRoles.length !== 0) {
    history.push('/requests');
    return false;
  } else {
    return true;
  }
};

export default checkUserPermission;
