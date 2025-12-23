import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailView from '../components/DetailView';
import { fetchTopicDetail, STATIC_TOPICS } from '../services/geminiService';
import { Topic, TopicDetail } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [detail, setDetail] = useState<TopicDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const loadingText = useTypewriter("CALCULATING TRAJECTORY...", 50);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            const foundTopic = STATIC_TOPICS.find(t => t.id === id);
            if (!foundTopic) {
                navigate('/');
                return;
            }
            setTopic(foundTopic);
            setLoading(true);

            try {
                const fetchedDetail = await fetchTopicDetail(id, foundTopic.title);
                if (fetchedDetail) {
                    setDetail(fetchedDetail);
                }
            } catch (error) {
                console.error("Failed to load detail", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, navigate]);

    if (loading || !topic) {
        return (
            <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/80 backdrop-blur-md z-50">
                <div className="relative">
                    <div className="w-24 h-24 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <h2 className="mt-8 text-3xl font-bold font-display text-white tracking-widest animate-pulse">
                    ENTERING {topic?.title?.toUpperCase() || 'SECTOR'}
                </h2>
                <p className="text-slate-400 mt-2 font-mono text-sm">{loadingText}</p>
            </div>
        );
    }

    if (!detail) {
        return <div>Error loading content...</div>;
    }

    return (
        <DetailView
            topic={topic}
            detail={detail}
            allTopics={STATIC_TOPICS}
        />
    );
};

export default Detail;
