'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { Project } from '@/types/project.types'
import { BsEye } from 'react-icons/bs'
import Image from 'next/image';

type ProjectsProps = {
  projects: Project[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 bg-primary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary/50 backdrop-blur-lg rounded-lg overflow-hidden"
            >
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                width={500}  
                height={192}
                className="object-cover" 
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary mb-2">{project.title}</h3>
                <p className="text-text-primary mb-4">{project.description}</p>
                <div className='flex justify-between items-center'>
                  <span className="text-special text-sm">{project.service}</span>
                  <a className="text-special flex items-center gap-2" href={project.demo}>
                    Demo
                    <BsEye />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
