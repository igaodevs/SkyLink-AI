import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Sequence of animations
    const sequence = async () => {
      await controls.start("visible");
      setShowContent(true);
    };

    sequence();
  }, [controls]);

  const handleContinue = async () => {
    setExitAnimation(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  // Variants for container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Variants for logo animation
  const logoVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    },
  };

  // Variants for text animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variants for button animation
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 1.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(255,255,255,0.6)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Variants for background elements
  const bgElementVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.7,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <AnimatePresence>
      {!exitAnimation && (
        <motion.div
          className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          exit="exit"
        >
          {/* Background animated elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"
            variants={bgElementVariants}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20"
            variants={bgElementVariants}
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />

          {/* Logo animation */}
          <motion.div className="mb-12" variants={logoVariants}>
            <motion.div
              className="w-32 h-32 bg-white rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-20 h-20 text-blue-600"
                fill="currentColor"
              >
                <path d="M21.5,15.5a1,1,0,0,0-.66-.26l-2.5.29L13.5,4.6a1,1,0,0,0-.84-.54h-1.32a1,1,0,0,0-.84.54L5.66,15.53l-2.5-.29A1,1,0,0,0,2,16.35l1.62,5.5A1,1,0,0,0,4.58,22.5l14.83,0a1,1,0,0,0,1-.65l1.62-5.5A1,1,0,0,0,21.5,15.5ZM12,6l3.8,9H8.2Z" />
              </svg>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showContent && (
              <>
                {/* Main title */}
                <motion.h1
                  className="text-5xl md:text-6xl font-bold text-white mb-4 text-center"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Plataforma de Gestão Inteligente
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-xl md:text-2xl text-blue-200 mb-8 max-w-2xl text-center px-4"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Bem-vindo ao futuro da gestão de aviação com IA, blockchain e
                  análise de dados em tempo real
                </motion.p>

                {/* Features list */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl px-4"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                      Dashboard Interativo
                    </h3>
                    <p className="text-white/80">
                      Visualize voos em tempo real e métricas de performance
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                      Rastreamento Avançado
                    </h3>
                    <p className="text-white/80">
                      Sistema de bagagens com tecnologia blockchain
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                      Treinamento Imersivo
                    </h3>
                    <p className="text-white/80">
                      Experiências de aprendizado com IA e realidade virtual
                    </p>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="mt-4"
                >
                  <Button
                    onClick={handleContinue}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-full text-xl font-semibold hover:shadow-glow transition-all duration-300"
                  >
                    {isAuthenticated ? "Ir para Dashboard" : "Começar Agora"}
                  </Button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Animated aircraft */}
          <motion.div
            className="absolute"
            initial={{ x: -100, y: 100, opacity: 0 }}
            animate={{
              x: window.innerWidth + 100,
              y: 50,
              opacity: 1,
              transition: {
                duration: 15,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 10,
              },
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-70"
            >
              <path d="M22,16.5L17.5,22H6.5L2,16.5c0,0,4.5-3.5,10-3.5S22,16.5,22,16.5z M14.5,5L13,2h-2l-1.5,3L5,8l2,4l5-2l5,2l2-4L14.5,5z" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
