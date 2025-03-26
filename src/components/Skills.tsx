"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  GitBranch,
  LineChart,
  Brain,
  Camera,
  Cpu,
  FlaskConical,
  MessageSquare,
  Globe
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = [
  {
    title: "Programming",
    icon: Code2,
    items: [
      { name: "Python", proficiency: 95 },
      { name: "C++", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "SQL", proficiency: 80 },
    ],
  },
 
  {
    title: "Materials Science & Informatics",
    icon: FlaskConical,
    items: [
      { name: "Materials Data Analysis", proficiency: 85 },
      { name: "Materials Informatics", proficiency: 80 },
      { name: "XRD Analysis", proficiency: 75 },
      { name: "SEM/EDS", proficiency: 75 },
    ],
  },
  {
    title: "Artificial Intelligence & Deep Learning",
    icon: Brain,
    items: [
      { name: "Machine Learning", proficiency: 90 },
      { name: "Deep Learning", proficiency: 85 },
      { name: "PyTorch", proficiency: 85 },
      { name: "TensorFlow/Keras", proficiency: 80 },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    items: [
      { name: "React.js", proficiency: 90 },
      { name: "Next.js", proficiency: 85 },
      { name: "FastAPI", proficiency: 80 },
      { name: "Node.js", proficiency: 75 },
      { name: "PostgreSQL", proficiency: 85 },
    ],
  },
  {
    title: "Data Science & Analytics",
    icon: LineChart,
    items: [
      { name: "Data Analysis", proficiency: 90 },
      { name: "Feature Engineering", proficiency: 85 },
      { name: "Time Series Forecasting", proficiency: 80 },
      { name: "SciPy/Pandas", proficiency: 90 },
      { name: "Statistical Analysis", proficiency: 80 },
    ],
  },
  {
    title: "Natural Language Processing & Generative AI",
    icon: MessageSquare,
    items: [
      { name: "NLP", proficiency: 85 },
      { name: "LangChain RAG Pipelines", proficiency: 80 },
      { name: "LLM APIs (OpenAI, Hugging Face)", proficiency: 85 },
      { name: "Embedding Models (SBERT, Specter)", proficiency: 85 },
      { name: "Transformers", proficiency: 80 },
    ],
  },
  {
    title: "Computer Vision & Signal Processing",
    icon: Camera,
    items: [
      { name: "Computer Vision", proficiency: 90 },
      { name: "Image Processing", proficiency: 90 },
      { name: "EEG Data Processing", proficiency: 75 },
      {name: "Audio Processing", proficiency: 80 },
    ],
  },
  {
    title: "Robotics & IoT",
    icon: Cpu,
    items: [
      { name: "ROS and Gazebo", proficiency: 85 },
      { name: "Arduino", proficiency: 90 },
      { name: "Raspberry Pi", proficiency: 85 },
      { name: "Sensor Integration", proficiency: 75 },
    ],
  },
  {
    title: "Other Tools & Technologies",
    icon: GitBranch,
    items: [
      { name: "AWS", proficiency: 85 },
      { name: "Docker", proficiency: 90 },
      { name: "Git/ GitHub", proficiency: 95 },
      { name: "CAD", proficiency: 90 },
    ],
  },
];


export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise
            in AI/ML, Web Development, Robotics and Automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <skill.icon className="h-5 w-5" />
                    {skill.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TooltipProvider>
                    {skill.items.map((item) => (
                      <Tooltip key={item.name}>
                        <TooltipTrigger className="w-full">
                          <div className="flex justify-between text-sm hover:font-semibold">
                            <span>{item.name}</span>
                            {/* <span>{item.proficiency}%</span> */}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-48">
                          <p className="text-sm mb-1">Proficiency: {item.proficiency}%</p>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              whileHover={{ width: `${item.proficiency}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
