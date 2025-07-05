import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import useAuthStore from '../../store/useAuthStore'

const BecomeEducatorPage = () => {
  const {authUser} = useAuthStore();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: authUser.name,
    email: authUser.email,
    bio: ''
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const {requestForInstructor, isRequesting} = useUserStore();

  const handleSubmit = async(e) => {
    e.preventDefault()
    await requestForInstructor(formData);
    console.log('Educator application submitted:', formData)
    setFormData({ name: '', email: '', bio: '' });
  }

  return (
    <div >
      {/* Hero Section */}
      <section className="text-center py-16 px-4 ">
        <h1 className="text-4xl font-bold mb-4">Share Your Knowledge. Empower the World.</h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join Learnify as an instructor and start creating impactful learning experiences.
        </p>
        <button className="btn btn-primary px-6 py-3 rounded-full" onClick={() => {
          document.getElementById('educator-form').scrollIntoView({ behavior: 'smooth' })
        }}>
          Apply to Teach
        </button>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-gray-200">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl bg-white shadow">
            <h3 className="text-xl font-semibold mb-2">Flexible Teaching</h3>
            <p className="text-gray-600">Teach anytime, anywhere with full control over your content.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow">
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">Reach thousands of students across the world.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow">
            <h3 className="text-xl font-semibold mb-2">Earn Money</h3>
            <p className="text-gray-600">Monetize your skills with transparent payouts.</p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="educator-form" className="py-12 px-4">
        <div className="max-w-lg mx-auto text-left">
          <h2 className="text-2xl font-bold mb-4">Start Your Teaching Journey</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="bio"
              placeholder="Tell us about your teaching experience"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full"
              required
            />
            <button className="btn btn-primary w-full" type="submit">Submit Application</button>
          </form>
        </div>
      </section>

      {/* Dashboard Link */}
      <div className="text-center mt-12">
        <p className="text-lg">Already have an educator account?</p>
        <button onClick={() => navigate('/dashboard')} className="link link-primary text-base font-medium">Go to Dashboard</button>
      </div>
    </div>
  )
}

export default BecomeEducatorPage
