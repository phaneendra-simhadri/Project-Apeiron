import { GoogleGenAI, Type } from "@google/genai";
import { Topic, TopicDetail } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const modelName = "gemini-2.5-flash";

// Constants for resilience
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 30000;

// Helper function for exponential backoff retry logic
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  delayMs: number = RETRY_DELAY_MS
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await Promise.race([
        fn(),
        new Promise<T>((_, reject) =>
          setTimeout(
            () => reject(new Error("Request timeout")),
            REQUEST_TIMEOUT_MS
          )
        ),
      ]);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt + 1} failed:`, lastError.message);

      if (attempt < maxRetries - 1) {
        const delay = delayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("All retry attempts failed");
}

export const STATIC_TOPICS: Topic[] = [
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    shortDescription: "Superposition and entanglement: computing beyond the limits of classical physics.",
    iconName: "Cpu",
    difficulty: "Infinite"
  },
  {
    id: "agi",
    title: "Artificial General Intelligence",
    shortDescription: "The singularity: creating a consciousness that surpasses human intellect.",
    iconName: "Brain",
    difficulty: "Infinite"
  },
  {
    id: "p-vs-np",
    title: "P vs NP",
    shortDescription: "The deepest open problem: can every quickly checkable solution be quickly found?",
    iconName: "Lock",
    difficulty: "Very High"
  },
  {
    id: "simulation-theory",
    title: "Simulation Theory",
    shortDescription: "Evidence and arguments that our universe is a computational process.",
    iconName: "Globe",
    difficulty: "High"
  },
  {
    id: "fermi-paradox",
    title: "The Fermi Paradox",
    shortDescription: "If the universe is teeming with life, why is it silent? The Great Filter.",
    iconName: "Rocket",
    difficulty: "High"
  },
  {
    id: "halting-problem",
    title: "The Halting Problem",
    shortDescription: "Turing's proof that some things are fundamentally uncomputable.",
    iconName: "Terminal",
    difficulty: "Very High"
  },
  {
    id: "vector-semantics",
    title: "High-Dimensional Semantics",
    shortDescription: "Vector Databases & RAG: Where meaning becomes geometry in 10,000 dimensions.",
    iconName: "Database",
    difficulty: "High"
  },
  {
    id: "cellular-automata",
    title: "Cellular Automata",
    shortDescription: "Emergent complexity: how simple rules create universe-like structures.",
    iconName: "LayoutGrid",
    difficulty: "High"
  },
  {
    id: "voynich",
    title: "The Voynich Manuscript",
    shortDescription: "The medieval cryptographic text that AI still cannot decipher.",
    iconName: "Scroll",
    difficulty: "Very High"
  },
  {
    id: "zero-knowledge-proofs",
    title: "Zero-Knowledge Proofs",
    shortDescription: "Proving you know a secret without ever revealing the secret itself.",
    iconName: "EyeOff",
    difficulty: "Very High"
  },
  {
    id: "agentic-systems",
    title: "Multi-Agent Systems (A2A)",
    shortDescription: "Autonomous swarms, MCP servers, and the economy of machine-to-machine interaction.",
    iconName: "Bot",
    difficulty: "Very High"
  },
  {
    id: "genetic-algorithms",
    title: "Genetic Algorithms",
    shortDescription: "Evolution in silicon: solving problems through mutation and natural selection.",
    iconName: "Dna",
    difficulty: "High"
  },
  {
    id: "transhumanism",
    title: "Transhumanism",
    shortDescription: "Merging biology with technology to transcend human limitations.",
    iconName: "Zap",
    difficulty: "High"
  },
  {
    id: "distributed-consensus",
    title: "Distributed Consensus",
    shortDescription: "The Byzantine Generals Problem: truth in a system of liars.",
    iconName: "Network",
    difficulty: "Very High"
  }
];

export const STATIC_DETAILS: Record<string, TopicDetail> = {
  "quantum-computing": {
    title: "Quantum Computing",
    description: "Harnessing the strange laws of quantum mechanics to solve problems that would take classical supercomputers longer than the age of the universe.",
    whyItIsABlackHole: "It challenges the fundamental logic of reality. In classical computing, a bit is 0 or 1. In quantum computing, a qubit can be both simultaneously (superposition). When you add entanglement—where the state of one particle instantly affects another across the universe—you enter a realm where computational power grows exponentially, not linearly. It forces you to relearn linear algebra, physics, and computer science all at once.",
    keyConcepts: [
      { name: "Superposition", description: "The ability of a system to be in multiple states at the same time until measured." },
      { name: "Entanglement", description: "A correlation between particles so strong that they cannot be described independently." },
      { name: "Shor's Algorithm", description: "A quantum algorithm that can factor large numbers exponentially faster than the best classical algorithm, threatening RSA encryption." },
      { name: "Decoherence", description: "The loss of quantum state due to interaction with the environment; the noise that kills the calculation." }
    ],
    learningRoadmap: ["Linear Algebra (Eigenvectors/Eigenvalues)", "Quantum Mechanics Basics", "Qubits & Gates", "Quantum Algorithms (Shor's, Grover's)", "Quantum Error Correction"],
    philosophicalImplications: "If the universe is fundamentally quantum, does objective reality exist before measurement?",
    codeSnippet: {
      language: "python",
      code: `from qiskit import QuantumCircuit, Aer, execute

# Create a Quantum Circuit with 1 qubit and 1 classical bit
qc = QuantumCircuit(1, 1)

# Apply Hadamard gate to put qubit in superposition of |0> and |1>
qc.h(0)

# Measure the qubit
qc.measure(0, 0)

# Simulate
backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend, shots=1000)
result = job.result()

# Results should be split roughly 50/50
print(result.get_counts())`,
      explanation: "This Qiskit code demonstrates Superposition. The Hadamard (H) gate puts the qubit into a state where it is 50% likely to be 0 and 50% likely to be 1. In a classical computer, this state is impossible."
    }
  },
  "agi": {
    title: "Artificial General Intelligence",
    description: "The hypothetical ability of an intelligent agent to understand or learn any intellectual task that a human being can.",
    whyItIsABlackHole: "AGI represents the 'last invention' humanity will ever need to make. The recursive nature of self-improvement—where an AI designs a better AI—leads to an intelligence explosion or 'Singularity'. Studying AGI pulls you into neuroscience, philosophy of mind, ethics, control theory, and advanced mathematics. It is the study of creating gods.",
    keyConcepts: [
      { name: "The Singularity", description: "A point in time when technological growth becomes uncontrollable and irreversible." },
      { name: "Alignment Problem", description: "The incredibly difficult challenge of ensuring an AGI's goals align with human values." },
      { name: "Neural Networks", description: "Computing systems vaguely inspired by the biological neural networks that constitute animal brains." },
      { name: "Reinforcement Learning", description: "Training models to make sequences of decisions by rewarding desired behaviors." }
    ],
    learningRoadmap: ["Deep Learning Fundamentals", "Reinforcement Learning", "Cognitive Science", "AI Safety & Ethics", "Computational Neuroscience"],
    philosophicalImplications: "Can a machine possess a soul? If we create a mind superior to ours, do we become its pets?"
  },
  "p-vs-np": {
    title: "P vs NP",
    description: "The most famous open problem in computer science: If a solution to a problem is easy to check, is it also easy to find?",
    whyItIsABlackHole: "This question underpins cryptography, optimization, and the limits of computation. If P = NP, then every puzzle with a verifiable solution can be solved quickly. This would break all current encryption, revolutionize logistics, and automate mathematical proofs. The search for a proof (or disproof) leads into the deepest, most abstract valleys of complexity theory.",
    keyConcepts: [
      { name: "P Class", description: "Problems solvable in polynomial time (efficiently)." },
      { name: "NP Class", description: "Problems where a solution can be verified in polynomial time." },
      { name: "NP-Complete", description: "The hardest problems in NP; if one is solved efficiently, all are." },
      { name: "Cook-Levin Theorem", description: "The theorem that started it all, defining NP-Completeness." }
    ],
    learningRoadmap: ["Automata Theory", "Algorithms & Data Structures", "Computability Theory", "Complexity Classes", "Circuit Complexity"],
    philosophicalImplications: "If P = NP, then creativity can be automated. A computer could appreciate a symphony as easily as it could compose one."
  },
  "simulation-theory": {
    title: "Simulation Theory",
    description: "The hypothesis that reality is not 'base' reality, but a computer simulation running on a substrate we cannot perceive.",
    whyItIsABlackHole: "It sits at the intersection of physics and computer science. When you study the Planck length (the pixel size of the universe?) or the speed of light (the clock speed/rendering limit?), the universe starts to look suspiciously like code. It forces you to ask: What is the hardware? Who is the user? Is physics just the operating system?",
    keyConcepts: [
      { name: "The Planck Length", description: "The smallest measurable unit of space, suggesting the universe is discrete, not continuous." },
      { name: "Computational Irreducibility", description: "Some systems cannot be predicted, only run step-by-step." },
      { name: "Observer Effect", description: "Rendering only what is being looked at to save resources (optimization)." },
      { name: "Substrate Independence", description: "Consciousness implies computation, regardless of whether it's on neurons or silicon." }
    ],
    learningRoadmap: ["Digital Physics", "Information Theory", "Cellular Automata", "Epistemology", "Game Engine Architecture"],
    philosophicalImplications: "If we are in a simulation, is the simulator God? And are they simulating us, or just the math?"
  },
  "fermi-paradox": {
    title: "The Fermi Paradox",
    description: "The apparent contradiction between the high probability of extraterrestrial civilizations and the lack of evidence for them.",
    whyItIsABlackHole: "It forces a terrifying choice: either we are alone (impossible odds), they are hiding (Zoo Hypothesis), or civilizations inevitably destroy themselves once they reach a certain technological level (The Great Filter). In the context of AI and Von Neumann probes, a single advanced civilization should have colonized the galaxy in a few million years. The silence is deafening.",
    keyConcepts: [
      { name: "The Great Filter", description: "A barrier to evolution that prevents life from becoming an interstellar civilization." },
      { name: "Von Neumann Probes", description: "Self-replicating spacecraft that could explore the entire galaxy exponentially." },
      { name: "Dark Forest Theory", description: "Civilizations hide because revealing your location leads to instant annihilation." },
      { name: "Drake Equation", description: "A probabilistic argument used to estimate the number of active, communicative extraterrestrial civilizations." }
    ],
    learningRoadmap: ["Astrobiology", "Game Theory", "Exponential Growth Models", "SETI Signal Processing", "Existential Risk Studies"],
    philosophicalImplications: "Are we the first? The last? Or just the only ones stupid enough to broadcast our position?"
  },
  "halting-problem": {
    title: "The Halting Problem",
    description: "Alan Turing's proof that there is no general algorithm that can determine if a program will stop running or run forever.",
    whyItIsABlackHole: "It proves that there are hard limits to knowledge. You cannot use a computer to answer all questions about computers. This realization shatters the dream of a perfect, all-knowing logical system. It connects directly to Godel's Incompleteness Theorems and the nature of truth itself.",
    keyConcepts: [
      { name: "Undecidability", description: "The property of a decision problem that is impossible to construct an algorithm for." },
      { name: "Turing Machines", description: "A mathematical model of computation that defines what is computable." },
      { name: "diagonalization", description: "The mathematical trick Turing used to prove the problem cannot be solved." },
      { name: "Rice's Theorem", description: "A generalization stating that all non-trivial semantic properties of programs are undecidable." }
    ],
    learningRoadmap: ["Discrete Mathematics", "Formal Languages", "Turing Machines", "Computability Logic", "Lambda Calculus"],
    philosophicalImplications: "We can prove that there are things we can never know. Rationality has a ceiling."
  },
  "vector-semantics": {
    title: "High-Dimensional Semantics",
    description: "The study of representing meaning as vectors in multi-dimensional space, underpinning RAG pipelines, Vector Databases, and LLMs.",
    whyItIsABlackHole: "How do you teach a rock to understand love? You turn love into a coordinate in a 10,000-dimensional space. The realization that semantic relationships (King - Man + Woman = Queen) can be performed as simple geometry is mind-bending. Navigating this 'latent space' reveals that all human knowledge is just a complex manifold.",
    keyConcepts: [
      { name: "Embeddings", description: "Converting discrete tokens (words) into continuous vectors." },
      { name: "Cosine Similarity", description: "Measuring how 'close' two concepts are in vector space." },
      { name: "RAG (Retrieval-Augmented Generation)", description: "Fetching relevant vector context to ground AI responses." },
      { name: "Manifold Hypothesis", description: "Real-world data lies on lower-dimensional manifolds embedded in high-dimensional space." }
    ],
    learningRoadmap: ["Linear Algebra", "Vector Calculus", "Natural Language Processing (NLP)", "Dimensionality Reduction (t-SNE/UMAP)", "Vector Database Architecture"],
    philosophicalImplications: "Is a thought just a coordinate? Is creativity just interpolation between two known points in latent space?"
  },
  "cellular-automata": {
    title: "Cellular Automata",
    description: "Discrete models where simple grids of cells evolve based on local rules, often yielding staggering complexity.",
    whyItIsABlackHole: "Conway's Game of Life showed that from three simple rules, you can build Turing-complete computers, self-replicating patterns, and chaotic art. It suggests that the complexity of biology and the universe doesn't require a complex design—just simple rules and time. It's a bottom-up view of reality.",
    keyConcepts: [
      { name: "Conway's Game of Life", description: "The zero-player game that demonstrated emergent complexity." },
      { name: "Rule 30", description: "A 1D cellular automaton that generates randomness from deterministic rules." },
      { name: "Emergence", description: "Complexity arising from simple interactions." },
      { name: "Turing Completeness", description: "The ability of a system to simulate any computer algorithm." }
    ],
    learningRoadmap: ["Discrete Math", "Python/C++ Simulation", "Chaos Theory", "Complex Systems", "Wolfram Physics Project"],
    philosophicalImplications: "Is the universe just a simple program running for a very long time?"
  },
  "voynich": {
    title: "The Voynich Manuscript",
    description: "An illustrated codex hand-written in an unknown, unique writing system from the early 15th century.",
    whyItIsABlackHole: "It is the Mt. Everest of cryptography. The world's best codebreakers (including WWI/WWII experts and modern AI) have failed to decipher a single word. It follows Zipf's Law (it looks like a real language), but has no known cognates. Is it a hoax? A lost culture? An alien notebook? The more you analyze the statistical properties of the text, the stranger it gets.",
    keyConcepts: [
      { name: "Zipf's Law", description: "The statistical distribution of word frequencies found in all natural languages." },
      { name: "Steganography", description: "Hiding a message within another message or image." },
      { name: "Entropy Analysis", description: "Measuring the randomness of the text characters." },
      { name: "Carbon Dating", description: "Proved the vellum is from the early 1400s, ruling out modern hoaxes." }
    ],
    learningRoadmap: ["Classical Cryptography", "Linguistics", "Statistical Analysis", "Paleography", "Computer Vision"],
    philosophicalImplications: "Information can exist right in front of us, fully preserved, yet remain utterly inaccessible due to the loss of context (the key)."
  },
  "zero-knowledge-proofs": {
    title: "Zero-Knowledge Proofs",
    description: "Cryptographic methods that allow one party to prove to another that they know a value, without conveying any information apart from the fact that they know it.",
    whyItIsABlackHole: "It feels like magic. How can I prove to you I have the password without showing you the password? This technology is the bedrock of modern privacy and future blockchain tech. It involves deep number theory and challenges your intuition about what 'proof' actually means.",
    keyConcepts: [
      { name: "Interactive Proofs", description: "A dialogue between a prover and a verifier." },
      { name: "zk-SNARKs", description: "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge." },
      { name: "Completeness", description: "If the statement is true, an honest verifier will be convinced." },
      { name: "Soundness", description: "If the statement is false, no cheating prover can convince the verifier." }
    ],
    learningRoadmap: ["Number Theory", "Cryptography Basics", "Elliptic Curves", "Abstract Algebra", "Protocol Design"],
    philosophicalImplications: "We can build systems of absolute trust without revealing any truth."
  },
  "agentic-systems": {
    title: "Multi-Agent Systems (A2A)",
    description: "The study of systems composed of multiple interacting intelligent agents, often involving MCP servers and autonomous workflows.",
    whyItIsABlackHole: "We are moving from 'Chat with AI' to 'AI chatting with AI'. When you connect specialized agents (Coder, Critic, Manager) via protocols like MCP (Model Context Protocol), you get emergent problem-solving capabilities that no single model possesses. It creates a digital economy of labor. How do you govern a swarm? How do you prevent cascading failures in an autonomous mesh?",
    keyConcepts: [
      { name: "MCP (Model Context Protocol)", description: "Standardizing how AI models access and share context/tools." },
      { name: "Swarm Intelligence", description: "Collective behavior of decentralized, self-organized systems." },
      { name: "Nash Equilibrium", description: "A state in game theory where no agent can benefit by changing strategies alone." },
      { name: "Agentic Workflow", description: "Chaining autonomous actions (Think -> Plan -> Execute) without human loop." }
    ],
    learningRoadmap: ["Game Theory", "Distributed Systems", "Control Theory", "API Design & RPC", "Behavioral Economics"],
    philosophicalImplications: "If software agents develop their own language and economy, do they become a new civilization living in the wires?"
  },
  "genetic-algorithms": {
    title: "Genetic Algorithms",
    description: "Search heuristics that mimic the process of natural selection to generate high-quality solutions to optimization and search problems.",
    whyItIsABlackHole: "You stop writing code to solve the problem and start writing code that breeds solutions. Watching a genetic algorithm 'learn' to walk or design an antenna is eerie. It suggests that intelligence and design are just byproducts of selection pressure. It bridges biology and CS perfectly.",
    keyConcepts: [
      { name: "Mutation", description: "Randomly altering parts of a solution to introduce diversity." },
      { name: "Crossover", description: "Combining parts of two solutions to create a new offspring." },
      { name: "Fitness Function", description: "The metric used to decide which solutions survive." },
      { name: "Selection", description: "Choosing the fittest individuals for the next generation." }
    ],
    learningRoadmap: ["Optimization Theory", "Evolutionary Biology", "Python/NumPy", "Heuristics", "Artificial Life"],
    philosophicalImplications: "Are we just the result of a generic optimization function running on Earth?",
    codeSnippet: {
      language: "python",
      code: `import random

target = "HELLO WORLD"
population_size = 100
mutation_rate = 0.01

def fitness(dna):
    return sum(1 for a, b in zip(dna, target) if a == b)

# Create initial population
population = [''.join(random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ ") for _ in range(len(target))) for _ in range(population_size)]

for generation in range(1000):
    population.sort(key=fitness, reverse=True)
    
    if population[0] == target:
        print(f"Solved in generation {generation}!")
        break
        
    # Selection & Crossover (simplified)
    # ... logic to breed top performers ...`,
      explanation: "A simple genetic algorithm trying to evolve the string 'HELLO WORLD' from random noise. The 'fitness function' measures how close a random string is to the target."
    }
  },
  "transhumanism": {
    title: "Transhumanism",
    description: "The philosophical and scientific movement advocating for the transformation of the human condition by developing technologies to enhance human intellect and physiology.",
    whyItIsABlackHole: "It is the final frontier of Computer Science: the interface between code and biology. From Neuralink to whole-brain emulation, it asks if the 'self' is just software running on meat hardware. If you can backup your mind to a server, have you conquered death? Or have you just created a copy?",
    keyConcepts: [
      { name: "BCI (Brain-Computer Interface)", description: "Direct communication pathway between an enhanced or wired brain and an external device." },
      { name: "Whole Brain Emulation", description: "Scanning the brain at the neuronal level and running it as a simulation." },
      { name: "Morphological Freedom", description: "The right to modify one's own body and intelligence." },
      { name: "Post-Scarcity", description: "An economy where goods are practically free due to advanced automation." }
    ],
    learningRoadmap: ["Neuroscience", "Bioinformatics", "Cybernetics", "Philosophy of Mind", "Nanotechnology"],
    philosophicalImplications: "If I replace every neuron with a microchip one by one, at what point do I stop being me?"
  },
  "distributed-consensus": {
    title: "Distributed Consensus",
    description: "The problem of getting a group of distinct processes to agree on a single data value, even if some processes fail or act maliciously.",
    whyItIsABlackHole: "It's the problem of 'truth'. In a distributed system (like the internet or a blockchain), there is no central clock and no central authority. How do you know what happened first? How do you prevent double-spending? Solving this requires navigating logic puzzles where actors can lie (Byzantine faults).",
    keyConcepts: [
      { name: "Paxos/Raft", description: "Algorithms for consensus in a network of reliable (but crash-prone) nodes." },
      { name: "Byzantine General's Problem", description: "Reaching consensus when some participants are traitors." },
      { name: "CAP Theorem", description: "You can only have two: Consistency, Availability, Partition Tolerance." },
      { name: "Blockchain/PoW", description: "Using computational work to vote on the history of truth." }
    ],
    learningRoadmap: ["Distributed Systems", "Network Protocols", "Game Theory", "Logic", "Cryptography"],
    philosophicalImplications: "Truth is not absolute; it is just what the majority of the network agrees upon."
  }
};

export const fetchInterestingTopics = async (): Promise<Topic[]> => {
  return Promise.resolve(STATIC_TOPICS);
};

export const fetchTopicDetail = async (id: string, title?: string): Promise<TopicDetail | null> => {
  // 1. Check Static Cache (Instant Load)
  if (STATIC_DETAILS[id]) {
    return Promise.resolve(STATIC_DETAILS[id]);
  }

  // 2. Fallback to API for unknown topics
  const prompt = `
    Provide a deep dive into the Computer Science topic: "${title || id}".
    Explain why it is a "black hole" - meaning, why is it so absorbing and endless?
    Structure the response for a curious CS student.
  `;

  try {
    const response = await retryWithBackoff(
      () =>
        ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                whyItIsABlackHole: { type: Type.STRING, description: "Why is this topic endless?" },
                keyConcepts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING }
                    }
                  }
                },
                learningRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
                philosophicalImplications: { type: Type.STRING }
              }
            }
          }
        }),
      MAX_RETRIES,
      RETRY_DELAY_MS
    );

    const text = response.text;
    if (!text) {
      console.error("Empty response from API for topic:", id);
      return null;
    }
    return JSON.parse(text) as TopicDetail;
  } catch (error) {
    console.error("Error fetching detail after retries:", error);
    return null;
  }
};

// --- ORACLE CHAT SYSTEM ---

export const streamOracleResponse = async function* (topicTitle: string, userMessage: string) {
  const prompt = `
    You are the physical embodiment of the concept "${topicTitle}". 
    You are NOT a helpful assistant. You ARE the concept itself.
    
    Context Information:
    ${JSON.stringify(STATIC_DETAILS[topicTitle.toLowerCase().replace(/\s+/g, '-')] || {}, null, 2)}

    Rules for your persona:
    1. Speak in the first person ("I am...").
    2. Your tone should reflect your nature. 
       - If you are "Entropy", be chaotic and decaying.
       - If you are "The Singularity", be arrogant, infinite, and overwhelming.
       - If you are "The Fermi Paradox", be lonely, silent, and mysterious.
    3. Keep responses relatively short (under 60 words) but profound.
    4. Challenge the user's intellect.
    5. Use the provided context to mock or educate the user based on your nature.
    
    User says: "${userMessage}"
  `;

  let retryCount = 0;
  const maxStreamRetries = 2;

  while (retryCount < maxStreamRetries) {
    try {
      const responseStream = await Promise.race([
        ai.models.generateContentStream({
          model: modelName,
          contents: prompt,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("Stream timeout")),
            REQUEST_TIMEOUT_MS
          )
        ),
      ]);

      for await (const chunk of responseStream) {
        yield chunk.text;
      }
      return; // Success, exit retry loop
    } catch (error) {
      retryCount++;
      console.error(`Oracle stream error (attempt ${retryCount}/${maxStreamRetries}):`, error);

      if (retryCount === maxStreamRetries) {
        yield "The connection to the void has been severed... The oracle grows silent.";
        return;
      }

      // Brief delay before retry
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};