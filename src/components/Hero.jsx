import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { staggerChildren: 0.12, when: "beforeChildren" }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 2, ease: "easeOut" }


  }
  return (

    <div className="w-[100%] h-screen relative overflow-hidden ">
      {/* bg-[url('./images/pizza-slice.webp')] bg-no-repeat bg-cover bg-center  */}
      <motion.div
        className="absolute inset-0 bg-[url('images/pizza-slice.webp')] bg-no-repeat bg-cover bg-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex  flex-col items-center justify-center h-full bg-black bg-opacity-40">

          <motion.h2 variants={itemVariants} className='text-white text-xl md:text-2xl lg:text-3xl font-bold'>Welcome to</motion.h2>
          <motion.h1 variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.58 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl  font-bold">Cusino</motion.h1>
          <p className='text-white text-[0.8rem] lg:text-[1.1rem]'>
            Where Every Craving Finds a Plate.
          </p>

        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero