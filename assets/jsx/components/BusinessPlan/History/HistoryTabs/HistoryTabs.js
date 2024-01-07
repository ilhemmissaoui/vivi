import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    sx={{
      width: "3/4",
    }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#EF9118",
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
      color: "#EF9118",
      backgroundColor: "#FEE4CB", // Set background color for the selected tab
    },
    "&.Mui-focusVisible": {
      color: "#EF6118",
    },
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HistoryTabs = ({ tab, handleTabsChange }) => {
  return (
    <div className=" w-full p-3 items-center justify-center mt-10">
      <div className="border-b-2 border-[#ef9218a0]">
        <StyledTabs
          value={tab}
          aria-label="styled tabs example"
          onChange={handleTabsChange}
        >
          <StyledTab
            aria-label="styled tab example"
            label="Liste des collaborateurs"
            {...a11yProps(0)}
          />
          <StyledTab
            aria-label="styled tab example"
            label="Nouveau collaborateur"
            {...a11yProps(1)}
          />
        </StyledTabs>
      </div>
    </div>
  );
};

export default HistoryTabs;
