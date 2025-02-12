import API_BASE_URL from "../config/apiConfig";

const endPoints = {
  login: `/login`,
  signUp: `/users/signup`,
  listProjects: (accounId) => `/accounts/${accounId}/projects`,
  createUpdateProject: `/projects`,
  projectStatusList: `/masterData/projects/status`,
  leadList: `/leads`,
  userList: `/users`,
  assignProject: (projectId) => `/projects/${projectId}/assign`,
  userProjects: (userId) => `/users/${userId}/projects`,
  accounts: `/accounts`,
  leadStatus: `/masterData/leads/status`,
  importLeads: `/leads/import`,
};

export default endPoints;
