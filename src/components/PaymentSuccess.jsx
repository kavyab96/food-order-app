import { motion, } from "framer-motion";
import { LuCircleCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import confetti from "canvas-confetti";


const PaymentSuccess = () => {

    useEffect(() => {
        const colors = ['#F5BB27', '#76F527']

        //center burst
        confetti({
            particleCount: 200,
            spread: 150,
            origin: { x: 0.4, y: 0.2 }
        })
        // left side 
        confetti({
            particleCount: 100,
            spread: 50,
            angle: 70,
            origin: { x: 0 }
        })
        //right side
        confetti({
            particleCount: 100,
            spread: 70,
            angle: 130,
            origin: { x: 1 }
        })
        const interval = setInterval(() => {
            confetti({
                particleCount: 50,
                spread: 130,
                origin: { x: Math.random(), y: 0.6 }
            });
        }, 2000)
        const stop = setTimeout(() => clearInterval(interval), 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(stop);
        };

    }, [])
    const navigate = useNavigate();
    const container = {
        hidden: { opacity: 0, scale: 0.55 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 160,
                damping: 18,
                staggerChildren: 0.12
            },
            exit: { opacity: 0, scale: 0.98 }
        }
    };
    const item = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };
    return (

        <>

            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-3 items-center justify-center">

                <LuCircleCheck className="text-green-600 dark:text-yellow-400 text-5xl sm:text-6xl md:text-7xl drop-shadow" />

                <motion.h2 variants={item} className="text-sm md:text-sm lg:text-xl font-bold text-black dark:text-white">
                    Payment Successful
                </motion.h2>

                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/home")}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500">
                    Back to Home
                </motion.button>
            </motion.div>
        </>
    )
}

export default PaymentSuccess