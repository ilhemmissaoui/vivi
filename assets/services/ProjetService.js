import axios from "axios";
import BASE_URL from "../../src/apiConfig";
export function createProjet(postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(`${BASE_URL}/api/projets/add`, postData, config);
}

export function getAllUsersNotCollab(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/collaborateur-not-inProjet/getAll`,
    config
  );
}

export function getAllUsers() {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(`${BASE_URL}/api/all-user`, config);
}

export function add_collaborater(id) {
  const token = localStorage.getItem("userDetails");
  const postData = {
    partenaires: {
      0: id,
      1: id,
    },
  };
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/projet/{idProjet}/collaborateur/`,
    postData,
    config
  );
}

export async function getAllProjects() {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(`${BASE_URL}/api/projet-all/`, config);
}
export async function getAvancement(idProjet) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${idProjet}/business-plan/module-avancement/`,
    config
  );
}

export function saveInLocalStorage(key, data) {
  if (!Array.isArray(data)) {
    localStorage.setItem(key, JSON.stringify(data.id));
  } else {
    localStorage.setItem(
      key,
      JSON.stringify(
        data.map((item) => {
          return item.id;
        })
      )
    );
  }
}

export async function getProjectById(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(`${BASE_URL}/api/projet/${projectId}`, config);
}

export function sendInvitation(inviEmail) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  const postData = {
    inviEmail,
  };
  return axios.post(
    `${BASE_URL}/api/projet/collaborateur/invitaion`,
    postData,
    config
  );
}

export function getCollaborateurProject(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/projet/${projectId}/all-collaborateur/`,
    config
  );
}

export function createPermission(postData, projectId) {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/add-collaborateur-permission`,
    postData,
    config
  );
}

export function updateLogo(idProjet, updateLogo) {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/edit-projets/${idProjet}`,
    updateLogo,
    config
  );
}
