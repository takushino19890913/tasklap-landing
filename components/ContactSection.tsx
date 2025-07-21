"use client";

import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const t = useTranslations();
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // EmailJS configuration - Using environment variables
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus("idle");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-primary-50 dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            {t("contact.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-4 sm:mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white mb-4 sm:mb-6">
              {t("contact.info.title")}
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-base sm:text-lg">
                    {t("contact.info.email.title")}
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("contact.info.email.description")}
                  </p>
                  <a
                    href="mailto:takyun.dev@gmail.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm sm:text-base"
                  >
                    takyun.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-base sm:text-lg">
                    {t("contact.info.response.title")}
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("contact.info.response.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-base sm:text-lg">
                    {t("contact.info.support.title")}
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("contact.info.support.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Link - Hidden for now */}
            {/* <div className="bg-warm-100 dark:bg-neutral-800 rounded-xl p-4 sm:p-6">
               <div className="flex items-center space-x-3 mb-3">
                 <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                 <h4 className="font-semibold text-neutral-800 dark:text-white text-base sm:text-lg">
                   {t("contact.faq.title")}
                 </h4>
               </div>
               <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4">
                 {t("contact.faq.description")}
               </p>
               <a
                 href="#faq"
                 className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm sm:text-base font-medium"
               >
                 {t("contact.faq.link")}
               </a>
             </div> */}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-200 dark:border-neutral-700">
            {submitStatus === "success" ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                  {t("contact.success.title")}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                  {t("contact.success.message")}
                </p>
                <button
                  onClick={resetForm}
                  className="btn-primary px-6 py-3 rounded-xl font-medium text-sm sm:text-base"
                >
                  {t("contact.success.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white mb-4 sm:mb-6">
                  {t("contact.form.title")}
                </h3>

                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        {t("contact.form.name.label")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder={t("contact.form.name.placeholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        {t("contact.form.email.label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder={t("contact.form.email.placeholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      {t("contact.form.subject.label")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                      placeholder={t("contact.form.subject.placeholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      {t("contact.form.message.label")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder={t("contact.form.message.placeholder")}
                    />
                  </div>

                  <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    {t("contact.form.privacy")}
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{t("contact.form.error")}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t("contact.form.send")}</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
