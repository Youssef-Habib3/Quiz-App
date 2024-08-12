"use client";

import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

import data from "./html_questions.json";
import { motion } from "framer-motion";

console.log(data[0].title);

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const answersContainer = useRef(null);
  const button = useRef(null);

  const theRightAnswer = data[counter].right_answer;

  const handleAnswer = (e) => {
    const theClickedButton = e.target.dataset.answer;

    button.current.classList.add("flex");
    button.current.classList.remove("hidden");
    answersContainer.current.style.pointerEvents = "none";

    if (theRightAnswer === theClickedButton) {
      e.target.classList.add("right");
      setRightAnswers(rightAnswers + 1);
    } else {
      e.target.classList.add("false");
      document.querySelectorAll("li").forEach((li) => {
        if (theRightAnswer === li.dataset.answer) {
          li.classList.add("right");
        }
      });
    }
  };

  const handleNextQuestion = () => {
    document.querySelectorAll("li").forEach((li) => {
      li.classList.remove("right");
      li.classList.remove("false");
    });

    button.current.classList.remove("flex");
    button.current.classList.add("hidden");
    answersContainer.current.style.pointerEvents = "auto";

    setCounter(counter + 1);

    if (counter > data.length - 3) {
      results();
    }
  };

  const results = () => {
    let theResults;

    if (theRightAnswer > data.length / 2 && theRightAnswer < data.length) {
      theResults = `<span class="good">Good</span>, ${theRightAnswer} From ${
        data.length - 1
      }`;
    }
    if (theRightAnswer === data.length) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${theRightAnswer} From ${
        data.length - 1
      }`;

      document.querySelector("header").remove();
      document.querySelector(".results").innerHTML = theResults;
      answersContainer.current.remove();
    }
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw] select-none flex justify-center items-center overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, type: "spring", mass: 2 }}
        className="border rounded-lg p-4 bg-white w-[90%] md:w-2/4"
      >
        <header className="flex justify-between items-center gap-4 border-b border-black/50 pb-3 text-3xl">
          <h1 className="font-bold">Simple Quiz</h1>
          <p>
            <span className="text-blue-500">{counter + 1}</span> from{" "}
            <span className="text-blue-500">{data.length - 1}</span>
          </p>
        </header>

        <main className="py-3">
          <section>
            <h3 className="text-2xl text-black/80">{data[counter].title}</h3>
            <ul ref={answersContainer} className="py-3">
              <li
                data-answer={data[counter].answer_1}
                onClick={handleAnswer}
                className="mb-3 hover:bg-slate-300 duration-200 cursor-pointer border border-black/50 rounded-md px-3 py-2 text-2xl"
              >
                {data[counter].answer_1}
              </li>
              <li
                data-answer={data[counter].answer_2}
                onClick={handleAnswer}
                className="mb-3 hover:bg-slate-300 duration-200 cursor-pointer border border-black/50 rounded-md px-3 py-2 text-2xl"
              >
                {data[counter].answer_2}
              </li>
              <li
                data-answer={data[counter].answer_3}
                onClick={handleAnswer}
                className="mb-3 hover:bg-slate-300 duration-200 cursor-pointer border border-black/50 rounded-md px-3 py-2 text-2xl"
              >
                {data[counter].answer_3}
              </li>
              <li
                data-answer={data[counter].answer_4}
                onClick={handleAnswer}
                className="hover:bg-slate-300 duration-200 cursor-pointer border border-black/50 rounded-md px-3 py-2 text-2xl"
              >
                {data[counter].answer_4}
              </li>
            </ul>
          </section>

          <section ref={button} className="justify-center items-center hidden">
            <Button onClick={handleNextQuestion} variant="default">
              Next Qusetion
            </Button>
          </section>

          <section className="results"></section>
        </main>

        <footer className="border-t border-black/50 pt-3 flex justify-center items-center cursor-pointer">
          <HoverCard>
            <HoverCardTrigger>
              <Link
                target="_blank"
                href="https://portfolio-youssef-habib3.vercel.app/"
                className="text-4xl"
              >
                <BsGithub />
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>This is my web site, Visit it?</HoverCardContent>
          </HoverCard>
        </footer>
      </motion.div>
    </div>
  );
};

export default Home;
