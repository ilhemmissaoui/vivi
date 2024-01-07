import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import IconMoon from "../../../Icon/IconMoon";

const CostForm = ({
  startCost,
  // endCost,
  actionCost,
  cibleCost,
  handleStartCostChange,
  // handleEndCostChange,
  handleActionCostChange,
  handleCibleCostChange,
  addCost,
}) => {
  const getNextDay = (dateString) => {
    const startDate = new Date(dateString);

    const nextDay = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds

    const nextDayString = nextDay.toISOString().split("T")[0];

    return nextDayString;
  };
  return (
    <Form onSubmit={addCost} className="mt-4">
      <div className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#E73248"
          className="bi bi-star-fill"
          viewBox="0 0 20 20"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      </div>
      <div className="my-2">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Début</span>
        </label>
        <Form.Control
          className="bp-tab-form-input"
          type="date"
          placeholder="Début"
          value={startCost}
          disabled
          onChange={handleStartCostChange}
        />
      </div>
      {/* <div className="">
        <label htmlFor="inputField" className="mb-1">
          <span className="bp-tab-form-label">Fin</span>
        </label>
        <Form.Control
          className="bp-tab-form-input"
          type="date"
          placeholder="Fin"
          value={endCost}
          min={getNextDay(startCost)}
          required
          onChange={handleEndCostChange}
        />
      </div> */}
      <div>
        <div className="flex my-2">
          <div className="flex flex-col justify-start">
            <label htmlFor="inputField" className="mb-1">
              <span className="bp-tab-form-label">Action</span>
            </label>
            <Form.Control
              className="bp-tab-form-input-sm"
              type="text"
              placeholder="Action"
              value={actionCost}
              required
              onChange={handleActionCostChange}
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
              value={cibleCost}
              required
              onChange={handleCibleCostChange}
            />
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center">
        <Button
          className="bg-dark-red hover:bg-black-1 border-none hover:border-none"
          type="submit"
        >
          Ajouter
        </Button>
      </div> */}
    </Form>
  );
};

export default CostForm;
