import React from 'react';

const ContentGuidelinesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Content Guidelines</h1>
        <p className="text-gray-600">Last updated: {new Date().toISOString().split('T')[0]}</p>
      </header>

      <section className="mt-8 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Community Standards</h2>
        <p className="mb-4">
          At Vibe Hub, we are committed to fostering a welcoming and inclusive community for developers. These Content Guidelines outline what is and isn't acceptable on our platform.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Acceptable Content</h2>
        <p className="mb-4">
          We encourage content that:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Is original, creative, and reflects your passion for coding</li>
          <li>Provides value to other developers in the community</li>
          <li>Is respectful and constructive in nature</li>
          <li>Complies with all applicable laws and regulations</li>
          <li>Accurately represents your projects and experiences</li>
          <li>Follows our code of conduct</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Prohibited Content</h2>
        <p className="mb-4">
          You may not submit content that:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Contains hate speech, harassment, or discrimination</li>
          <li>Includes explicit sexual content or adult material</li>
          <li>Depicts violence or promotes harmful behavior</li>
          <li>Contains illegal content or promotes illegal activities</li>
          <li>Infringes on intellectual property rights of others</li>
          <li>Includes personal information of others without consent</li>
          <li>Contains malicious code or links to harmful websites</li>
          <li>Spreads false or misleading information</li>
          <li>Spams the community with repetitive or irrelevant content</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Project Showcases</h2>
        <p className="mb-4">
          When showcasing your projects, ensure that:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The project is your original work or you have permission to showcase it</li>
          <li>You accurately represent the technologies used</li>
          <li>You provide proper attribution for any third-party components</li>
          <li>The description is honest and reflects the actual functionality</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Technology Reviews</h2>
        <p className="mb-4">
          When writing technology reviews, please:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide honest and balanced assessments</li>
          <li>Base your reviews on actual experience with the technology</li>
          <li>Include both pros and cons</li>
          <li>Avoid biased or promotional content</li>
          <li>Disclose any potential conflicts of interest</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Community Interactions</h2>
        <p className="mb-4">
          When participating in community discussions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Be respectful and constructive in your comments</li>
          <li>Refrain from personal attacks or ad hominem arguments</li>
          <li>Keep discussions relevant to the topic</li>
          <li>Respect differing opinions and perspectives</li>
          <li>Report inappropriate content rather than engaging with it</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Enforcement</h2>
        <p className="mb-4">
          Violations of these Content Guidelines may result in:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Content removal</li>
          <li>Account suspension or termination</li>
          <li>Other actions as deemed appropriate</li>
        </ul>
        <p className="mb-4">
          We reserve the right to take action against any content or user that violates these guidelines. Our moderation team reviews reported content and takes appropriate action based on the severity of the violation.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Reporting Violations</h2>
        <p className="mb-4">
          If you encounter content that violates these guidelines, please report it using the reporting tools provided on the platform. When reporting, please include specific details about the violation to help our moderation team investigate.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Updates to Guidelines</h2>
        <p className="mb-4">
          We may update these Content Guidelines periodically to reflect changes in our community or legal requirements. Users will be notified of significant changes. Continued use of the platform after changes constitutes acceptance of the updated guidelines.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have questions about these Content Guidelines, please contact us:
        </p>
        <ul className="list-disc pl-6">
          <li>By email: content@vibehub.com</li>
        </ul>
      </section>
    </div>
  );
};

export default ContentGuidelinesPage;