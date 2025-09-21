import React from 'react';
import LegalPageLayout, { LegalSection } from '../components/ui/LegalPageLayout';

const termsSections: LegalSection[] = [
    {
      id: 'agreement',
      title: '1. Agreement to Terms',
      content: (
        <p>
          By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We may modify the terms at any time, and such modifications will be effective immediately upon posting.
        </p>
      )
    },
    {
      id: 'use-of-service',
      title: '2. Use of Service',
      content: (
        <p>
          You agree to use our services only for lawful purposes. You are responsible for all data, information, and content that you upload, post, or otherwise transmit via the service. You agree not to use the service to engage in any activity that is harmful to others or that would subject VeilForge to liability.
        </p>
      )
    },
    {
      id: 'accounts',
      title: '3. Accounts and Security',
      content: (
        <p>
          You are responsible for safeguarding your account information. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your account.
        </p>
      )
    },
    {
      id: 'intellectual-property',
      title: '4. Intellectual Property',
      content: (
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property of VeilForge and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of VeilForge.
        </p>
      )
    },
    {
      id: 'termination',
      title: '5. Termination',
      content: (
        <p>
          We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
      )
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability',
      content: (
        <p>
          In no event shall VeilForge, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
        </p>
      )
    },
    {
      id: 'contact',
      title: '7. Contact Us',
      content: (
        <p>
          If you have any questions about these Terms, please contact us at legal@veilforge.com.
        </p>
      )
    }
];

const TermsPage: React.FC = () => {
  return (
    <LegalPageLayout
        title="Terms of Service"
        lastUpdated={new Date()}
        sections={termsSections}
    />
  );
};

export default TermsPage;
