import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderColor = 'border-berry/30';
        let iconColor = 'text-berry';
        let bgStyle = 'bg-white';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'text-emerald-600';
          borderColor = 'border-emerald-200';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-rose-600';
          borderColor = 'border-rose-200';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-navy';
          borderColor = 'border-navy/20';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-600';
          borderColor = 'border-amber-200';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-elevated border ${borderColor} ${bgStyle} animate-slide-down transition-all duration-300 backdrop-blur-sm`}
          >
            <div className={`p-1 rounded-lg shrink-0 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              {toast.title && (
                <h4 className="text-sm font-semibold text-navy leading-tight mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-navy/70 leading-relaxed break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-mauve hover:text-navy p-1 rounded-md transition shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
