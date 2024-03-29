import React from "react";
import { Draggable } from "react-beautiful-dnd";

const StyledItem = {
  backgroundColor: "#eee",
  borderRadius: 4,
  padding: "4px 8px",
  transition: "background-color .8s ease-out",
  marginTop: 8,

  ":hover": {
    backgroundColor: "#fff",
    transition: "background-color .1s ease-in",
  },
};

const Item = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
