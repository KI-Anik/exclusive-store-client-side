import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg leading-7 text-gray-700 text-center">
        Welcome to <span className='text-purple-500 text-xl'>Exclusive-store</span>, your ultimate destination for the latest gadgets and accessories. 
        Our mission is to bring the latest technology to your fingertips, helping you stay ahead in a 
        fast-paced digital world. We carefully curate a wide range of products to suit all your needs.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Team</h2>
        <p className="text-lg leading-7 text-gray-700 text-center">
          We are a passionate team of tech enthusiasts dedicated to providing the best user experience 
          through cutting-edge technology and exceptional customer service. 
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Vision</h2>
        <p className="text-lg leading-7 text-gray-700 text-center">
          At Exclusive-store, we envision a world where technology seamlessly integrates into daily life, 
          enhancing productivity and creativity. We aim to be your trusted partner in this journey.
        </p>
      </div>
    </div>
  );
};

export default About;