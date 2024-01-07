import React from "react";
import IconMoon from "../../../Icon/IconMoon";

const CardContent = ({ strength, description, innovation, revenus }) => {
  const items = [
    {
      icon: "idea",
      title: "Innovation",
      content: innovation,
    },
    {
      icon: "money-up",
      title: "Source de revenus",
      content: revenus ? (
        <div style={{ fontSize: "17px" }}>
          <table>
            <tbody>
              {revenus.map((revenu, index) => (
                <tr key={revenu.chiffreAffaireActiviteName}>
                  <td>{revenu.chiffreAffaireActiviteName} :</td>
                  <td>{`${revenu.sommeVente} €`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            Total:{" "}
            {revenus.reduce((total, revenu) => total + revenu.sommeVente, 0)} €
          </div>
        </div>
      ) : (
        <span style={{ fontSize: "17px", fontStyle: "italic" }}>
          Aucune donnée de revenus disponible
        </span>
      ),
    },
    {
      icon: "strength",
      title: "Points forts",
      content: strength,
    },
    {
      icon: "settings-basic",
      title: "Description technique",
      content: description,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex flex-wrap justify-start items-start my-2 mx-10 border-2 border-banana rounded-lg p-2 bg-white"
        >
          <div className="pt-2">
            <div className="text-left mb-2">
              <div className="flex items-start mb-2">
                <div className="rounded-full bg-banana p-2 ">
                  <IconMoon color="#ffff" name={item.icon} size={27} />
                </div>
                <h3 className="ml-2 text-lg font-semibold">{item.title}</h3>
              </div>
              <p
                style={{ fontFamily: "Roboto" }}
                className="text-left mx-[50px] text-base"
              >
                {item.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardContent;
