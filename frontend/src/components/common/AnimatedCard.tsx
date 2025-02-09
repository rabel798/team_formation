import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../utils/animations';

interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            className={`animated-card ${className}`}
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, delay }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard; 