import React, { useState, useRef, useEffect } from 'react';
import { streamOracleResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Terminal, Send, Cpu } from 'lucide-react';

// Sub-component for typing effect
const TypewriterText: React.FC<{ text: string, isLast: boolean, isTyping: boolean }> = ({ text, isLast, isTyping }) => {
  // We only animate the LAST message if it is currently being typed by the model
  // Otherwise we show full text (for history)
  if (!isLast) return <>{text}</>;

  // Basic naive implementation: if it's the last message, we just render it.
  // The 'streaming' update in parent already gives a typewriter-like feel because chunks arrive over time.
  // However, we can add a cursor.

  return (
    <>
      {text}
      {isTyping && (
        <span className="inline-block w-2 h-4 ml-1 bg-accent/50 animate-pulse align-middle"></span>
      )}
    </>
  );
};

interface OracleTerminalProps {
  topicTitle: string;
}

const OracleTerminal: React.FC<OracleTerminalProps> = ({ topicTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `CONNECTION ESTABLISHED. I AM ${topicTitle.toUpperCase()}. ASK YOUR QUESTION, HUMAN.`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      let fullResponse = "";
      const stream = streamOracleResponse(topicTitle, userMsg.text);

      // Create a placeholder message
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1].text = fullResponse;
          return newArr;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] w-full bg-black/80 backdrop-blur-xl border border-accent/30 rounded-lg overflow-hidden font-mono shadow-[0_0_30px_-8px_rgba(139,92,246,0.10)]">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 bg-slate-900/90 border-b border-accent/20">
        <div className="flex items-center text-accent">
          <Terminal className="w-3 h-3 mr-1" />
          <span className="text-[11px] tracking-wider font-bold">ORACLE_UPLINK // {topicTitle.toUpperCase()}</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-2 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-2 rounded-lg text-[13px] border ${msg.role === 'user'
                ? 'bg-slate-800/50 border-slate-600 text-slate-200'
                : 'bg-accent/10 border-accent/30 text-accent-glow shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)]'
                }`}
            >
              {msg.role === 'model' && <Cpu className="w-3 h-3 mb-1 opacity-50" />}
              <p className="whitespace-pre-wrap leading-relaxed text-[13px]">
                {msg.role === 'user' ? msg.text : <TypewriterText text={msg.text} isLast={idx === messages.length - 1} isTyping={isTyping} />}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-2 bg-slate-900/90 border-t border-accent/20">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-accent/50">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTyping ? "INCOMING TRANSMISSION..." : "Commune with the entity..."}
            disabled={isTyping}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-md py-2 pl-8 pr-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 text-slate-500 hover:text-accent disabled:opacity-30 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OracleTerminal;