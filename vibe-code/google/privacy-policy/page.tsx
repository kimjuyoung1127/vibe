import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: {new Date().toISOString().split('T')[0]}</p>
      </header>

      <section className="mt-8 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Vibe Hub operates the website and mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Information Collection and Use</h2>
        <p className="mb-4">
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        
        <h3 className="text-lg font-medium mt-4 mb-2">Types of Data Collected</h3>
        <p className="mb-4">
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Use of Data</h2>
        <p className="mb-4">
          Vibe Hub uses the collected data for various purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Security of Data</h2>
        <p className="mb-4">
          The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Service Providers</h2>
        <p className="mb-4">
          We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Links to Other Sites</h2>
        <p className="mb-4">
          Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Children's Privacy</h2>
        <p className="mb-4">
          Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6">
          <li>By email: privacy@vibehub.com</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;