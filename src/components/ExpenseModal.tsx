import { Fragment, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';

export default function ExpenseModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-center justify-center">
        <button type="button" onClick={handleOpen}>
          <PlusCircleIcon className="w-16 h-16 text-blue-600 rounded-full" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          as="div"
          className="relative z-10"
        >
          <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition
                show={isOpen}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"></DialogPanel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
