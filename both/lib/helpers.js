getUserName = function(user) {
  if (!user)
    return '';

  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.profile && user.profile.firstName && user.profile.lastName)
    return user.profile.firstName + " " + user.profile.lastName;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;

  return '';
};

getUserEmail = function(user) {
  if (user && user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;
};

daysUntilExpiration = function() {
  var daysToWait = 30;
  var daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - daysToWait);
  return daysAgo;
}
