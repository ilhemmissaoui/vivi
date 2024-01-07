import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const FAQCard = ({ question, answer }) => {
  return (
    <div className="grid mx-2 my-1">
      <div className="w-full rounded-2xl bg-white p-2 border-orange-200 border-2">
        <Disclosure as="div" className="">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-2 py-2 text-left text-sm font-medium text-black-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                <span className="font-semibold text-lg">{question}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
                {answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FAQCard;
