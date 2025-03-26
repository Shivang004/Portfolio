"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [ 
  {
    title: "EMG Controlled Shooting Game",
    description: "Designed and implemented a Unity-based shooting game controlled by real-time electromyography (EMG) signals. The project involved processing EMG data with Butterworth filters, Hilbert transforms, and FFT for accurate gesture classification, such as shoot, reload, and aim. Additionally, a Kalman filter was applied to 9-axis sensor data to ensure precise control of in-game actions, resulting in an immersive and responsive gameplay experience.",
    image: "https://images.unsplash.com/photo-1571244067911-c3a60cbb1621",
    tags: ["EMG", "Signal Processing", "Game Development", "Machine Learning"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Trend Analysis of MRS Conference Abstracts (2011-2024)",
    description: "Extracted and analyzed over 100K MRS conference abstracts spanning 13 years to uncover evolving research trends in materials science. Employed state-of-the-art NLP techniques including SBERT for generating 384-dimensional embeddings, UMAP for dimensionality reduction, and clustering algorithms like HBDSCAN. Additionally, used LLaMa APIs for keyword unification, facilitating a comprehensive trend analysis that reveals key research directions over time.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    tags: ["NLP", "SBERT", "Data Science", "Trend Analysis"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  
  {
    title: "Autonomous Nano Drones Navigation",
    description: "Developed an optimized semantic segmentation model for nano drones to enable real-time obstacle detection and navigation in indoor environments. Simulated the Crazyflie 2.1 in Gazebo and controlled it via ROS, while fine-tuning models like LRASPP MobileNetV3 on a custom indoor dataset. Achieved an inference time of 0.12 seconds and a mIOU of 52.9% on a Raspberry Pi Zero, demonstrating the model's suitability for edge AI applications.",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9f1",
    tags: ["ROS", "Gazebo", "Edge AI", "Embedded Systems"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Energy Optimization using SARIMA-GARCH",
    description: "Implemented a hybrid time-series forecasting model that combines SARIMA and GARCH to optimize energy consumption patterns. The approach involved capturing seasonal trends and volatility in day-ahead load forecasting, ultimately achieving a mean absolute percentage error (MAPE) of 8.6%. This model aids in efficient resource management and cost optimization by accurately predicting future energy demands.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    tags: ["Time Series", "Forecasting", "SARIMA", "GARCH"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Failure Analysis of Connecting Rod Wear",
    description: "Conducted an in-depth failure analysis of connecting rods operating under high-stress conditions, focusing on wear mechanisms and fatigue failure. Utilized advanced microscopy techniques like SEM and EDS for microstructural analysis to identify material defects. The study culminated in actionable design improvements aimed at enhancing the durability and performance of the components in demanding applications.",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
    tags: ["Materials Science", "Failure Analysis", "Wear Mechanism", "SEM", "EDS"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Voice Morph Companion with LLM Integration",
    description: "Developed an interactive voice-based system by integrating large language models (LLMs) for natural speech interactions. The project combined a Transformer-based chatbot with an RNN-based automatic speech recognition (ASR) system, further enhanced by fine-tuning OpenAI Whisper on a specialized dataset. This system, deployed on Raspberry Pi and Arduino Nano BLE, facilitates real-time, user-friendly voice-controlled interactions.",
    image: "https://images.unsplash.com/photo-1581091226825-f30e1b67c43b",
    tags: ["ASR", "RNN", "Edge AI", "Embedded Systems"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "ChatBot using RNNs with Attention Mechanism",
    description: "Built an intelligent chatbot leveraging advanced RNN architectures with attention mechanisms to enhance intent recognition and response accuracy. The model, trained on conversational datasets processed using NLTK and Spacy, achieved 83% accuracy in understanding and generating responses.",
    image: "https://images.unsplash.com/photo-1603985524005-4625c28f5970",
    tags: ["Chatbot", "NLP", "RNN", "Attention"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Motion Video Saliency using YOLO & SAM2",
    description: "Developed a robust motion video saliency pipeline by integrating YOLO for real-time object detection with SAM2 for precise segmentation. The system dynamically resets inference states and reinitializes detection processes to handle new object appearances, ensuring seamless tracking and accurate segmentation of moving objects in video streams.",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    tags: ["YOLO", "SAM2", "Computer Vision", "Tracking"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Dynamic Agentic RAG with PATHWAY",
    description: "Designed and implemented a multi-agent Retrieval-Augmented Generation (RAG) system using the Pathway framework to autonomously retrieve, synthesize, and deliver context-rich responses. Leveraged vector databases, embedding models, and LangChain tools to refine search results, enhance query handling, and ensure resilience through multi-agent collaboration and robust error handling mechanisms.",
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    tags: ["RAG", "LangChain", "Vector DB", "LLMs"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "Interactive Websites for IITK Clubs",
    description: "Developed websites for Public Policy and Opinion Cell, Policy Conclave, Electronics Club, and Adventure Sports Club using Figma, React,Next.js and Node.js, ensuring that each site meets specific organizational needs and user engagement goals ",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tags: ["React.js", "Next.js", "Figma", "Node.js"],
    github: "https://github.com/your-repo",
    demo: "https://demo.com",
  },
  {
    title: "MathData: Linear Regression for Predictive Modeling",
    description: "Acquired proficiency in Python libraries including Numpy, Pandas, Matplotlib, Seaborn, and basics of Machine Learning.Conducted linear regression analysis on the Housing Prices dataset to gain practical experience in data analysis and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tags: ["MathData", "Linear Regression", "Predictive Modeling", "Python"],
    github: "https://github.com/your-repo",
    demo: "",
  },
  {
    title: "E-commerce portal",
    description: "Developed comprehensive E-commerce porta integrating Frontend and Backend systems, featuring a dynamic React-based user interface, robust Node.js-powered REST APIs, a scalable MongoDB database, and secure deployment on Vercel for optimal performance. ",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tags: ["React.js", "Next.js", "Express.js", "Node.js", "PostgreSQL", "RestAPI"],
    github: "https://github.com/your-repo",
    demo: "https://demo.com",
  },
];


export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my most impactful projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="transition-shadow hover:shadow-lg" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button variant="outline" size="sm" className="transition-shadow hover:shadow-lg" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
