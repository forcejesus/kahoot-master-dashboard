
import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';

export const modernToasts = {
  success: (title: string, description?: string) => {
    toast.success(title, {
      description,
      icon: <CheckCircle className="w-5 h-5" />,
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      },
    });
  },

  error: (title: string, description?: string) => {
    toast.error(title, {
      description,
      icon: <XCircle className="w-5 h-5" />,
      duration: 5000,
      style: {
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
      },
    });
  },

  warning: (title: string, description?: string) => {
    toast.warning(title, {
      description,
      icon: <AlertTriangle className="w-5 h-5" />,
      duration: 4500,
      style: {
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
      },
    });
  },

  info: (title: string, description?: string) => {
    toast.info(title, {
      description,
      icon: <Info className="w-5 h-5" />,
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      },
    });
  },

  premium: (title: string, description?: string) => {
    toast(title, {
      description,
      icon: <Sparkles className="w-5 h-5" />,
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
      },
    });
  },

  loading: (title: string, description?: string) => {
    return toast.loading(title, {
      description,
      style: {
        background: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(107, 114, 128, 0.3)',
      },
    });
  },
};
