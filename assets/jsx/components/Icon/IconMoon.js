import React from "react";
import iconSet from "../../../icons/selection.json";
import IcomoonReact from "icomoon-react";

const IconMoon = (props) => {
  return (
    <IcomoonReact
      className={props.className}
      iconSet={iconSet}
      color={props.color}
      size={props.size}
      icon={props.name}
    />
  );
};
export default IconMoon;
