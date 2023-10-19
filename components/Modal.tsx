"use client";

import { Mail, MousePointerClick, X } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { set } from "mongoose";
import { addUserEmailToProduct } from "@/lib/actions";

interface ModalProps {
  productId: string;
}

const Modal = ({ productId }: ModalProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal Button */}
      <button
        type="button"
        className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[300px] hover:scale-95"
        onClick={openModal}
      >
        <MousePointerClick className="w-6 h-6" />
        <p>Track Product</p>
      </button>

      {/* HeadlessUI Dialog Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          {/* Background */}
          <div className="min-h-screen px-4 text-center">
            {/* Background Transition Animation */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* Make the modal dialog in the center of the screen */}
            <span
              className="inline-block h-screen align-middle"
              area-hidden="true"
            />

            {/* Actual Modal */}
            {/* Actual Modal Transition Animation */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Modal Layout */}
              <div className="dialog-content">
                {/* Modal Content */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    {/* Image */}
                    <div className="p-3 border border-slate-200 rounded-10">
                      <Image
                        src="/logo.png"
                        width={25}
                        height={25}
                        alt="logo"
                        className="sm:w-full sm:h-full w-8 h-8"
                      />
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      className="cursor-pointer hover:text-slate-500"
                      onClick={closeModal}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Modal Title and Description */}
                  <h4 className="dialog-head_text">
                    Product pricing update alert right in your inbox!
                  </h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Keep track and not miss out.
                  </p>
                </div>

                {/* Modal Form */}
                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  {/* Input Container */}
                  <div className="dialog-input_container">
                    {/* Inputs */}
                    <Mail className="w-5 h-5" />
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full h-full outline-none bg-transparent"
                    />
                  </div>

                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? "Submitting..." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
