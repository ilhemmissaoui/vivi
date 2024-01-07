import axios from "axios";
import BASE_URL from "../../src/apiConfig";

// History services

export async function updateBusinessPlanHistoryParam(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/histoire-equipe/information/`,
    data,
    config
  );
}
export async function updateBusinessPlanMarcheConcurrence(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/probleme`,
    data,
    config
  );
}

export async function getBusinessPlanHistoryInfo(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/histoire-equipe/information/all`,
    config
  );
}

export async function getBusinessPlanSynthese(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/synthese-previsionnelle`,
    config
  );
}
export async function getBusinessPlanMarcheConcurrence(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/probleme`,
    config
  );
}

export async function getBusinessPlanConcurrenceInfo(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/probleme`,
    config
  );
}

export async function getBusinessPlanTeamMembers(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  if (projectId) {
    return axios.get(
      `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre/equipe-collaborateur`,
      config
    );
  }
}
// Team member services

export async function fetchAllMembers(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre-equipe/`,
    config
  );
}
export async function addTeamMember(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre-equipe/add`,
    postData,
    config
  );
}

export async function updateTeamMember(projectId, memberId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre-equipe/${memberId}`,
    config
  );
}

export async function DeleteTeamMember(projectId, memberId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre-equipe-delete/${memberId}`,
    config
  );
}
// Society services
export async function addSociety(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/societe/add`,
    postData,
    config
  );
}

export async function DeleteSociety(projectId, idSociete) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/societe/${idSociete}`,
    config
  );
}

export async function getAllSocieties(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/societe/all/societes`,
    config
  );
}

export async function getAllSocietiesPositionnement(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/getsocieteListe`,
    config
  );
}

// Solution service
export async function addYearSolution(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/annee-solution/add`,
    config
  );
}
export async function getAllYears(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/annee-solution-all/`,
    config
  );
}
export async function GetYearById(projectId, anneeSolution) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/annee-solution/${anneeSolution}`,
    config
  );
}
export async function addBusinessPlanSolution(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/solution/add`,
    data,
    config
  );
}

export async function addBusinessPlanSolutionRevenu(
  projectId,
  solutionId,
  data
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/solution/${solutionId}/revenu/add`,
    data,
    config
  );
}

export async function getBusinessPlanSolutionById(projectId, solutionId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/solution/${solutionId}`,
    config
  );
}

export async function getBusinessPlanAllSolutions(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/all-solutions/`,
    config
  );
}

export async function deleteBusinessPlanSolutionById(projectId, solutionId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/delete-solution/${solutionId}`,
    config
  );
}

//positionnement concurrentiel
export async function getAllPositioning(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/besoin/all`,
    config
  );
}

//get colomns
export async function getAllColomns(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/getAllConcurrentsCol`,
    config
  );
}

//add positioning
export async function addPositioning(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/besoin/add`,
    postData,
    config
  );
}

export async function editPositioning(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/edit-besoin/${postData.id}`,
    postData,
    config
  );
}

export async function deletePositioningById(projectId, idBesoin) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/supp-besoin/${idBesoin}`,
    config
  );
}
export async function addConcurrencePositioning(
  projectId,
  idBesoin,
  idSociete,
  postData
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/besoin/${idBesoin}/societe/${idSociete}/concurrent/add`,
    postData,
    config
  );
}
export async function addConcurrencePositioningProjet(
  projectId,
  idBesoin,
  idSociete,
  postData
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/besoin/${idBesoin}/societe/0/concurrent/add`,
    postData,
    config
  );
}

export async function deleteConcurrencePositioning(
  projectId,
  idBesoin,
  idSociete,
  volumes
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/besoin/${idBesoin}/societe/${idSociete}/concurrent/delete`,
    config
  );
}

// Vision & strategie services

export async function getAllVisionStrategyInfo({ projectId, yearId }) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies-all/${yearId}`,
    config
  );
}

export async function getAllVisionStrategiesForAllYears(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies-all/get-all/annee-projet`,
    config
  );
}

export async function getVisionStrategyById(projectId, visionStrategyId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies-single/${visionStrategyId}`,
    config
  );
}

export async function addVisionStrategyInfo(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/add`,
    data,
    config
  );
}

export async function updateVisionStrategyById(
  projectId,
  data,
  visionStrategyId
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/edit/${visionStrategyId}`,
    data,
    config
  );
}

export async function deleteVisionStrategyById(projectId, visionStrategyId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/supp/${visionStrategyId}`,
    config
  );
}

export async function addVisionStrategyTypeById(
  projectId,
  data,
  visionStrategyId,
  strategieType
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/${visionStrategyId}/${strategieType}/`,
    data,
    config
  );
}
//!!!!!!!!!!!!!!!!!!!!!!!!!
export async function addVisionStrategyComplete(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/add`,
    data,
    config
  );
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export async function updateVisionStrategyTypeByIdBy(
  projectId,
  data,
  visionStrategyId,
  strategieType
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/vision-strategies/${visionStrategyId}/${strategieType}/`,
    data,

    config
  );
}

//// addAactivity

export async function addAactivity(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/add-activite/`,
    postData,
    config
  );
}

export async function editMonthsValue(
  projectId,
  id_ChiffreAffaire,
  id_Montant,
  MonthsValue_id,
  postData
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/${id_ChiffreAffaire}/montant/${id_Montant}/edit-value/${MonthsValue_id}`,
    postData,
    config
  );
}

// montantAnneAdd

export async function AddMontantAnnee(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/montant/add`,
    postData,
    config
  );
}

//// deleteMontantAnne

export async function deleteMontantAnne(projectId, idMontant) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/deleted-montant/${idMontant}`,
    config
  );
}

// addMontant

export async function addValueToMonth(
  projectId,
  idChiffreAffaire,
  idMontant,
  postData
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/${idChiffreAffaire}/montant/${idMontant}/add-value-to-month/`,
    postData,
    config
  );
}

/// getAllActivite

export async function getAllActivity(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/get-all-activite/`,
    config
  );
}

// GetValueToMonth;

export async function GetValueToMonth(
  projectId,
  idChiffreAffaire,
  idMontant,
  idMonthValue
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/activite/${idChiffreAffaire}/montant/${idMontant}/get-value-to-month/${idMonthValue}`,
    config
  );
}

///// delete

export async function deleteActivity(projectId, idChiffreAffaire) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  try {
    const response = await axios.delete(
      `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/deleted/${idChiffreAffaire}`,
      config
    );

    return response;
  } catch (error) {}
}

// update activity name

export async function updateActivityName(projectId, idChiffreAffaire, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/chiffre-affaire/edit-activite/${idChiffreAffaire}`,
    { activiteName: payload },
    config
  );
}

// Charges externes

// add external charge

export async function addExternalCharge(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charges-extairne/add-charge`,
    postData,
    config
  );
}

// update external charge

export async function updateExternalCharge(projectId, idChargeExt, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charges-extairne/edit-charge/${idChargeExt}`,
    postData,
    config
  );
}

// add montant external charge

export async function addMontantExternalCharge(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charges-extairne/montant-chargeExt/add`,
    postData,
    config
  );
}

// update montant external charge

export async function updateMontantExternalCharge(
  projectId,
  idChargeExt,
  idMontant,
  postData
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL} /api/${projectId}/business-plan/financement-charges/charges-extairne/charge/${idChargeExt}/montant/${idMontant}/month-chrgeExt`,
    postData,
    config
  );
}

// get all external charges

export async function getAllExternalCharge(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charge-extairne/get-all-charge`,
    config
  );
}

// get one external charge by id

export async function getOneYearCharge(projectId, idMontant) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charge-extairne/get-charge-monthListe/montant/${idMontant}`,
    config
  );
}

// delete one external charge by id

export async function deleteOneExternalCharge(projectId, idChargeExt) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charge-extairne/supp-charge/${idChargeExt}`,
    config
  );
}

// delete one year by id

export async function deleteOneYearExtrnalCharge(idProjet, idMontant) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${idProjet}/business-plan/financement-charges/charge-extairne/deleted/montant/${idMontant}`,
    config
  );
}
//// add-month-chrgeExt

export async function addMonthExternalChargeValue(
  projectId,
  idChargeExt,
  idMontant,
  postData
) {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/charges-extairne/charge/montant/${idMontant}/month-chrgeExt`,
    postData,
    config
  );
}

// add social charge
export async function addSocialCharge(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/add`,
    payload,
    config
  );
}

export async function addSocialChargeDirigeant(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/add`,
    payload,
    config
  );
}

export async function getAllSocialChargeCollaborateurs(projectId, anneeId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-collaborateur/${anneeId}/get-collaborateurTobeSalarie`,
    config
  );
}

export async function getAllDirigentSocialCharge(projectId, anneeId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/${anneeId}/get-collaborateurToDirigents`,
    config
  );
}

export async function getAllSocialCharge(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/get-all`,
    config
  );
}

export async function getAllSocialChargeDirigeant(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/getAll
    `,
    config
  );
}

export async function getAllAnnesInvestissement(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee-investissement/get/all`,
    config
  );
}

export async function addInvestQuery(projectId, anneeId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee-investissement/${anneeId}/add-investissement`,
    payload,
    config
  );
}

export async function addInvestAnneeQuery(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee-investissement/add`,
    { name: payload },
    config
  );
}

export async function editInvestAnneeQuery(projectId, annee_id, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee-investissement/edit/${annee_id}`,
    { name: payload },
    config
  );
}

export async function addMontantQuery(projectId, annee_id, invest_id, montant) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee-investissement/${annee_id}/investissement/${invest_id}/add-montant`,
    { montant: montant },
    config
  );
}

export async function addEmployeeMember(projectId, anneeId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-collaborateur/${anneeId}/collaborateur-salarie/add`,
    postData,
    config
  );
}

export async function addCollabByMail(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/add-collaborateur`,
    postData,
    config
  );
}
export async function SendMail(projectId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/projet/${projectId}/collaborateur/invitaion`,
    postData,
    config
  );
}
export async function addDirigeantMember(projectId, anneeId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/${anneeId}/dirigeant/add
    `,
    postData,
    config
  );
}

export async function getEmployee(projectId, anneeId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/get/${anneeId}`,
    config
  );
}

//salarié
export async function addSalarieMember(projectId, anneeId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-collaborateur/${anneeId}/info-collaborateur`,
    postData,
    config
  );
}

export async function addSalarieMemberDirigeants(projectId, anneeId, postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/${anneeId}/dirigeant-info/information`,
    postData,
    config
  );
}

export async function addEmployeeProjectMember(
  projectId,
  anneeId,
  idCollaborateur
) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-collaborateur/${anneeId}/collaborateur/${idCollaborateur}/add`,
    {},
    config
  );
}

export async function editYear(projectId, annee_id, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/edit/${annee_id}`,
    payload,
    config
  );
}
export async function editYearDirigeant(projectId, annee_id, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/edit/${annee_id}
    `,
    payload,
    config
  );
}

export async function editCollab(projectId, collab_id, annee_id, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-collaborateur/${annee_id}/edit-info-collaborateur/${collab_id}`,
    payload,
    config
  );
}

export async function editDirigeant(projectId, dirigant_id, annee_id, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeants/${annee_id}/dirigeant/${dirigant_id}/information
    `,
    payload,
    config
  );
}

export async function DeleteYear(projectId, annee_id) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/supp-annee/${annee_id}`,
    config
  );
}
export async function DeleteYearDirigeant(projectId, annee_id) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social-dirigeant/supp-annee/${annee_id}`,
    config
  );
}

export async function DeleteCollab(projectId, collab_id, annee_id) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/${annee_id}/supp-collaborateur/${collab_id}`,
    config
  );
}
export async function DeleteDirigeant(projectId, dirigeant_id, annee_id) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/salaire-charge-social/${annee_id}/supp-dirigeant/${dirigeant_id}`,
    config
  );
}

export async function editHistoireEquipe(projectId, idMembre, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/membre-equipe/${idMembre}`,
    payload,
    config
  );
}

export async function addCollabProjet(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/add-collaborateur`,
    payload,
    config
  );
}
export async function addMemberCollab(projectId, idCollaborateur) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/add-collaborateur-membre-equipe/${idCollaborateur}`,
    {},
    config
  );
}

export async function addNewMember(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Histoire-equipe/add-membre-equipe`,
    payload,
    config
  );
}

export async function getOneSolution(projectId, idSolution) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/solution/${idSolution}`,
    config
  );
}

export async function updateSociety(projectId, idSociete, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(
    `${BASE_URL}/api/${projectId}/business-plan/marche-concurrence/societe/${idSociete}`,
    payload,
    config
  );
}

export async function addSocietyBesoin(projectId, idSociete) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/societe/${idSociete}/add`,
    {},
    config
  );
}

export async function getSocietyPositioning(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/Positionnement-Concurrentiel/get-all-societe-besoin`,
    config
  );
}

export async function addFinancementQuery(projectId, anneeId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/financement-encaisse-decaissement/${anneeId}`,
    payload,
    config
  );
}

export async function addFinancementAnnee(projectId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/financement-encaisse-decaissement/addAnnee

    `,
    payload,
    config
  );
}

export async function getAllAnnesFinancement(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/all-encaisse-decaissement/get-all`,
    config
  );
}

export async function addEncaissementQuery(projectId, anneeId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/encaisse-decaissement/encaissement/annee/${anneeId}/add
    `,
    payload,
    config
  );
}

export async function addDcaissementQuery(projectId, anneeId, payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/encaisse-decaissement/decaissement/annee/${anneeId}/add
    `,
    payload,
    config
  );
}

export async function getEcaissement(projectId, anneeId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/encaisse-decaissement/encaissement/annee/${anneeId}`,
    config
  );
}

export async function getDecaissement(projectId, anneeId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/encaisse-decaissement/decaissement/annee/${anneeId}`,
    config
  );
}

export async function deleteEncaissement(projectId, idEncaissDecaissement) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.delete(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/encaisse-decaissement/supprimer/${idEncaissDecaissement}`,
    config
  );
}

export async function addMonthEncaissDecaiss(projectId, anneeId, postData) {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/annee/${anneeId}/encaisse-decaissement/monthEncaissDecaissement`,
    postData,
    config
  );
}

export async function getAllYearsList(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  const res = await axios.get(
    `${BASE_URL}/api/${projectId}/business-plan/financement-charges/get-AllAnnee`,
    config
  );
  return res.data;
}

export async function sendEventUrl(payload) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.post(`${BASE_URL}/api/email/send-url`, payload, config);
}
