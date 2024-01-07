import * as React from 'react';


function createData(Actif, Brut, Amort, Net1, Passif, Net2) {
    return { Actif, Brut, Amort, Net1, Passif, Net2};
  }

const rows = [
    createData("Actif immobilise", '', '', '', "Capiteau Propres", ''),
    createData("Investisement incorporels", 0, 0, 0, "Capitale", 0),
    createData("Investisement corporels", 0, 0, 0, "Réserve et report a nouveau", 0 ),
    createData("Investisement financiers", 0, 0, 0, "Résultat de l'exercice", 0),
    createData("Ttoltal des investisements", 0, 0, 0, "Total des capiteaux propres",0 ),
    createData("Activ circulant", 0, 0, 0, "DETTES", 0),
    createData('Stoks', 0, 0, 0, "Emprunts", 0),
    createData("Clients", 0, 0, 0 , "Cempte caurent d'associés", 0),
    createData('Creance fiscales', 0, 0, 0, "Forniseurs", 0),
    createData("Creance sociales", 0, 0, 0, "Dettes fiscales", 0),
    createData("Tréoseries", 0, 0, 0, "Dette sociales", 0),
    createData("Total de l'actif cerculant", 0, 0, 0, " Total des dettes", 0),
    createData("Total actif", 0, 0, 0, "TOTAL PASSIF", 0)
  ];

export default function YearTable  ({année}) {
    const plus = ()=> {
        var x = 0
        année === 'Année1' ? x=1 : année === 'Année2' ? x=2 : x=3
        return x
    }
    return (
        <table style={{ marginTop: "24px", width: "100%" }}>
        <thead>
          <tr>
            <th className='pl-6'>Actif</th>
            <th style={{textAlign: "center"}}>Brut</th>
            <th style={{textAlign: "center"}}>Amort</th>
            <th style={{textAlign: "center"}}>Net</th>
            <th style={{textAlign: "center"}}>Passif</th>
            <th style={{textAlign: "center"}}>Net</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.Actif}
              style={{height: "36px", borderTop: "solid 1px"}}
              class={(i === 0 || i === 5 || i === 11 || i === 12)? 'highlighted-row' : ''}
            >
              <th scope="row" className='pl-6'>
                {row.Actif}
              </th>
              <td align="center">{row.Brut + plus()}</td>
              <td align="center">{row.Amort + plus()}</td>
              <td align="center">{row.Net1 + plus()}</td>
              <td align="center">{row.Passif}</td>
              <td align="center">{row.Net2 + plus()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}