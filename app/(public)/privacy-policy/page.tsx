export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-gray dark:prose-invert">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>
        {[
          { title: '1. Information We Collect', content: 'We collect your name, email address, phone number when you register or submit a payment. We also collect usage data to improve your experience.' },
          { title: '2. How We Use Your Information', content: 'Your information is used to provide course access, process membership applications, send important updates, and improve our services.' },
          { title: '3. Data Security', content: 'We implement industry-standard security measures including encrypted passwords and secure connections. Your payment screenshots are stored securely on Cloudinary.' },
          { title: '4. Third-Party Services', content: 'We use Google for authentication, Cloudinary for file storage, and YouTube for video content. These services have their own privacy policies.' },
          { title: '5. Contact', content: 'For privacy concerns, email us at privacy@sanskritgurukul.com' },
        ].map(s => (
          <div key={s.title} className="mb-6">
            <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2">{s.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
