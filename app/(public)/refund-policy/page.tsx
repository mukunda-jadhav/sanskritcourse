export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Refund Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>
        {[
          { title: '7-Day Refund Window', content: 'If you are not satisfied with your membership within 7 days of activation, you may request a full refund. Contact us at refund@sanskritgurukul.com with your transaction ID.' },
          { title: 'Refund Process', content: 'Approved refunds are processed within 5-7 business days back to your original UPI account. We will contact you to confirm the UPI details.' },
          { title: 'Non-Refundable Cases', content: 'Refunds are not available after 7 days of activation, or if premium content has been extensively downloaded or accessed.' },
          { title: 'Pending Payments', content: 'If your payment was rejected, no charge was made. Pending payments that are not verified within 48 hours will be cancelled automatically.' },
          { title: 'Contact', content: 'Email refund@sanskritgurukul.com or WhatsApp us for refund queries. We respond within 24 hours.' },
        ].map(s => (
          <div key={s.title} className="mb-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/30">
            <h2 className="font-playfair text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
