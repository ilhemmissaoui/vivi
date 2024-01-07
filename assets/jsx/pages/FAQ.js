import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../components/Box/Box";
import FAQCard from "../components/cards/FAQ";
import { fetchFAQ } from "../../store/actions/FaqActions";
const FAQ = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFAQ());
  }, [dispatch]);

  const { faqData } = useSelector((state) => state.faq);

  return (
    <div className="justify-items-end">
      <Box title={"FAQ"} />
      <div className="bmc-container flex flex-col p-2">
        <div className="grid grid-cols-2">
          {faqData
            ? faqData?.map((faq, index) => {
                return (
                  <div key={index}>
                    <FAQCard
                      key={index}
                      question={faq.titre}
                      answer={faq.text}
                    />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
