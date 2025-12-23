import React from 'react';
import { Link } from 'react-router-dom';
import { Topic } from '../types';
import * as Icons from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  // Dynamic Icon rendering
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[topic.iconName] || Icons.Code;

  // Determine border color based on difficulty
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Infinite': return 'text-purple-400 border-purple-500/30';
      case 'Very High': return 'text-pink-400 border-pink-500/30';
      case 'High': return 'text-cyan-400 border-cyan-500/30';
      default: return 'text-slate-400 border-slate-500/30';
    }
  };

  return (
    <Link
      to={`/topic/${topic.id}`}
      className="group relative p-4 bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.005] hover:-translate-y-0.5 hover:bg-slate-800/50 hover:border-accent/50 hover:shadow-[0_0_20px_-8px_rgba(139,92,246,0.15)] flex flex-col h-full overflow-hidden block focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-slate-950"
      aria-label={`Learn about ${topic.title}: ${topic.shortDescription}`}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-accent transition-all duration-500 opacity-50 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between mb-8">
        <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
          <IconComponent className="w-5 h-5 text-slate-300 group-hover:text-accent group-hover:scale-105 transition-all duration-300" aria-hidden="true" />
        </div>
        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-full bg-slate-950/50 backdrop-blur-md ${getDifficultyColor(topic.difficulty)}`} aria-label={`Difficulty: ${topic.difficulty}`}>
          {topic.difficulty}
        </span>
      </div>

      <h3 className="relative z-10 text-lg font-bold font-display text-white mb-2 group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">
        {topic.title}
      </h3>

      <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">
        {topic.shortDescription}
      </p>

      <div className="relative z-10 mt-auto flex items-center text-[11px] font-bold tracking-widest uppercase text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true">
        <span className="mr-1">Initiate Sequence</span>
        <Icons.ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default TopicCard;