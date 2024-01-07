import React from "react";
import { Form } from "react-bootstrap";

const ObjectfForm = ({ setNewMarkData, newMarkData }) => {
  const handleChangeAction = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      objectifVision: {
        description: e.target.value,
      },
    }));
  };

  return (
    <Form className="mt-4">
      <div className="mb-2">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Description</span>
        </label>
        <Form.Control
          className="inputObject"
          as="textarea"
          type="text"
          placeholder="Description"
          value={newMarkData.objectifVision.description}
          onChange={handleChangeAction}
        />
      </div>
    </Form>
  );
};

export default ObjectfForm;
