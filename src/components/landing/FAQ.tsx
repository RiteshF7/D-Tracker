"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "Is my data secure?",
        answer: "Yes. D Tracker uses local storage on your device. Your data never leaves your phone unless you choose to export it."
    },
    {
        question: "Can I use it offline?",
        answer: "Absolutely. D Tracker is a Progressive Web App (PWA) designed to work seamlessly without an internet connection."
    },
    {
        question: "How do I install the app?",
        answer: "On iOS, tap 'Share' -> 'Add to Home Screen'. On Android, tap the menu -> 'Install App' or 'Add to Home Screen'."
    },
    {
        question: "Is it really free?",
        answer: "The core features are free to use. We will introduce premium cloud sync features in the future."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
                    <p className="text-muted-foreground">Everything you need to know.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", openIndex === i && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
