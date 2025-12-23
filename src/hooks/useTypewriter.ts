import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text: string, speed: number = 20) => {
    const [displayedText, setDisplayedText] = useState('');
    const index = useRef(0);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Reset when text content changes completely (not just appended)
        if (!text.startsWith(displayedText)) {
            setDisplayedText('');
            index.current = 0;
        }
    }, [text]);

    useEffect(() => {
        if (index.current < text.length) {
            timer.current = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index.current));
                index.current++;
            }, speed);
        }
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [text, displayedText, speed]);

    return displayedText;
};
