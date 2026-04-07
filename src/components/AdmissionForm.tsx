import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 mb-8"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest">Admissions 2026</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-8 leading-tight">
                Begin your child's <span className="text-emerald-600">digital journey</span> today.
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
                Join our community of innovators and learners. Fill out the form to schedule a campus tour or start the admission process.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Global Standards', desc: 'Curriculum designed for the 21st century.' },
                  { title: 'Expert Mentors', desc: 'Highly qualified educators with digital expertise.' },
                  { title: 'Modern Campus', desc: 'Safe and tech-enabled learning environment.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-extrabold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-10 md:p-16 rounded-[4rem] border-slate-100 shadow-2xl shadow-emerald-500/5"
            >
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-display font-extrabold text-slate-900 mb-4">Enquiry Submitted!</h3>
                  <p className="text-slate-500 font-medium mb-10">Our admissions team will contact you shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="text-emerald-600 font-extrabold uppercase tracking-widest text-sm hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {enabledFields.map((field) => (
                      <div key={field.id} className={cn(
                        "space-y-3",
                        field.id === 'message' ? "md:col-span-2" : ""
                      )}>
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                          {field.label}
                        </label>
                        {field.id === 'message' ? (
                          <textarea
                            required
                            rows={4}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium text-slate-700"
                            placeholder={`Enter your ${field.label.toLowerCase()}...`}
                            value={formData[field.id] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          />
                        ) : (
                          <input
                            required
                            type={field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium text-slate-700"
                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                            value={formData[field.id] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3">
                      <AlertCircle size={20} />
                      {error}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className="w-full py-6 rounded-2xl font-extrabold text-white shadow-2xl flex items-center justify-center gap-4 transition-all text-xl disabled:opacity-50"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
