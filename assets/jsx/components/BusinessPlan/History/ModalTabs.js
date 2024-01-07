import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#E73248",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1),
    color: "#000",

    "&.Mui-selected": {
      color: "#f44336",
    },
    "&.Mui-focusVisible": {
      color: "#c62828",
    },
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ModalTabs = ({ tab, handleTabsChange }) => {
  return (
    <div className="border-b-2 border-[#FFD9DE]">
      <StyledTabs
        value={tab}
        aria-label="styled tabs example"
        // textColor="#E73248"
        onChange={handleTabsChange}
      >
        <StyledTab
          aria-label="styled tab example"
          label="Liste des collaborateurs 


          "
          {...a11yProps(0)}
        />
        <StyledTab
          aria-label="styled tab example"
          label="Nouveau collaborateur 




          "
          {...a11yProps(1)}
        />
      </StyledTabs>
    </div>
  );
};
export default ModalTabs;
