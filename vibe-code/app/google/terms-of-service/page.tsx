'use client';

import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

const TermsOfServicePage = () => {
  const { t } = useTranslations();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('policy.termsOfService.title')}</h1>
        <p className="text-gray-600">{t('policy.lastUpdated', undefined, { date: new Date().toISOString().split('T')[0] })}</p>
      </header>

      <section className="mt-8 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">{t('policy.termsOfService.introduction')}</h2>
        <p className="mb-4">
          Welcome to Vibe Hub. These terms and conditions outline the rules and regulations for the use of Vibe Hub's Website and Application.
        </p>
        <p className="mb-4">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use Vibe Hub if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.license')}</h2>
        <p className="mb-4">
          Unless otherwise stated, Vibe Hub and/or its licensors own the intellectual property rights for all material on Vibe Hub. All intellectual property rights are reserved. You may access this from Vibe Hub for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        
        <h3 className="text-lg font-medium mt-4 mb-2">{t('policy.termsOfService.youMustNot')}</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Republish material from Vibe Hub</li>
          <li>Sell, rent, or sub-license material from Vibe Hub</li>
          <li>Reproduce, duplicate, or copy material from Vibe Hub</li>
          <li>Redistribute content from Vibe Hub</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.userContent')}</h2>
        <p className="mb-4">
          In these Terms of Service, "Your Content" shall mean any audio, video, text, images, or other material that you submit to this Website and/or Application through your account, including without limitation all Projects, Reviews, Community Posts, Comments, and other materials. You are solely responsible for Your Content and must ensure that Your Content complies with these Terms of Service and all applicable laws.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.prohibitedUses')}</h2>
        <p className="mb-4">
          You are specifically restricted from all of the following:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>publishing any material which is defamatory, obscene, offensive, threatening, or otherwise unlawful</li>
          <li>submitting any material that infringes or violates intellectual property rights</li>
          <li>using the Website/Application in any way that impacts user experience or interferes with access to the Website/Application</li>
          <li>conducting unauthorized data scraping or harvesting</li>
          <li>using the Website/Application in violation of any applicable laws or regulations</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.noWarranties')}</h2>
        <p className="mb-4">
          The materials on Vibe Hub are provided on an 'as is' basis. Vibe Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.limitations')}</h2>
        <p className="mb-4">
          In no event shall Vibe Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vibe Hub, even if Vibe Hub or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.governingLaw')}</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of South Korea and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.changesToTerms')}</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">{t('policy.termsOfService.contact')}</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <ul className="list-disc pl-6">
          <li>By email: legal@vibehub.com</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsOfServicePage;