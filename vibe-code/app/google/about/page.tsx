import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About Vibe Hub</h1>
        <p className="text-gray-600">Last updated: {new Date().toISOString().split('T')[0]}</p>
      </header>

      <section className="mt-8 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          Vibe Hub is a community-driven platform for developers and creators who believe that the 'vibe' of coding is just as important as the code itself. We aim to provide a space where developers can share their projects, discover new tools, and connect with like-minded individuals in a creative and inspiring environment.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Project Showcases:</strong> A place to share your creative coding projects and get feedback from the community.</li>
          <li><strong>Gear & Tech Reviews:</strong> Honest reviews of the tools and technologies that power our development workflows.</li>
          <li><strong>Community Lounge:</strong> A space for discussions, asking questions, and connecting with other developers.</li>
          <li><strong>IT News:</strong> Stay up-to-date with the latest trends and news in the tech industry.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Our Team</h2>
        <p className="mb-4">
          We are a passionate team of developers, designers, and creators who are dedicated to building a positive and inclusive community. We believe in the power of collaboration and are always looking for new ways to improve the Vibe Hub experience.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          We'd love to hear from you! If you have any questions, feedback, or just want to say hello, please don't hesitate to reach out to us.
        </p>
        <ul className="list-disc pl-6">
          <li>By email: gmdqn2tp@gmail.com </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
