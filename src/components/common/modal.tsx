import { Dialog, Transition } from "@headlessui/react";
import { title } from "process";
import { Fragment } from "react";

type ModalProps = {
  isShow: boolean;
  onClose: () => any;
  children: any;
  title?: string;
  titleColor?: string;
  width?: string;
  icon?: any;
};

export const Modal = (props: ModalProps) => {
  return (
    <Transition appear show={props.isShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 opacity-100"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  props.width ?? "max-w-sm"
                } h-full transform overflow-hidden bg-white p-3 text-center align-middle shadow-xl transition-all rounded-2xl`}
              >
                {props.icon}
                {title && (
                  <Dialog.Title
                    as="h2"
                    className={`text-lg md:text-xl font-bold leading-6 ${
                      props.titleColor ?? "text-black"
                    }`}
                  >
                    {props.title}
                  </Dialog.Title>
                )}

                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
