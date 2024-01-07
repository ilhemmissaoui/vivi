import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const DropdownWithCheckRadio = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [nestedSelectedValue, setNestedSelectedValue] = useState("");

  const handleParentChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    if (value !== selectedValue) {
      setNestedSelectedValue("");
    }
  };

  const handleNestedChange = (event) => {
    setNestedSelectedValue(event.target.value);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle size="sm"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Form.Check
              type="radio"
              name="exampleRadio"
              id="exampleRadio1"
              value="1"
              label="Business model canvas"
              checked={selectedValue === "1"}
              onChange={handleParentChange}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Form.Check
              type="radio"
              name="exampleRadio"
              id="exampleRadio2"
              value="2"
              label="Business plan"
              checked={selectedValue === "2"}
              onChange={handleParentChange}
            />
            {selectedValue === "2" && (
              <div>
                <Form.Check
                  type="radio"
                  name="nestedExampleRadio"
                  id="nestedExampleRadio3"
                  value="5"
                  label="HISTORIQUE ET EQUIPE"
                  checked={nestedSelectedValue === "5"}
                  onChange={handleNestedChange}
                />
                <Form.Check
                  type="radio"
                  name="nestedExampleRadio"
                  id="nestedExampleRadio4"
                  value="6"
                  label="MARCHE ET CONCURRENCE"
                  checked={nestedSelectedValue === "6"}
                  onChange={handleNestedChange}
                />
                <Form.Check
                  type="radio"
                  name="nestedExampleRadio"
                  id="nestedExampleRadio4"
                  value="6"
                  label="NOTRE SOLUTION"
                  checked={nestedSelectedValue === "6"}
                  onChange={handleNestedChange}
                />
                <Form.Check
                  type="radio"
                  name="nestedExampleRadio"
                  id="nestedExampleRadio4"
                  value="6"
                  label="POSITIONNEMENT CONCURRENTIEL"
                  checked={nestedSelectedValue === "6"}
                  onChange={handleNestedChange}
                />
                <Form.Check
                  type="radio"
                  name="nestedExampleRadio"
                  id="nestedExampleRadio4"
                  value="6"
                  label="VISION ET STRATEGIE"
                  checked={nestedSelectedValue === "6"}
                  onChange={handleNestedChange}
                />
              </div>
            )}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownWithCheckRadio;
