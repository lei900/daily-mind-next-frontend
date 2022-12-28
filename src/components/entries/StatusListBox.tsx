import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment } from "react";
import Image from "next/image";

import { Community } from "types/types";
import useListBox from "hooks/useListBoxt";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  Great,
  Good,
  Neutral,
  Bad,
  Terrible,
} from "components/Icons";

interface Status {
  id: number;
  displayName: string;
  name: string;
}

type Props = {
  selectedStatus: Status;
  setSelectedStatus: Dispatch<SetStateAction<Status>>;
};
export default function StatusListBox(props: Props) {
  const { selectedStatus, setSelectedStatus } = props;
  const { statuses, classNames } = useListBox();

  return (
    <Listbox value={selectedStatus} onChange={setSelectedStatus}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-24">
            <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 px-2  text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
              <span className="flex items-center">
                <span className="ml-3 block truncate text-blue-600">
                  {selectedStatus.displayName || statuses[0].displayName}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
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
                {statuses.map((status) => (
                  <Listbox.Option
                    key={status.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-blue-600 bg-blue-50" : "text-gray-800",
                        "relative cursor-default py-2 px-2 select-none rounded-xl text-sm"
                      )
                    }
                    value={status}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className={classNames("ml-3 block truncate")}>
                            {status.displayName}
                          </span>
                        </div>
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
