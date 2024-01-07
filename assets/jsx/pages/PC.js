import React, { useEffect } from "react";
import Box from "../components/Box/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchPc } from "../../store/actions/PcActions";

const CGU = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPc());
  }, [dispatch]);
  const { pcData } = useSelector((state) => state.pc);
  return (
    <div className="justify-items-end">
      <div>
        <Box title={"Politique de confidentialité"} />
      </div>
      <div className="bmc-container flex flex-col px-8 py-6">
        <h2 className="text-blue-700 text-lg py-10 px-10">
          Conditions d'utilisation
        </h2>
        {pcData
          ? pcData?.map((pc) => {
              return (
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold px-10">
                      {pc.titre}
                    </h3>
                  </div>
                  <p className="text-slate-500 group-hover:text-white text-sm mb-8 px-10">
                    {pc.text}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CGU;
