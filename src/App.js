import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

import b1 from "./assets/b1.jpg"; // the brain + circuits image you sent
import b2 from "./assets/b2.png";
import b3 from "./assets/b3.jpg";
import b5 from "./assets/b5.JPG";
import b6 from "./assets/b6.jpg";
import b7 from "./assets/b7.jpg";
import b8 from "./assets/b8.jpg";
import b9 from "./assets/b9.jpg";
const slides = [
  {
    id: 1,
    title: "The Brain: Unlocking the Secrets of the Mind",
    subtitle: "How computers learn by copying us",
    points: [
      "Your brain is the ultimate learning machine.",
      "Artificial Neural Networks (ANNs) are computer models inspired by it.",
      "We’ll explore how the brain works, how ANNs mimic it, and what they still cannot do."
    ],
    image: b1,
    theme: "intro"
  },
  {
    id: 2,
    title: "Meet Your Brain",
    subtitle: "A living network",
    points: [
      "Your brain has around 86 billion neurons.",
      "Each neuron connects to thousands of others, forming huge networks.",
      "It works in parallel, adapts constantly, and uses surprisingly little energy."
    ],
    image: b2,
    theme: "brain"
  },
  {
    id: 3,
    title: "Zoom Into a Neuron",
    subtitle: "The tiny thinker",
    points: [
      "Dendrites: receive signals from other neurons.",
      "Cell body: processes those signals.",
      "Axon: sends the output onward when the neuron 'fires'.",
      "Learning = strengthening or weakening connections over time."
    ],
    image: b3,
    theme: "neuron"
  },
  {
    id: 4,
    title: "From Neurons to Brain Networks",
    subtitle: "Small units, big intelligence",
    points: [
      "Neurons form circuits for vision, sound, movement, memories and more.",
      "Patterns of activity, not single neurons, create thoughts and actions.",
      "The brain rewires itself throughout life – this is called plasticity."
    ],
    image: b9,
    theme: "brain-network"
  },
  {
    id: 5,
    title: "What Is an Artificial Neural Network?",
    subtitle: "A rough sketch of a brain",
    points: [
      "An ANN is a mathematical model inspired by biological neurons.",
      "Artificial 'neurons' take numbers in, do a simple calculation, and output a number.",
      "Connecting many such units in layers creates a neural network."
    ],
    image: b5,
    theme: "ann"
  },
  {
    id: 6,
    title: "How ANNs Mimic the Brain",
    subtitle: "Layers, weights and learning",
    points: [
      "Inputs → hidden layers → output, like senses → brain → decision.",
      "Connections have 'weights' similar to synapse strengths.",
      "Training adjusts these weights so the network gets better at a task."
    ],
    image: b6,
    theme: "mirror"
  },
  {
    id: 7,
    title: "What ANNs Can Do (Brain-like)",
    subtitle: "Pattern masters",
    points: [
      "Recognize objects in images and faces in photos.",
      "Understand speech well enough to transcribe or respond.",
      "Spot patterns in data that humans might miss."
    ],
    image: b7,
    theme: "abilities"
  },
  {
    id: 8,
    title: "What ANNs Cannot Do (Yet)",
    subtitle: "Not quite human",
    points: [
      "They don’t truly 'understand' meaning – they work on patterns, not feelings.",
      "They lack common sense, self-awareness and real-world experience.",
      "Take them far from their training data and they can fail in strange ways."
    ],
    image: b8,
    theme: "limits-brain"
  },
  {
    id: 9,
    title: "Types of Neural Networks",
    subtitle: "Different tools for different jobs",
    points: [
      "Feedforward networks: basic input → output learners.",
      "Convolutional Neural Networks (CNNs): great at images and vision tasks.",
      "Sequence models & Transformers: handle language, speech and time-based data."
    ],
    image: b9,
    theme: "types"
  },
  {
    id: 10,
    title: "Neural Networks in Everyday Life",
    subtitle: "Where you meet them",
    points: [
      "Face unlock, photo filters and auto-tagging pictures.",
      "Voice assistants and translation apps.",
      "Recommendations on shopping, music and video platforms.",
      "Medical imaging and self-driving car vision systems."
    ],
    theme: "real-life"
  },
  {
    id: 11,
    title: "Limits, Risks & the Road Ahead",
    subtitle: "Brains + machines together",
    points: [
      "ANNs need lots of data and computing power.",
      "They can learn human bias from data if we’re not careful.",
      "Best use: as powerful tools that assist human decision-making.",
      "Future: AI systems inspired by the brain, working alongside humans."
    ],
    theme: "future"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" }
  })
};

function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[index];

  const goNext = () => {
    if (index < slides.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="app-root">
      {/* Animated neuron background */}
      <div className="neuron-bg">
        <div className="neuron-node n1" />
        <div className="neuron-node n2" />
        <div className="neuron-node n3" />
        <div className="neuron-node n4" />
        <div className="neuron-node n5" />
      </div>
      <div className="overlay-gradient" />

      <header className="top-bar">
        <div className="top-title">The Brain & Artificial Neural Networks</div>
        <div className="top-meta">
          Slide {index + 1} / {slides.length}
        </div>
      </header>

      <main className="slide-container">
        <AnimatePresence custom={direction} mode="wait">
          <motion.section
            key={currentSlide.id}
            className={`slide-card theme-${currentSlide.theme}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div>
              <div className="slide-header">
                <h1 className="slide-title">{currentSlide.title}</h1>
                <p className="slide-subtitle">{currentSlide.subtitle}</p>
              </div>

              <ul className="slide-points">
                {currentSlide.points.map((p, i) => (
                  <li key={i} className="slide-point">
                    <span className="bullet-dot" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="slide-visual">
              {currentSlide.image && (
                <>
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="brain-image"
                  />
                  {/* Neuron twinkle only on first slide */}
                  {currentSlide.id === 1 && (
                    <>
                      <div className="neuron-dot nd1" />
                      <div className="neuron-dot nd2" />
                      <div className="neuron-dot nd3" />
                      <div className="neuron-dot nd4" />
                    </>
                  )}
                </>
              )}

              {!currentSlide.image && (
                <div className="visual-placeholder">
                  Add brain / ANN image here
                </div>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="nav-footer">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((index + 1) / slides.length) * 100}%` }}
          />
        </div>

        <div className="nav-buttons">
          <button
            className="nav-btn secondary"
            onClick={goPrev}
            disabled={index === 0}
          >
            ← Previous
          </button>
          <button
            className="nav-btn"
            onClick={goNext}
            disabled={index === slides.length - 1}
          >
            Next →
          </button>
        </div>

        <div className="hint-text">Use ← → arrow keys to navigate</div>
      </footer>
    </div>
  );
}

export default App;
