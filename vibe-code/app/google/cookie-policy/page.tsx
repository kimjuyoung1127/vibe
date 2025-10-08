import React from 'react';

const CookiePolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Cookie Policy</h1>
        <p className="text-gray-600">Last updated: {new Date().toISOString().split('T')[0]}</p>
      </header>

      <section className="mt-8 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">What Are Cookies</h2>
        <p className="mb-4">
          As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Cookies</h2>
        <p className="mb-4">
          We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Disabling Cookies</h2>
        <p className="mb-4">
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">The Cookies We Set</h2>
        <p className="mb-4">
          We may set cookies when you log in to our site. These cookies are used to ensure you are authenticated and have access to certain features of the site.
        </p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>Login related cookies: We use cookies when you are logged in to keep track of your session.</li>
          <li>Site preference cookies: We also use cookies to remember your site preferences and settings.</li>
          <li>Third-party analytics cookies: We also use third-party analytics services that set cookies to track site usage and performance.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Third Party Cookies</h2>
        <p className="mb-4">
          In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
        </p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
          <li>The system also uses various cookies to keep track of the marketing campaigns that bring users to the site.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">More Information</h2>
        <p className="mb-4">
          Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Generator of Cookie Policy.
        </p>
        <p className="mb-4">
          However if you are still looking for more information then you can contact us through one of our preferred contact methods:
        </p>
        <ul className="list-disc pl-6">
          <li>By email: gmdqn2tp@gmail.com</li>
        </ul>
      </section>
    </div>
  );
};

export default CookiePolicyPage;