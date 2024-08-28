"use client";
import { cn } from "@/utilities/cn";
import React from "react";
import { motion } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGithub,
  FaDatabase, FaCloud, FaCode, FaBug, FaHtml5, FaCss3Alt, FaLinux,
  FaAws, FaGitAlt, FaNpm, FaYarn, FaAngular, FaVuejs, FaSwift,
  FaPhp, FaLaravel, FaWordpress, FaWindows, FaApple, FaAndroid,
  FaJenkins, FaSass, FaLess, FaFigma, FaTrello, FaSlack, FaBitbucket
} from "react-icons/fa";
import {
  SiTypescript, SiJavascript, SiRust, SiGo, SiKubernetes, SiGooglecloud,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiGraphql,
  SiJquery, SiDjango, SiFlask, SiSpring, SiRuby, SiWebpack,
  SiNetlify, SiHeroku, SiDigitalocean, SiWebassembly,
  SiTailwindcss, SiBootstrap, SiNextdotjs, SiNuxtdotjs, SiSvelte
} from "react-icons/si";

const iconSet = [
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGithub,
  FaDatabase, FaCloud, FaCode, FaBug, FaHtml5, FaCss3Alt, FaLinux,
  FaAws, FaGitAlt, FaNpm, FaYarn, FaAngular, FaVuejs, FaSwift,
  FaPhp, FaLaravel, FaWordpress, FaWindows, FaApple, FaAndroid,
  FaJenkins, FaSass, FaLess, FaFigma, FaTrello, FaSlack, FaBitbucket, SiTypescript, SiJavascript, SiRust, SiGo, SiKubernetes, SiGooglecloud,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiGraphql,
  SiJquery, SiDjango, SiFlask, SiSpring, SiRuby, SiWebpack,
  SiNetlify, SiHeroku, SiDigitalocean, SiWebassembly,
  SiTailwindcss, SiBootstrap, SiNextdotjs, SiNuxtdotjs, SiSvelte
];

const boxColors = [
  "#7dd3fc",  // --sky-300
  "#f9a8d4",  // --pink-300
  "#86efac",  // --green-300
  "#fde047",  // --yellow-300
  "#f87171",  // --red-300
  "#c084fc",  // --purple-300
  "#60a5fa",  // --blue-300
  "#818cf8",  // --indigo-300
  "#a78bfa",  // --violet-300
];

const iconHoverColors = [
  "#f97316",  // Complementary to --sky-300
  "#36d759",  // Complementary to --pink-300
  "#d086ef",  // Complementary to --green-300
  "#047bfd",  // Complementary to --yellow-300
  "#71f8f8",  // Complementary to --red-300
  "#fc8e84",  // Complementary to --purple-300
  "#fa6b60",  // Complementary to --blue-300
  "#f8cf81",  // Complementary to --indigo-300
  "#fadb9c",  // Complementary to --violet-300
];




const getRandomIcon = () => {
  const RandomIcon = iconSet[Math.floor(Math.random() * iconSet.length)];
  return <RandomIcon className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-inherit " />;
};

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-32 h-16 border-l border-slate-700 relative"
        >
          {cols.map((_, j) => {
            const random = Math.floor(Math.random() * boxColors.length);
            const boxColor = boxColors[random];
            const iconHoverColor =  iconHoverColors[random];

            return (
              <motion.div
                whileHover={{
                  backgroundColor: boxColor,
                  color: iconHoverColor,
                  transition: { duration: 0 },

                }}
                animate={{
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className="w-32 h-16 border-r border-t border-slate-700 relative text-slate-500"
              >

                  {getRandomIcon()}
                </motion.div>

            );
          })}
        </motion.div>
      ))}
    </div>
  );
};


export const Boxes = React.memo(BoxesCore);
