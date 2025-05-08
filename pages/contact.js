import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Contact Us | Prompt Writing Studio</title>
        <meta name="description" content="Get in touch with the Prompt Writing Studio team for questions, feedback, or collaboration opportunities." />
      </Head>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Have questions, feedback, or ideas? We'd love to hear from you! You can reach us using the contact information below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="text-blue-600 mt-1">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Our Address</h3>
                  <p className="text-gray-600">
                    Miley House<br />
                    South Main Street<br />
                    Naas<br />
                    Co. Kildare<br />
                    Ireland
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-blue-600 mt-1">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-gray-600">bryan[at]bryancollins.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              Want to learn more about who we are and what we do? Visit our About page for more information about our mission, values, and the team behind Prompt Writing Studio.
            </p>
            <Link href="/about" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
              Learn more about us <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Social Media</h3>
                <p className="text-gray-600">
                  Connect with us on <a href="https://twitter.com/bryanjcollins" className="text-blue-600 hover:underline">Twitter</a>, <a href="https://www.linkedin.com/in/bryancollinswriter/" className="text-blue-600 hover:underline">LinkedIn</a>, or <a href="https://www.instagram.com/bryancollinswriter/" className="text-blue-600 hover:underline">Instagram</a>.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Business Hours</h3>
                <p className="text-gray-600">Monday to Friday: 9:00 AM - 5:00 PM (IST)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
