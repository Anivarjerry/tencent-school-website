import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { getSupabaseClient } from '../lib/supabase';

interface AdmissionFormProps {
  fields: { id: string; label: string; enabled: boolean }[];
  primaryColor: string;
  schoolId: string;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ fields, primaryColor, schoolId }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enabledFields = fields.filter(f => f.enabled);
  if (enabledFields.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error: submitError } = await supabase
        .from('website_enquiries')
        .insert({
          school_id: schoolId,
          form_data: formData
        });

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({});
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admission" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 mb-8">
                <Sparkles size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Admissions Open</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Start your child's <span className="text-emerald-600">digital-first</span> journey.
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
                Join a community of innovators and learners. Our admission process is streamlined and fully digital for your convenience.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Global Curriculum', desc: 'Integrated with AI and modern tech.' },
                  { title: 'Safe Environment', desc: '24/7 monitoring and secure campus.' },
                  { title: 'Holistic Growth', desc: 'Equal focus on sports, arts, and academics.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 md:p-16 rounded-[var(--radius-section)] shadow-[var(--premium-shadow)]"
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Enquiry Received!</h3>
                    <p className="text-slate-500 font-medium mb-10">Thank you for your interest. Our admissions counselor will contact you within 24 hours.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="text-emerald-600 font-black uppercase tracking-widest text-sm hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enabledFields.map((field) => (
                        <div key={field.id} className={cn(
                          "space-y-2",
                          field.id === 'message' ? "md:col-span-2" : ""
                        )}>
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                            {field.label}
                          </label>
                          {field.id === 'message' ? (
                            <textarea
                              required
                              rows={4}
                              className="w-full px-6 py-4 rounded-[var(--radius-el)] bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium text-slate-700 resize-none"
                              placeholder={`Enter your ${field.label.toLowerCase()}...`}
                              value={formData[field.id] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            />
                          ) : (
                            <input
                              required
                              type={field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'}
                              className="w-full px-6 py-4 rounded-[var(--radius-el)] bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium text-slate-700"
                              placeholder={`Enter ${field.label.toLowerCase()}...`}
                              value={formData[field.id] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div className="p-4 rounded-[var(--radius-el)] bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3 border border-red-100">
                        <AlertCircle size={20} />
                        {error}
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit"
                      className="btn-primary w-full py-5 text-lg"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={24} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
