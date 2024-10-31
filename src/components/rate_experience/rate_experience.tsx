"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

interface Option {
  title: string;
  id: string;
}

const options: Option[] = [
  {
    title: "😔 Bad",
    id: "bad",
  },
  {
    title: "🙂 Decent",
    id: "decent",
  },
  {
    title: "😍 Love it!",
    id: "love-it",
  },
];

enum FormState {
  IDLE = "idle",
  SUCCESS = "success",
}

export default function RateYourExperience() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState(FormState.IDLE);

  const ref = useRef(null);
  useOnClickOutside(ref, () => closeFeedback());

  useEffect(() => {
    const handleKeyDown = (event: {
      key: string;
      ctrlKey: any;
      metaKey: any;
    }) => {
      if (event.key === "Escape") {
        closeFeedback();
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === FormState.IDLE
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  function submit() {
    setTimeout(() => {
      setFormState(FormState.SUCCESS);
    }, 300);
  }

  function closeFeedback() {
    setOpen(false);
    setFeedback("");
    setSelectedOption("");
    setFormState(FormState.IDLE);
  }

  function openFeedback() {
    setOpen(true);
  }

  return (
    <div className="flex w-full h-full justify-center items-center relative">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
            key="overlay"
          />
        ) : null}
      </AnimatePresence>
      <motion.div layoutId="wrapper">
        <Button
          variant="outline"
          onClick={() => {
            openFeedback();
          }}
        >
          <motion.span aria-hidden layoutId="title">
            Rate your experience
          </motion.span>
        </Button>
      </motion.div>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="flex rounded-lg w-[300px]  md:w-[380px] p-5 border absolute z-20 bg-white overflow-hidden flex-col"
            layoutId="wrapper"
            ref={ref}
          >
            <motion.div className="flex w-full mb-5">
              <motion.span layoutId="title" className="text-sm">
                Rate your experience
              </motion.span>
              <motion.span
                layout
                className="ml-auto flex cursor-pointer"
                onClick={() => {
                  closeFeedback();
                }}
                key="modal-close"
              >
                <X color="#cbcbcb" className="w-4 h-4 md:w-6 md:h-6" />
              </motion.span>
            </motion.div>
            <AnimatePresence mode="popLayout">
              {formState == FormState.IDLE ? (
                <motion.div
                  className="flex w-full flex-col"
                  key="idle"
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                >
                  <div className="flex w-full justify-between">
                    {options.map((option) => (
                      <motion.div
                        className={`w-[80px] md:w-[100px] text-[13px] md:text-sm flex justify-center items-center h-[36px] rounded-sm border border-gray cursor-pointer ${
                          selectedOption == option.id
                            ? "border border-gray-800"
                            : ""
                        }`}
                        key={`idle-${option.id}`}
                        layout
                        onClick={() => {
                          setSelectedOption(option.id);
                          setFeedback("");
                        }}
                      >
                        {option.title}
                      </motion.div>
                    ))}
                  </div>
                  {selectedOption != "" ? (
                    <motion.div
                      className="flex mt-6 flex-col"
                      layout
                      key="idle-feedback"
                    >
                      <Textarea
                        placeholder="Tell us more (optional)"
                        onChange={($event) => {
                          setFeedback($event.target.value);
                        }}
                      ></Textarea>
                      <Button
                        className="flex mt-4"
                        onClick={() => {
                          submit();
                        }}
                      >
                        Submit your feedback
                      </Button>
                    </motion.div>
                  ) : null}
                </motion.div>
              ) : (
                <div className="flex relative">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      className="absolute w-full h-full bg-white z-[100]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        duration: 0.4,
                      }}
                      key="success-background"
                    ></motion.div>
                  </AnimatePresence>
                  <motion.div
                    className="flex w-full flex-col justify-center items-center z-[200]"
                    key="success"
                  >
                    <div className="flex w-full justify-center">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{
                            type: "spring",
                            duration: 0.4,
                            bounce: 0,
                            delay: 0.4,
                          }}
                          key="success-hero1"
                        >
                          <Image
                            src="/feedback.png"
                            width={100}
                            height={100}
                            alt="feedback"
                            quality={100}
                          ></Image>
                        </motion.div>
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        <motion.div
                          className="flex"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{
                            type: "spring",
                            duration: 0.4,
                            bounce: 0,
                            delay: 0.55,
                          }}
                          key="success-hero2"
                        >
                          <Image
                            src="/feedback.png"
                            width={50}
                            height={50}
                            alt="feedback"
                            quality={100}
                            style={{
                              height: "50px",
                              transform: "rotateY(180deg)",
                            }}
                          ></Image>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        className="flex flex-col w-full items-center"
                        initial={{ y: "150%", opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "initial" }}
                        exit={{
                          y: "150%",
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                        transition={{
                          type: "spring",
                          duration: 0.6,
                          bounce: 0,
                        }}
                        key="success-labels"
                      >
                        <span className="flex text-[18px] font-medium mt-6">
                          Thank you
                        </span>
                        <span className="flex w-full text-[14px] text-center text-gray-500">
                          Your feedback helps us improve, appreciate the time
                          you took to send us the feedback!
                        </span>
                        <Button
                          className="flex mt-6 w-full"
                          onClick={() => {
                            closeFeedback();
                          }}
                        >
                          Done
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
