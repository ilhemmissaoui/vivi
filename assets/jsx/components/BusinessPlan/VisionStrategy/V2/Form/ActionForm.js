import React from "react";
import { Form } from "react-bootstrap";
import IconMoon from "../../../../Icon/IconMoon";

const ActionForm = ({ newMarkData, setNewMarkData, handleStartDateChange }) => {
  const handleChangeDate = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      actionVision: {
        ...prev.actionVision,
        actionDateFin: e.target.value,
      },
    }));
  };
  const handleChangeAction = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      actionVision: {
        ...prev.actionVision,
        action: e.target.value,
      },
    }));
  };
  const handleChangeCible = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      actionVision: {
        ...prev.actionVision,
        cible: e.target.value,
      },
    }));
  };
  return (
    <Form className="mt-4">
      <div className="mb-2">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Début</span>
        </label>
        <Form.Control
          className="bp-tab-form-input"
          type="date"
          placeholder="Début"
          value={newMarkData.dateVisionStrategies}
          onChange={(e) => handleStartDateChange(e)}
        />
      </div>
      <div className="my-2">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Fin</span>
        </label>
        <Form.Control
          className="bp-tab-form-input"
          type="date"
          placeholder="Fin"
          value={newMarkData.actionVision.actionDateFin}
          required
          min={newMarkData.dateVisionStrategies}
          onChange={handleChangeDate}
        />
      </div>
      <div className="flex my-2">
        <div className="flex flex-col justify-start">
          <label htmlFor="inputField" className="mb-1">
            <span className="bp-tab-form-label">Action</span>
          </label>
          <Form.Control
            className="bp-tab-form-input-sm"
            type="text"
            placeholder="Action"
            required
            value={newMarkData.actionVision.action}
            onChange={handleChangeAction}
          />
        </div>
        <button className="flex flex-col justify-end w-full">
          <IconMoon
            color="#E73248"
            name="arrow-right"
            size={20}
            border="#ffff"
            className="w-full"
          />
        </button>
        <div className="flex flex-col justify-start">
          <label htmlFor="inputField" className="mb-1">
            <span className="bp-tab-form-label">Cible</span>
          </label>
          <Form.Control
            className="bp-tab-form-input-sm"
            type="text"
            placeholder="Cible"
            required
            value={newMarkData.actionVision.cible}
            onChange={handleChangeCible}
          />
        </div>
      </div>
    </Form>
  );
};

export default ActionForm;
