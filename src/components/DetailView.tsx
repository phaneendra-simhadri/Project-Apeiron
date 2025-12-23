import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Topic, TopicDetail } from '../types';
import OracleTerminal from './OracleTerminal';
import { ArrowLeft, BookOpen, Brain, Sparkles, Zap, ChevronRight, MessageSquare, Compass, ArrowRight } from 'lucide-react';

interface DetailViewProps {
   topic: Topic;
   detail: TopicDetail;
   allTopics: Topic[];
}

const DetailView: React.FC<DetailViewProps> = ({ topic, detail, allTopics }) => {

   // Ensure the page starts at the top when the detail view loads
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
   }, [topic.id]);

   // Select 3 random related topics excluding current one
   const relatedTopics = useMemo(() => {
      return allTopics
         .filter(t => t.id !== topic.id)
         .sort(() => 0.5 - Math.random())
         .slice(0, 3);
   }, [topic.id, allTopics]);

   return (
      <div className="min-h-screen bg-void text-slate-200 animate-fade-in-up pb-12">

         {/* Floating Back Button */}
         <div className="fixed top-8 left-8 z-50">
            <Link
               to="/"
               className="flex items-center px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[13px] font-mono tracking-wider hover:bg-white/10 hover:border-accent/50 transition-all text-slate-300 hover:text-white group shadow-xl"
            >
               <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
               RETURN
            </Link>
         </div>

         {/* --- HERO SECTION --- */}
         <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-slate-950 pb-10">
            {/* Abstract background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-void z-10"></div>

            {/* Decorative glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-10">
               <div className="inline-flex items-center gap-1 mb-4 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-accent-glow uppercase">
                  <span className={`w-2 h-2 rounded-full ${topic.difficulty === 'Infinite' ? 'bg-purple-500 animate-pulse' : 'bg-cyan-500'}`}></span>
                  {topic.difficulty} Complexity
               </div>

               <h1 className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-2 drop-shadow-xl leading-tight tracking-tight">
                  {detail.title}
               </h1>

               <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
                  {detail.description}
               </p>
            </div>
         </div>

         {/* --- MAIN BENTO GRID --- */}
         <div className="max-w-[90rem] mx-auto px-2 relative z-20 -mt-10 md:-mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">

               {/* LEFT COLUMN (Content) - 8 Cols */}
               <div className="lg:col-span-8 space-y-10">

                  {/* "WHY IT IS A BLACK HOLE" CARD */}
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 md:p-7 rounded-2xl shadow-xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                           <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                              <Sparkles className="w-4 h-4" />
                           </div>
                           <h2 className="font-display font-bold text-xl text-white tracking-wide">The Event Horizon</h2>
                        </div>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-wrap font-light">
                           {detail.whyItIsABlackHole}
                        </p>
                     </div>
                  </div>

                  {/* KEY CONCEPTS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                     {detail.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group h-full flex flex-col">
                           <div className="flex items-center gap-4 mb-6">
                              <Zap className="w-4 h-4 text-cyan-500 group-hover:text-cyan-400" />
                              <h3 className="font-display font-bold text-base text-slate-200 group-hover:text-cyan-300 transition-colors">
                                 {concept.name}
                              </h3>
                           </div>
                           <p className="text-sm md:text-base text-slate-400 leading-relaxed flex-grow font-light">
                              {concept.description}
                           </p>
                        </div>
                     ))}
                  </div>

                  {/* Code Snippet Section - NEW FEATURE */}
                  {detail.codeSnippet && (
                     <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="text-xl font-display font-bold text-emerald-400 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                              CODE_REALITY_LAYER
                           </h3>
                           <span className="text-xs font-mono text-slate-500 uppercase border border-slate-700 px-2 py-1 rounded">
                              {detail.codeSnippet.language}
                           </span>
                        </div>

                        <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-emerald-900/30 shadow-inner">
                           <pre className="text-slate-300">
                              <code>{detail.codeSnippet.code}</code>
                           </pre>
                        </div>

                        <p className="mt-4 text-emerald-400/80 text-sm italic border-l-2 border-emerald-500/30 pl-3">
                // {detail.codeSnippet.explanation}
                        </p>
                     </div>
                  )}

                  {/* LEARNING ROADMAP */}
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-white/5 p-5 md:p-7 rounded-2xl">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                           <Compass className="w-4 h-4" />
                        </div>
                        <h2 className="font-display font-bold text-lg text-white tracking-wide">Trajectory</h2>
                     </div>

                     <div className="relative pl-4">
                        {/* Line */}
                        <div className="absolute left-[1.65rem] top-2 bottom-4 w-0.5 bg-slate-800"></div>

                        <div className="space-y-10">
                           {detail.learningRoadmap.map((step, idx) => (
                              <div key={idx} className="relative pl-8 group">
                                 <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 group-hover:border-emerald-500 group-hover:scale-110 transition-all z-10 shadow-md"></div>
                                 <h4 className="text-slate-300 font-medium group-hover:text-emerald-400 transition-colors text-sm md:text-base">
                                    {step}
                                 </h4>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* PHILOSOPHY CARD */}
                  <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 p-5 md:p-7 rounded-2xl text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-40 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                     <Brain className="w-7 h-7 text-indigo-400 mx-auto mb-4 opacity-80" />
                     <blockquote className="text-base md:text-lg italic font-serif text-indigo-100/90 relative z-10 leading-relaxed">
                        "{detail.philosophicalImplications}"
                     </blockquote>
                  </div>

               </div>

               {/* RIGHT COLUMN (Oracle & Navigation) - 4 Cols */}
               <div className="lg:col-span-4 space-y-10">
                  <div className="sticky top-10 space-y-10">

                     {/* ORACLE TERMINAL */}
                     <div className="bg-black/60 backdrop-blur-xl border border-accent/20 rounded-2xl p-1 shadow-xl">
                        <div className="bg-slate-900/80 rounded-xl p-4 border border-white/5">
                           <div className="flex items-center gap-3 mb-6 text-accent-glow">
                              <MessageSquare className="w-4 h-4" />
                              <h3 className="font-display font-bold tracking-wider uppercase text-xs">Direct Uplink</h3>
                           </div>
                           <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                              Communicate directly with the <strong>{topic.title}</strong> entity.
                           </p>
                           <OracleTerminal topicTitle={topic.title} />
                        </div>
                     </div>

                     {/* NEARBY SINGULARITIES */}
                     <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-4">
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-4">Nearby Singularities</h4>
                        <div className="space-y-2">
                           {relatedTopics.map(t => (
                              <Link
                                 key={t.id}
                                 to={`/topic/${t.id}`}
                                 className="w-full text-left group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-accent/30 transition-all duration-300 block"
                              >
                                 <span className="text-sm font-medium text-slate-300 group-hover:text-white truncate pr-2">
                                    {t.title}
                                 </span>
                                 <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-transform flex-shrink-0" />
                              </Link>
                           ))}
                        </div>
                     </div>

                  </div>
               </div>

            </div>
         </div>

      </div>
   );
};

export default DetailView;