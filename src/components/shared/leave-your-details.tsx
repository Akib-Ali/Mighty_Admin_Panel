import React from 'react'
import ContactForm from './contact-form'

const LeaveYourDetails = () => {
  return (
    <div className="container mx-auto">
    <div className="relative py-20 bg-[url('/images/simple-step-bg.png')] bg-cover bg-center bg-no-repeat">
    <h1 className="text-2xl md:text-3xl text-white font-bold flex items-center justify-center gap-2 uppercase mb-8">
      <span>
        <img
          src="/images/icons/heading-gold-left.png"
          alt="icon"
          className="w-6 h-6"
        />
      </span>
      Leave Your Details Here
      <span>
        <img
          src="/images/icons/heading-gold-right.png"
          alt="icon"
          className="w-6 h-6"
        />
      </span>
    </h1>
    <ContactForm />
    </div>
    </div>
  )
}

export default LeaveYourDetails