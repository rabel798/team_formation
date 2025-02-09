import React from 'react';
import { motion } from 'framer-motion';
import './Loading.css';

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <motion.div
                className="loading-circle"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Loading...
            </motion.p>
        </div>
    );
};

export default Loading; 