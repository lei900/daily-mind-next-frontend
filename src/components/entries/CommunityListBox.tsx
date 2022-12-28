import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment } from "react";
import Image from "next/image";

import { Community } from "types/types";
import useListBox from "hooks/useListBoxt";
import { CheckIcon, ChevronUpDownIcon } from "components/Icons";

type Props = {
  selectedCommunity: Community | null;
  setSelectedCommunity: Dispatch<SetStateAction<Community | null>>;
};

export default function CommunityListBox(props: Props) {
  const { selectedCommunity, setSelectedCommunity } = props;
  const { communities, classNames } = useListBox();

  return (
    <Listbox value={selectedCommunity} onChange={setSelectedCommunity}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-52">
            <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 pl-3 pr-10 text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
              <span className="flex items-center">
                {selectedCommunity && (
                  <Image
                    src={selectedCommunity.image}
                    alt="日常生活"
                    width={30}
                    height={30}
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate text-blue-600">
                  {selectedCommunity
                    ? selectedCommunity.name
                    : "コミュニティーを選ぶ"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-xl bg-white text-sm shadow-lg  p-2">
                {communities.map((community) => (
                  <Listbox.Option
                    key={community.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-blue-600 bg-blue-50" : "text-gray-800",
                        "relative cursor-default py-2 pl-3 pr-9 select-none rounded-xl text-sm"
                      )
                    }
                    value={community}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Image
                            src={community.image}
                            alt={community.name}
                            width={15}
                            height={15}
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span className={classNames("ml-3 block truncate")}>
                            {community.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className="text-blue-600 
                    absolute inset-y-0 right-0 flex items-center pr-4"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
