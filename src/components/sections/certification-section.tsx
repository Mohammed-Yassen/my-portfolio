/** @format */
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, ShieldCheck, Zap, Lock } from "lucide-react";
import { MotionViewport } from "../motion-viewport";

const certs = [
    {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "Dec 2024",
        id: "AWS-7782-9910",
        skills: ["Cloud", "Security", "Scalability"],
        icon: <Zap className="text-yellow-500" size={40} />,
    },
    {
        name: "Offensive Security (OSCP)",
        issuer: "OffSec",
        date: "Jan 2024",
        id: "OS-102-4451",
        skills: ["Pentesting", "Linux", "Exploitation"],
        icon: <Lock className="text-yellow-500" size={40} />,
    },
    {
        name: "Professional Scrum Master",
        issuer: "Scrum.org",
        date: "Mar 2024",
        id: "PSM-I-9920",
        skills: ["Agile", "Leadership", "Planning"],
        icon: <Award className="text-yellow-500" size={40} />,
    },
    {
        name: "Google Cloud Engineer",
        issuer: "Google Cloud",
        date: "Nov 2024",
        id: "GCP-5512-0091",
        skills: ["DevOps", "Kubernetes", "Data"],
        icon: <ShieldCheck className="text-yellow-500" size={40} />,
    },
];

export const CertificationsSection = () => (
    <section className='py-24 bg-background relative overflow-hidden'>
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className='container mx-auto px-6 max-w-7xl'>
            <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800'>
                    Professional Credentials
                </h2>
                <p className='text-muted-foreground mt-4 text-lg'>
                    Industry-recognized certifications and verified expertise
                </p>
            </div>

            {/* Grid: 1 col on mobile, 2 col on tablet, 4 col on large screens for equal size */}
            <div className='grid grid-cols-1 md:grid-cols-2   gap-12'>
                {certs.map((cert, i) => (
                    <MotionViewport 
                        key={i} 
                        delay={i * 0.1}
                        preset="fadeInUp"
                        className='group perspective-1000'
                    >
                        <motion.div
                            whileHover={{ 
                                rotateY: 5, 
                                rotateX: -5, 
                                scale: 1.02,
                                y: -5 
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className='relative h-full bg-zinc-950 border border-yellow-600/20 p-6 rounded-2xl shadow-xl flex flex-col items-start transition-colors group-hover:border-yellow-600/50 group-hover:bg-zinc-900/50'
                        >
                            {/* Certificate Decoration */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Award size={80} />
                            </div>

                            <div className="mb-4 p-3 bg-yellow-500/10 rounded-xl">
                                {cert.icon}
                            </div>
                            
                            <span className='text-[10px] uppercase tracking-[0.2em] text-yellow-600 font-bold mb-2'>
                                Verified Professional
                            </span>
                            
                            <h3 className='text-xl font-bold text-white mb-2 leading-tight min-h-[56px]'>
                                {cert.name}
                            </h3>
                            
                            <p className='text-zinc-400 text-sm font-medium mb-4'>{cert.issuer}</p>

                            <div className='flex flex-wrap gap-1.5 mb-8'>
                                {cert.skills.map((s) => (
                                    <span
                                        key={s}
                                        className='px-2 py-0.5 bg-yellow-600/5 border border-yellow-600/10 text-yellow-500/80 text-[10px] rounded-md'>
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* Footer Section - Pushed to Bottom */}
                            <div className='w-full pt-4 border-t border-white/5 mt-auto flex justify-between items-center'>
                                <div className='text-[10px]'>
                                    <p className='text-zinc-500 uppercase font-bold tracking-tighter'>Credential ID</p>
                                    <p className='text-zinc-300 font-mono'>{cert.id}</p>
                                </div>
                                <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    className='p-2 bg-yellow-600/90 hover:bg-yellow-500 text-black rounded-lg transition-all shadow-[0_0_15px_rgba(202,138,4,0.2)] hover:shadow-[0_0_20px_rgba(202,138,4,0.4)]'
                                >
                                    <ExternalLink size={14} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </MotionViewport>
                ))}
            </div>
        </div>
    </section>
);