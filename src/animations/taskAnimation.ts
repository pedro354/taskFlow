import type { Variants } from "framer-motion";

export const taskVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -10},
};

export const taskTransition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
};

export const taskInteraction = {
    whileTap: {scale: 0.98},

};