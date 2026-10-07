import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast({
        title: 'Missing Details',
        message: 'Please provide your name, email, and message.',
        type: 'warning',
      });
      return;
    }

    setSubmitted(true);
    addToast({
      title: 'Message Dispatched',
      message: 'Thank you! Our community support team will respond within 24 hours.',
      type: 'success',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Support & Inquiries
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm text-navy/70 mt-2">
            Have questions about hosting an event, digital pass verification, or partnership inquiries? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Office Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-mauve/25 shadow-soft space-y-6">
              <h3 className="font-display font-bold text-xl text-navy">
                Support Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cream-surface text-berry flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-mauve-dark">
                      Email Us
                    </h4>
                    <p className="text-sm font-semibold text-navy">hello@sparkgather.com</p>
                    <p className="text-xs text-navy/60">Average reply: 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cream-surface text-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-mauve-dark">
                      Headquarters
                    </h4>
                    <p className="text-sm font-semibold text-navy">500 Howard Street, Suite 400</p>
                    <p className="text-xs text-navy/60">San Francisco, CA 94105</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cream-surface text-berry flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-mauve-dark">
                      Live Concierge Hours
                    </h4>
                    <p className="text-sm font-semibold text-navy">Mon – Fri: 8am – 7pm PST</p>
                    <p className="text-xs text-navy/60">Weekend live on-call for active events</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ snippet */}
            <div className="bg-cream-surface/60 rounded-3xl p-6 border border-mauve/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-berry uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked</span>
              </div>
              <div className="text-xs text-navy/80 space-y-2">
                <p>
                  <strong>Q: How do digital tickets work?</strong>
                  <br />
                  Every attendee receives a unique QR code on Spark Gather that can be viewed and saved as a PDF.
                </p>
                <p>
                  <strong>Q: Can I host free community events?</strong>
                  <br />
                  Yes! Choose "Free Event" in the creation form with zero platform fees.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-mauve/25 shadow-card space-y-6">
              <h3 className="font-display font-bold text-xl text-navy pb-2 border-b border-cream-surface">
                Send a Message
              </h3>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Thank you for reaching out!</p>
                    <p>Your message has been safely received. We will get back to you shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="spark-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="spark-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Organizer Partnership Inquiry"
                    className="spark-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need help with or details about your gathering..."
                    className="spark-input text-xs resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="spark-btn-primary w-full sm:w-auto text-xs py-3.5 px-8 shadow-berry-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
