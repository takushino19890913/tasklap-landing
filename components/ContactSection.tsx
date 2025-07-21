"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Mail, MessageCircle, Send, Clock } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
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
    setSubmitError("");

    try {
      // EmailJS Configuration
      // 環境変数の設定が必要です：
      // NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
      // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
      // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // テストモード: EmailJS設定がない場合は成功をシミュレート
      if (!serviceId || !templateId || !publicKey) {
        console.log(
          "📧 テストモード: EmailJS設定が未完了のため、送信をシミュレートします"
        );
        console.log("フォームデータ:", {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

        // 2秒の遅延をシミュレート
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Success
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      // EmailJS Template Variables
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "takyun.dev@gmail.com", // 受信メールアドレス
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Email sent successfully:", response);

      // Success
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitError(t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-warm dark:shadow-navy">
            <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
              <Image
                src="/app_icon_transparent.png"
                alt="TaskLap App Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            {t("contact.badge")}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-contrast mb-6 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">
            {t("contact.title")}
          </h2>

          <p className="text-xl text-muted-contrast max-w-3xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="card p-8 h-fit">
              <h3 className="text-2xl font-bold text-primary-contrast mb-6">
                {t("contact.info.title")}
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-contrast">
                      {t("contact.info.email.title")}
                    </h4>
                    <p className="text-muted-contrast">
                      {t("contact.info.email.description")}
                    </p>
                    <a
                      href="mailto:takyun.dev@gmail.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      takyun.dev@gmail.com
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-contrast">
                      {t("contact.info.response.title")}
                    </h4>
                    <p className="text-muted-contrast">
                      {t("contact.info.response.description")}
                    </p>
                  </div>
                </div>

                {/* Support */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-contrast">
                      {t("contact.info.support.title")}
                    </h4>
                    <p className="text-muted-contrast">
                      {t("contact.info.support.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-primary-contrast mb-6">
                {t("contact.form.title")}
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary-contrast mb-2">
                    {t("contact.success.title")}
                  </h4>
                  <p className="text-muted-contrast mb-6">
                    {t("contact.success.message")}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    {t("contact.success.sendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-primary-contrast mb-2"
                      >
                        {t("contact.form.name.label")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-elevated bg-elevated text-primary-contrast placeholder-muted-contrast focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder={t("contact.form.name.placeholder")}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary-contrast mb-2"
                      >
                        {t("contact.form.email.label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-elevated bg-elevated text-primary-contrast placeholder-muted-contrast focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder={t("contact.form.email.placeholder")}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-primary-contrast mb-2"
                    >
                      {t("contact.form.subject.label")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-elevated bg-elevated text-primary-contrast placeholder-muted-contrast focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={t("contact.form.subject.placeholder")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary-contrast mb-2"
                    >
                      {t("contact.form.message.label")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-elevated bg-elevated text-primary-contrast placeholder-muted-contrast focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-vertical"
                      placeholder={t("contact.form.message.placeholder")}
                    />
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {submitError}
                      </p>
                    </div>
                  )}

                  {/* Privacy Notice */}
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4">
                    <p className="text-sm text-muted-contrast">
                      {t("contact.form.privacy")}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg font-semibold rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t("contact.form.send")}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-40 right-10 w-32 h-32 bg-primary-200/20 dark:bg-primary-800/10 rounded-full opacity-60 animate-float"></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-accent-200/20 dark:bg-accent-800/10 rounded-full opacity-60 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  );
}
