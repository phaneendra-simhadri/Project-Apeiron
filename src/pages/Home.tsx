import React, { useMemo, useState } from 'react';
import { Search, Shuffle, Loader2, Github, Linkedin, ExternalLink } from 'lucide-react';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types';
import { STATIC_TOPICS } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [topics] = useState<Topic[]>(STATIC_TOPICS);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading] = useState<boolean>(false);
    const navigate = useNavigate();

    const filteredTopics = useMemo(() => {
        if (!searchQuery) return topics;
        const lowerQ = searchQuery.toLowerCase();
        return topics.filter(t =>
            t.title.toLowerCase().includes(lowerQ) ||
            t.shortDescription.toLowerCase().includes(lowerQ) ||
            t.id.toLowerCase().includes(lowerQ)
        );
    }, [topics, searchQuery]);

    const handleRandomJump = () => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        navigate(`/topic/${randomTopic.id}`);
    };

    return (
        <div className="container mx-auto px-2 pt-16 pb-10">
            <div className="text-center mb-10 animate-float">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-3 drop-shadow-xl">
                    PROJECT <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-600">APEIRON</span>
                </h1>
                <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                    The infinite archive of Computer Science.
                    <br className="hidden md:block" />Where logic meets the abyss.
                </p>
            </div>

            {/* Search Bar & Random Jump */}
            <div className="max-w-xl mx-auto mb-10 relative z-20">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-grow group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-cyan-500 rounded-full blur opacity-10 group-hover:opacity-30 transition duration-500 group-hover:duration-150"></div>
                        <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-accent/50">
                            <Search className="w-4 h-4 text-slate-400 mr-2" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search the void..."
                                className="bg-transparent border-none outline-none w-full text-lg text-white placeholder-slate-500 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search topics"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleRandomJump}
                        className="relative group px-8 py-4 rounded-full bg-slate-900/80 border border-slate-700/50 hover:border-accent/50 hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center whitespace-nowrap overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                        aria-label="Jump to a random topic"
                    >
                        <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <Shuffle className="w-5 h-5 mr-3 text-accent group-hover:animate-spin" aria-hidden="true" />
                        <span className="font-mono text-base font-bold tracking-wider text-slate-300 group-hover:text-white relative z-10">RANDOM JUMP</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-12 h-12 animate-spin text-accent" />
                    <span className="ml-4 text-xl tracking-widest font-display text-slate-500">SCANNING SECTOR...</span>
                </div>
            ) : (
                <>
                    {filteredTopics.length === 0 ? (
                        <div className="text-center text-slate-500 py-20">
                            <p className="text-xl">No anomalies detected matching that query.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            {filteredTopics.map((topic, index) => (
                                <div
                                    key={topic.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <TopicCard topic={topic} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-sm mt-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <span className="font-display font-bold text-slate-300 tracking-wide text-lg">PROJECT APEIRON</span>
                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mx-2"></span>
                        <span>v3.0.0</span>
                    </div>

                    <div className="flex items-center space-x-8">
                        <a href="#" className="flex items-center hover:text-white transition-colors">
                            <Github className="w-4 h-4 mr-2" />
                            <span>Source</span>
                        </a>
                        <a href="#" className="flex items-center hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4 mr-2" />
                            <span>Connect</span>
                        </a>
                        <a href="#" className="flex items-center hover:text-accent transition-colors">
                            <span>Portfolio</span>
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
