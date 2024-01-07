export const getProjectId = (state) => {
  return state.project;
};

export const selectAllProjects = (state) => {
  return state.project.allProjects;
};
export const getAllProjectsLoading = (state) => {
  return state.project.showLoading;
};
export const getSelectedProject = (state) => {
  return state.project.selectedProject;
};
export const projectByIdSelector = (state) => {
  return state.project.projectById;
};
