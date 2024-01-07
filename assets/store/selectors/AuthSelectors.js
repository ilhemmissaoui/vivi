export const isAuthenticated = (state) => {
  if (state.auth.auth) return true;
  return false;
};

export const getPersonalInfo = (state) => {
  const info = {
    firstname: state.auth.auth.firstname,
    lastname: state.auth.auth.lastename,
    photoProfil: state.auth.auth.photoProfil,
  };

  return info;
};
