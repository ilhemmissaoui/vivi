import React from "react";
import { Form } from "react-bootstrap";
const CostForm = ({ setNewMarkData, newMarkData }) => {
  const handleChangeAction = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      coutVision: {
        cout: e.target.value,
      },
    }));
  };

  return (
    <Form className="mt-4">
      <div className="mb-2">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Coût</span>
        </label>
        <Form.Control
          className="inputCout"
          type="number"
          placeholder="0"
          value={newMarkData.coutVision.cout}
          onChange={handleChangeAction}
        />
      </div>
    </Form>
  );
};

export default CostForm;
