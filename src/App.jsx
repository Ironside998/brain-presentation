import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

import bclg from "./assets/bclg.jpg";
import b1 from "./assets/b1.jpg"; // hero brain image
import b3 from "./assets/b3.jpg";
import b5 from "./assets/b5.JPG";
import b6 from "./assets/b6.jpg";
import b9 from "./assets/b9.jpg";
import b10 from "./assets/b10.jpg";
import b11 from "./assets/b11.jpg";
import b12 from "./assets/b12.jpg";
import b13 from "./assets/b13.jpg";

// ───────────────── SLIDES DATA ─────────────────
const slides = [
  // New title slide (index 0)
  {
    id: 0,
    title: "The Brain: Unlocking the Secrets of the Mind",
    subtitle: (<>Artificial Neural Networks and the Human Brain<br/><br />Presented by:</>),
    points: [
      "Sayantoni Dey Sarkar",
      "A913159725081",
      "BA (Applied Psychology) Hons/Research",
      "1B",
      "BC109",
      "Communication Skills - 1"
    ],
    image: bclg,
    theme: "title" // special theme for mood lighting if you want
  },

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
    image: b10,
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
    image: b3,
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
    image: b6,
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
    image: b13,
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
    image: b12,
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
    image: b9,
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
    image: b11,
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
  const [neuronFiring, setNeuronFiring] = useState(false);

  const currentSlide = slides[index];

  const goNext = () => {
    if (index < slides.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
      setNeuronFiring(false);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
      setNeuronFiring(false);
    }
  };

  const triggerNeuronFire = () => {
    if (currentSlide.id !== 3) return;
    setNeuronFiring(true);
    setTimeout(() => setNeuronFiring(false), 700);
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
      {/* Background: neurons + particles */}
      <div className="neuron-bg">
        <div className="neuron-node n1" />
        <div className="neuron-node n2" />
        <div className="neuron-node n3" />
        <div className="neuron-node n4" />
        <div className="neuron-node n5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`bg-particle p${i + 1}`} />
        ))}
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
            {/* Slide number badge INSIDE the slide */}
            <div className="slide-number-badge">
              {index + 1} / {slides.length}
            </div>

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
              {/* Title slide: no special graphic for now */}
              {currentSlide.id === 0 && (
                <>
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="brain-image"
                  />
                </>
              )}

              {/* Slide 1: brain image + star neurons */}
              {currentSlide.id === 1 && (
                <>
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="brain-image"
                  />
                  <div className="neuron-dot nd1" />
                  <div className="neuron-dot nd2" />
                  <div className="neuron-dot nd3" />
                  <div className="neuron-dot nd4" />
                  <div className="neuron-dot nd5" />
                </>
              )}

              {/* Slide 3: clickable neuron that fires */}
              {currentSlide.id === 3 && (
                <div
                  className={`neuron-diagram ${
                    neuronFiring ? "firing" : ""
                  }`}
                  onClick={triggerNeuronFire}
                >
                  <div className="neuron-dendrites" />
                  <div className="neuron-soma" />
                  <div className="neuron-axon">
                    <span className="axon-pulse" />
                  </div>
                </div>
              )}

              {/* Slide 6: ANN pathway highlight */}
              {currentSlide.id === 6 && (
                <div className="ann-pathway">
                  <div className="ann-layer ann-input">
                    <div className="ann-node" />
                    <div className="ann-node" />
                    <div className="ann-node" />
                    <span className="ann-label">Input layer</span>
                  </div>
                  <div className="ann-layer ann-hidden">
                    <div className="ann-node" />
                    <div className="ann-node" />
                    <div className="ann-node" />
                    <div className="ann-node" />
                    <span className="ann-label">Hidden layer</span>
                  </div>
                  <div className="ann-layer ann-output">
                    <div className="ann-node" />
                    <span className="ann-label">Output</span>
                  </div>

                  <div className="ann-links">
                    <div className="ann-link pulse-1" />
                    <div className="ann-link pulse-2" />
                    <div className="ann-link pulse-3" />
                  </div>
                  <p className="ann-hint">
                    Information flows left → right as the network makes a
                    decision.
                  </p>
                </div>
              )}

              {/* Any other slide with an image (future ones) */}
              {currentSlide.id !== 1 &&
                currentSlide.id !== 3 &&
                currentSlide.id !== 6 &&
                currentSlide.id !== 0 &&
                currentSlide.image && (
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="generic-image"
                  />
                )}

              {/* Placeholder if no visual yet */}
              {!currentSlide.image &&
                currentSlide.id !== 1 &&
                currentSlide.id !== 3 &&
                currentSlide.id !== 6 && (
                  <div className="visual-placeholder">
                    Visual coming soon…
                  </div>
                )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="nav-footer">
        <div className="progress-track">
          <div
            key={index}
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
