import React, { useState, useEffect } from "react";
import {
  editedBilanPerYear,
  fetchBilanPerYear,
} from "../../../../../store/actions/TableauxFinancierActions";
import { useDispatch, useSelector } from "react-redux";
export default function Bilan({ selectProject, selectedAnnee }) {
  const { BilanData } = useSelector((state) => state.tableauFinancier);

  const dispatch = useDispatch();

  // Create state variables for edited values
  const [editedValues, setEditedValues] = useState({
    [BilanData?.actif?.clients?.id]: BilanData?.actif?.clients?.value || "",
    [BilanData?.actif?.stoks?.id]: BilanData?.actif?.stoks?.value || "",
    [BilanData?.passif?.Capitale?.id]:
      BilanData?.passif?.Capitale?.valeur || "",
    [BilanData?.passif?.ReserveReportNouveau?.id]:
      BilanData?.passif?.ReserveReportNouveau?.valeur || "",
    [BilanData?.passif?.Dettesfiscales?.id]:
      BilanData?.passif?.Dettesfiscales?.valeur || "",
    [BilanData?.passif?.Dettesociales?.id]:
      BilanData?.passif?.Dettesociales?.valeur || "",
    [BilanData?.passif?.fournisseurs?.id]:
      BilanData?.passif?.fournisseurs?.valeur || "",
  });

  // Function to handle changes to the edited values
  const handleValueChange = (id, newValue) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      // Dispatch the editedBilanPerYear action with the edited values
      await dispatch(
        editedBilanPerYear(selectProject, selectedAnnee, editedValues)
      ).then((res) => {
        if (res) {
          dispatch(fetchBilanPerYear(selectProject, selectedAnnee));
        }
      });
      // Dispatch the fetchBilanPerYear action to update the data
    } catch (error) {
      console.error("Error while saving changes:", error);
    }
  };

  useEffect(() => {
    // Update editedValues when BilanData changes
    setEditedValues({
      [BilanData?.actif?.clients?.id]: BilanData?.actif?.clients?.value || "",
      [BilanData?.actif?.stoks?.id]: BilanData?.actif?.stoks?.value || "",
      [BilanData?.passif?.Capitale?.id]:
        BilanData?.passif?.Capitale?.valeur || "",
      [BilanData?.passif?.ReserveReportNouveau?.id]:
        BilanData?.passif?.ReserveReportNouveau?.valeur || "",
      [BilanData?.passif?.Dettesfiscales?.id]:
        BilanData?.passif?.Dettesfiscales?.valeur || "",
      [BilanData?.passif?.Dettesociales?.id]:
        BilanData?.passif?.Dettesociales?.valeur || "",
      [BilanData?.passif?.fournisseurs?.id]:
        BilanData?.passif?.fournisseurs?.valeur || "",
    });
  }, [BilanData]);
  return (
    <div>
      {BilanData !== undefined ? (
        <table className="table" aria-label="simple table">
          <tbody>
            <tr className="border-[#DAD7E9] border-b-2">
              <th className="ml-4 font-bold text-base">Actif</th>
              <th className="number font-bold text-base">Brut</th>
              <th className="number font-bold text-base">Amort</th>
              <th className="number font-bold text-base">Net</th>
              <th className="number font-bold text-base">Passif</th>
              <th className="number font-bold text-base">Net</th>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2 bg-[#DAD7E9] ">
              <td className="ml-4 font-bold text-sm font-extrabold">
                Actif immobilisé
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td className="number  text-sm">CAPITAUX PROPRES</td>
              <td></td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Investissements incorporels</td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementincorporels?.brut
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementincorporels?.amort
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementincorporels?.net
                }
              </td>
              <td className="number text-sm">Capital</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={editedValues[BilanData?.passif?.Capitale?.id] || ""}
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.passif?.Capitale?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Investissements corporels</td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe?.Investissementcorporels
                    ?.brut
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe?.Investissementcorporels
                    ?.amort
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe?.Investissementcorporels
                    ?.net
                }
              </td>
              <td className="number text-sm">Réserves et report à nouveau</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={
                    editedValues[BilanData?.passif?.ReserveReportNouveau?.id] ||
                    ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.passif?.ReserveReportNouveau?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Investissements financiers</td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementfinanciers?.brut
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementfinanciers?.amort
                }
              </td>
              <td className="number">
                {
                  BilanData?.actif?.investissementListe
                    ?.Investissementfinanciers?.net
                }
              </td>
              <td className="number text-sm">Résultat de l'exercice</td>
              <td className="number">{BilanData?.passif?.ResultatExercice}</td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Total de l'investissements</td>
              <td className="number">
                {BilanData?.actif?.ToltalInvestisements?.brut}
              </td>
              <td className="number">
                {BilanData?.actif?.ToltalInvestisements?.amort}
              </td>
              <td className="number">
                {BilanData?.actif?.ToltalInvestisements?.net}
              </td>
              <td className="number text-sm">Total des capitaux propres</td>
              <td className="number">
                {BilanData?.passif?.TotalCapiteauxPropres}
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2 bg-[#DAD7E9] ">
              <td className="ml-4 font-bold text-sm font-extrabold">
                Actif circulant
              </td>
              <td className="number"></td>
              <td className="number"></td>
              <td className="number"></td>
              <td className="number text-sm">DETTES</td>
              <td className="number"></td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Stocks</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={editedValues[BilanData?.actif?.stoks?.id] || ""}
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.actif?.stoks?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
              <td className="number">{BilanData?.actif?.stoks?.value}</td>
              <td className="number">{BilanData?.actif?.stoks?.value}</td>
              <td className="number text-sm">Emprunts</td>
              <td className="number">{BilanData?.passif?.Emprunts}</td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Clients</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={editedValues[BilanData?.actif?.clients?.id] || ""}
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.actif?.clients?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
              <td className="number">{BilanData?.actif?.clients?.value}</td>
              <td className="number">{BilanData?.actif?.clients?.value}</td>
              <td className="number text-sm">Comptes courants d'associés</td>
              <td className="number">
                {BilanData?.passif?.CempteCaurentAssociés}
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Créances fiscales</td>
              <td className="number">{BilanData?.actif?.CreanceFiscale}</td>
              <td className="number">{BilanData?.actif?.CreanceFiscale}</td>
              <td className="number">{BilanData?.actif?.CreanceFiscale}</td>
              <td className="number text-sm">Fournisseurs</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={
                    editedValues[BilanData?.passif?.fournisseurs?.id] || ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.passif?.fournisseurs?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Créances sociales</td>
              <td className="number">{BilanData?.actif?.CreanceAociales}</td>
              <td className="number">{BilanData?.actif?.CreanceAociales}</td>
              <td className="number">{BilanData?.actif?.CreanceAociales}</td>
              <td className="number text-sm">Dettes fiscales</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="number"
                  value={
                    editedValues[BilanData?.passif?.Dettesfiscales?.id] || ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.passif?.Dettesfiscales?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2">
              <td className="ml-4 text-sm">Trésorerie</td>
              <td className="number">{BilanData?.actif?.Treoseries?.brut}</td>
              <td className="number">{BilanData?.actif?.Treoseries?.amort}</td>
              <td className="number">{BilanData?.actif?.Treoseries?.net}</td>
              <td className="number text-sm">Dettes sociales</td>
              <td className="number">
                <input
                  className="font-bold number"
                  type="text"
                  value={
                    editedValues[BilanData?.passif?.Dettesociales?.id] || ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      BilanData?.passif?.Dettesociales?.id,
                      e?.target?.value
                    )
                  }
                />
              </td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] border-b-2 bg-[#DAD7E9] ">
              <td className="ml-4 font-bold text-sm font-extrabold">
                Total de l'actif circulant
              </td>
              <td className="number">{BilanData?.actif?.TotalActifCercul}</td>
              <td className="number">{BilanData?.actif?.TotalActifCercul}</td>
              <td className="number">{BilanData?.actif?.TotalActifCercul}</td>
              <td className="number text-sm">Total des dettes</td>
              <td className="number">{BilanData?.passif?.Totaldettes}</td>
            </tr>
            <tr className="border-t-2 border-[#DAD7E9] bg-[#DAD7E9] ">
              <td className="ml-4 font-bold text-sm font-extrabold">
                Total actif
              </td>
              <td className="number">{BilanData?.actif?.TotalActif}</td>
              <td className="number">{BilanData?.actif?.TotalActif}</td>
              <td className="number">{BilanData?.actif?.TotalActif}</td>

              <td className="number  text-sm">Total passif</td>
              <td className="number">{BilanData?.passif?.TOTALPASSIF}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
      <div className="flex justify-end items-end my-4 mx-8 px-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded focus:outline-none"
          style={{ backgroundColor: "#514495" }}
          onClick={handleSaveChanges}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
