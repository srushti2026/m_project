import React from 'react';
import LegalPageLayout, { LegalSection } from '../components/ui/LegalPageLayout';

const policySections: LegalSection[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <p>
          Welcome to VeilForge. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
        </p>
      )
    },
    {
      id: 'info-collection',
      title: '2. Information We Collect',
      content: (
        <p>
          We may collect personal information from you such as your name, email address, and payment information when you register for an account or use our services. We also collect non-personal information, such as browser type, operating system, and website usage data to improve our service.
        </p>
      )
    },
    {
      id: 'info-use',
      title: '3. How We Use Your Information',
      content: (
        <p>
          We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices, updates, security alerts, and support messages, to communicate with you about products, services, offers, and events offered by VeilForge, and to protect our rights and the rights of others.
        </p>
      )
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      content: (
        <p>
          We implement a variety of administrative, technical, and physical security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
        </p>
      )
    },
    {
        id: 'data-retention',
        title: '5. Data Retention',
        content: (
            <p>
                We will only retain your personal information for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
        )
    },
    {
        id: 'cookies',
        title: '6. Cookies and Tracking Technologies',
        content: (
            <p>
                We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Application to help customize the Application and improve your experience. When you access the Application, your personal information is not collected through the use of tracking technology.
            </p>
        )
    },
    {
        id: 'gdpr',
        title: '7. Your Data Protection Rights (GDPR)',
        content: (
            <p>
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
            </p>
        )
    },
    {
      id: 'policy-changes',
      title: '8. Changes to This Privacy Policy',
      content: (
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      )
    },
    {
      id: 'contact',
      title: '9. Contact Us',
      content: (
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@veilforge.com.
        </p>
      )
    }
];


const PolicyPage: React.FC = () => {
  return (
    <LegalPageLayout 
        title="Privacy Policy"
        lastUpdated={new Date()}
        sections={policySections}
    />
  );
};

export default PolicyPage;