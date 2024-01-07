import React, { useEffect } from "react";
import Box from "../components/Box/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchCGU } from "../../store/actions/CguActions";

const CGU = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCGU());
  }, [dispatch]);

  const { cguData } = useSelector((state) => state.cgu);
  return (
    <div className="justify-items-end">
      <div>
        <Box title={"CGU"} />
      </div>
      <div className="bmc-container flex flex-col px-8 py-6">
        <h2 className="text-blue-700 text-lg py-10 px-10">
          Conditions d'utilisation
        </h2>

        {cguData
          ? cguData?.map((cgu) => {
              return (
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold px-10">
                      {cgu.titre}
                    </h3>
                  </div>
                  <p className="text-slate-500 group-hover:text-white text-sm mb-8 px-10">
                    {cgu.text}
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
