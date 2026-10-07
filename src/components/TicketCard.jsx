import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  Eye,
  Trash2,
  Sparkles,
  QrCode,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';

export default function TicketCard({ ticket }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const { cancelRegistration, addToast } = useApp();

  const handleDownload = () => {
    addToast({
      title: 'Ticket Downloaded',
      message: `Pass for "${ticket.eventTitle}" saved as PDF format.`,
      type: 'success',
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Pass Link Copied',
      message: 'Share link copied to clipboard.',
      type: 'info',
    });
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-mauve/25 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative group">
        {/* Left Side: Ticket Event Info */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-berry/10 text-berry">
                {ticket.ticketType || 'General Pass'}
              </span>
              <span className="text-xs font-mono font-semibold text-navy/70 bg-cream-surface px-2.5 py-1 rounded-lg border border-mauve/20">
                {ticket.ticketCode}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-navy leading-snug mb-3 group-hover:text-berry transition-colors">
              <Link to={`/events/${ticket.eventId}`}>{ticket.eventTitle}</Link>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-navy/80 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-berry shrink-0" />
                <span className="font-semibold">{ticket.displayDate || ticket.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-navy shrink-0" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-berry shrink-0" />
                <span className="truncate">{ticket.venue}, {ticket.location}</span>
              </div>
            </div>
          </div>

          {/* Attendee Details */}
          <div className="pt-4 border-t border-cream-surface flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                Attendee
              </div>
              <div className="text-xs font-bold text-navy">{ticket.attendeeName}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                Status
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Perforated Stub Divider (Visual) */}
        <div className="hidden md:flex flex-col justify-between items-center relative py-4">
          <div className="w-5 h-5 rounded-full bg-cream-light -mt-6 border-b border-mauve/20" />
          <div className="h-full border-r-2 border-dashed border-mauve/40 my-2" />
          <div className="w-5 h-5 rounded-full bg-cream-light -mb-6 border-t border-mauve/20" />
        </div>

        {/* Right Side: QR Stub & Actions */}
        <div className="p-6 bg-cream-surface/60 md:w-64 flex flex-col items-center justify-between text-center border-t md:border-t-0 md:border-l border-cream-surface shrink-0">
          <div className="w-full flex flex-col items-center">
            {/* Visual QR code placeholder with stylish aesthetic */}
            <div
              onClick={() => setModalOpen(true)}
              className="w-28 h-28 bg-white p-2 rounded-2xl shadow-sm border border-mauve/30 flex flex-col items-center justify-center cursor-pointer hover:border-berry transition group/qr mb-2"
              title="Click to enlarge QR pass"
            >
              {/* Geometric SVG simulating a clean modern QR matrix */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-navy">
                <rect x="5" y="5" width="28" height="28" rx="4" />
                <rect x="11" y="11" width="16" height="16" fill="white" />
                <rect x="15" y="15" width="8" height="8" />

                <rect x="67" y="5" width="28" height="28" rx="4" />
                <rect x="73" y="11" width="16" height="16" fill="white" />
                <rect x="77" y="15" width="8" height="8" />

                <rect x="5" y="67" width="28" height="28" rx="4" />
                <rect x="11" y="73" width="16" height="16" fill="white" />
                <rect x="15" y="77" width="8" height="8" />

                {/* Random micro blocks */}
                <rect x="42" y="10" width="8" height="8" />
                <rect x="52" y="18" width="8" height="8" />
                <rect x="40" y="32" width="12" height="12" />
                <rect x="58" y="44" width="8" height="14" />
                <rect x="15" y="44" width="16" height="8" />
                <rect x="45" y="62" width="10" height="10" />
                <rect x="72" y="50" width="16" height="8" />
                <rect x="66" y="70" width="12" height="12" />
                <rect x="84" y="82" width="10" height="10" />
              </svg>
            </div>
            <span className="text-[11px] text-mauve-dark font-medium">Scan at entrance</span>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-light transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              View Pass
            </button>

            <div className="grid grid-cols-2 gap-1.5 w-full">
              <button
                onClick={handleDownload}
                className="py-1.5 px-2 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry text-xs font-medium transition flex items-center justify-center gap-1"
                title="Download Pass"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>

              <button
                onClick={() => setCancelModalOpen(true)}
                className="py-1.5 px-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition flex items-center justify-center gap-1"
                title="Cancel Registration"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Digital Ticket Inspection Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Official Digital Access Pass"
        maxWidth="max-w-md"
      >
        <div className="bg-cream-surface rounded-2xl p-6 border border-mauve/30 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-berry text-white mx-auto flex items-center justify-center mb-4 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
            {ticket.ticketType}
          </span>

          <h3 className="font-display font-bold text-xl text-navy mt-3 mb-1">
            {ticket.eventTitle}
          </h3>

          <p className="text-xs text-navy/70 mb-5">
            {ticket.venue} • {ticket.location}
          </p>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-mauve/20 mb-5 inline-block mx-auto">
            <div className="w-40 h-40 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-navy">
                <rect x="5" y="5" width="28" height="28" rx="4" />
                <rect x="11" y="11" width="16" height="16" fill="white" />
                <rect x="15" y="15" width="8" height="8" />
                <rect x="67" y="5" width="28" height="28" rx="4" />
                <rect x="73" y="11" width="16" height="16" fill="white" />
                <rect x="77" y="15" width="8" height="8" />
                <rect x="5" y="67" width="28" height="28" rx="4" />
                <rect x="11" y="73" width="16" height="16" fill="white" />
                <rect x="15" y="77" width="8" height="8" />
                <rect x="42" y="10" width="8" height="8" />
                <rect x="52" y="18" width="8" height="8" />
                <rect x="40" y="32" width="12" height="12" />
                <rect x="58" y="44" width="8" height="14" />
                <rect x="15" y="44" width="16" height="8" />
                <rect x="45" y="62" width="10" height="10" />
                <rect x="72" y="50" width="16" height="8" />
                <rect x="66" y="70" width="12" height="12" />
                <rect x="84" y="82" width="10" height="10" />
              </svg>
            </div>
            <div className="font-mono text-xs font-bold text-navy mt-2">
              {ticket.ticketCode}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left bg-white/70 p-3.5 rounded-xl border border-mauve/20 text-xs">
            <div>
              <span className="text-mauve-dark block text-[10px]">Attendee Name</span>
              <span className="font-semibold text-navy">{ticket.attendeeName}</span>
            </div>
            <div>
              <span className="text-mauve-dark block text-[10px]">Date & Time</span>
              <span className="font-semibold text-navy">{ticket.displayDate}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 rounded-xl bg-berry text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-berry-hover transition"
            >
              <Download className="w-4 h-4" />
              Download Pass
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2.5 rounded-xl bg-white border border-mauve/30 text-navy font-semibold text-xs flex items-center justify-center gap-1 hover:bg-cream-surface transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Event Registration?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-navy/80 leading-relaxed">
            Are you sure you want to cancel your registration for{' '}
            <strong className="text-navy">{ticket.eventTitle}</strong>? Your ticket ID{' '}
            <code className="text-xs bg-cream-surface px-1.5 py-0.5 rounded text-berry">
              {ticket.ticketCode}
            </code>{' '}
            will be released.
          </p>
          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setCancelModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-navy bg-cream-surface hover:bg-cream-dark/30 transition"
            >
              Keep Registration
            </button>
            <button
              onClick={() => {
                cancelRegistration(ticket.id);
                setCancelModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition"
            >
              Yes, Cancel Ticket
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
