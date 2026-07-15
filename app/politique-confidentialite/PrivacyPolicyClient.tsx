"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyClient() {
  const { t } = useLanguage();
  const p = t.privacyPolicy;

  const icons = [Shield, Eye, Lock, FileText];

  return (
    <div
      className="bg-gray-50 min-h-screen pb-20 mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      <div className="container mx-auto px-4 max-w-4xl my-12 sm:my-20">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-700/10 border border-red-700/20 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5 text-red-700" />
              <span className="text-sm font-semibold uppercase tracking-widest text-red-700">
                {p.title}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {p.title}
            </h1>
            <p className="text-gray-500 font-medium">{p.lastUpdated}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-12 pb-8 border-b border-gray-100">
              {p.introduction}
            </p>

            <div className="space-y-12">
              {p.sections.map((section, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div key={index} className="flex gap-6">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <p className="text-gray-600">
                {p.contactText}{" "}
                <a
                  href="mailto:contact@forgesdebazas.com"
                  className="text-red-600 font-bold hover:underline"
                >
                  contact@forgesdebazas.com
                </a>
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
