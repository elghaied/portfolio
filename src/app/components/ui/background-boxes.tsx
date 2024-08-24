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

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomIcon = () => {
    const RandomIcon = iconSet[Math.floor(Math.random() * iconSet.length)];
    return <RandomIcon className="w-4 h-4" />;
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8  border-l  border-slate-700 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8  border-r border-t border-slate-700 relative"
            >

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-500">
                  {getRandomIcon()}
                </div>

            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
