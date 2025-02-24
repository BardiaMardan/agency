'use client'

import { ContactUs } from '@/actions/content.actions'
import { motion } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import Swal from 'sweetalert2'



const Contact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
      const formData = new FormData(event.currentTarget)

      const fullName = formData.get('fullName') as string
      const email = formData.get('email') as string
      const title = formData.get('title') as string
      const message = formData.get('message') as string
      
      await ContactUs(fullName, email, title, message)
      Swal.fire({
        title: 'Success',
        text: 'Your message successfully received !',
        icon: 'success',
        confirmButtonText: 'Done',
        background: '#111',
        color: '#fff',
      })
    } catch (error: any) {
      setError(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12">Get in Touch</h2>
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            onSubmit={handelSubmit}
          >
            <div>
              <label htmlFor="fullName" className="block text-secondary mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="w-full p-2 bg-primary/50 border border-secondary/30 rounded-md text-secondary" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-secondary mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 bg-primary/50 border border-secondary/30 rounded-md text-secondary" required />
            </div>
            <div>
              <label htmlFor="title" className="block text-secondary mb-2">Title</label>
              <input type="text" id="title" name="title" className="w-full p-2 bg-primary/50 border border-secondary/30 rounded-md text-secondary" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-secondary mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full p-2 bg-primary/50 border border-secondary/30 rounded-md text-secondary" required></textarea>
            </div>
            {error && <p className="text-red-400 text-center">*{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-special text-secondary rounded-md hover:bg-spotlight transition-colors flex justify-center items-center"
                disabled={isLoading}
              >
                {
                  isLoading ? <BiLoaderCircle className='animate-spin' /> : 'Send Message'
                }

              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
