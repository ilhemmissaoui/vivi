import React, { useState } from "react";
import VisionTabs from "../../Tabs/VisionTabs/VisionTabs";
import TabPanel from "../../Tabs/TabPanel";
import ActionForm from "../Form/ActionForm";
import ObjectifForm from "../Form/ObjectifForm";
import CostForm from "../Form/CostForm";
import ArrowTabs from "./VisionTabs/ArrowTabs";

const NewMarkModal = ({
  newMarkData,
  setNewMarkData,
  setLoader,
  yearTab,
  allYears,
  setStatus,
  status,
  setIsOpenNewMarkModal,
}) => {
  const [modalTab, setModalTab] = useState(0); // Initial tab index
  const handleModalTabChange = (event, newValue) => {
    setModalTab(newValue);
  };

  const handleStartDateChange = (e) => {
    setNewMarkData((prev) => ({
      ...prev,
      dateVisionStrategies: e.target.value,
    }));
  };

  const closePopUp = (event) => {
    // setIsOpenNewMarkModal(false)
    if (event.target.id === "targetDiv") {
      setIsOpenNewMarkModal(false);
    }
  };
  return (
    <div
      className="flex justify-center items-center pt-20"
      onClick={closePopUp}
      id="targetDiv"
    >
      <div className="w-auto border-2 rounded border-[#FFD9DE] min-h-[400px]">
        <VisionTabs tab={modalTab} handleTabsChange={handleModalTabChange} />
        <TabPanel value={modalTab} index={0}>
          {/* Form for Tab 1 */}
          <ActionForm
            newMarkData={newMarkData}
            setNewMarkData={setNewMarkData}
            handleStartDateChange={handleStartDateChange}
          />
        </TabPanel>
        <TabPanel value={modalTab} index={1}>
          {/* Form for Tab 2 */}
          <ObjectifForm
            setNewMarkData={setNewMarkData}
            newMarkData={newMarkData}
          />
        </TabPanel>
        <TabPanel value={modalTab} index={2}>
          {/* Form for Tab 3 */}
          <CostForm setNewMarkData={setNewMarkData} newMarkData={newMarkData} />
        </TabPanel>
        <ArrowTabs
          tab={modalTab}
          handleTabsChange={setModalTab}
          setLoader={setLoader}
          newMarkData={newMarkData}
          setNewMarkData={setNewMarkData}
          yearTab={yearTab}
          allYears={allYears}
          setStatus={setStatus}
          status={status}
        />
      </div>
    </div>
  );
};

export default NewMarkModal;
