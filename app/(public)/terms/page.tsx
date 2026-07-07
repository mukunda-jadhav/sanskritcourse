export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>
        {[
          { title: '1. Acceptance', content: 'By using Sanskrit Gurukul, you agree to these terms. If you disagree, please do not use the platform.' },
          { title: '2. Membership', content: 'Membership grants personal, non-transferable access to premium content. Sharing accounts is prohibited and may result in termination.' },
          { title: '3. Content', content: 'All course content, notes, and materials are owned by Sanskrit Gurukul. You may not redistribute, resell, or share premium content.' },
          { title: '4. Payment', content: 'Payments are verified manually. We reserve the right to reject payments if the transaction cannot be verified. Approved memberships are activated within 24 hours.' },
          { title: '5. Conduct', content: 'Users must maintain respectful conduct. Harassment or misuse of the platform will result in immediate termination.' },
          { title: '6. Changes', content: 'We may update these terms. Continued use after changes constitutes acceptance of the new terms.' },
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
