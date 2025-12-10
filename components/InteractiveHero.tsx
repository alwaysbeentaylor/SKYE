
import React, { useEffect, useState } from 'react';

type Theme = 'modern' | 'playful' | 'cyber';

interface InteractiveHeroProps {
    theme: Theme;
}

const InteractiveHero: React.FC<InteractiveHeroProps> = ({ theme }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getThemeStyles = () => {
        switch (theme) {
            case 'playful':
                return {
                    background: 'bg-gradient-to-br from-indigo-100 via-purple-100 to-orange-100 dark:from-indigo-950 dark:via-purple-950 dark:to-orange-950',
                    particleColor: 'bg-orange-400',
                    secondaryParticle: 'bg-purple-400',
                    blur: 'blur-3xl',
                    opacity: 'opacity-60',
                };
            case 'cyber':
                return {
                    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-black',
                    particleColor: 'bg-green-500',
                    secondaryParticle: 'bg-pink-500',
                    blur: 'blur-md',
                    opacity: 'opacity-40',
                };
            case 'modern':
            default:
                return {
                    background: 'bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950',
                    particleColor: 'bg-primary',
                    secondaryParticle: 'bg-blue-300',
                    blur: 'blur-2xl',
                    opacity: 'opacity-30',
                };
        }
    };

    const styles = getThemeStyles();

    return (
        <div className={`absolute inset-0 z-0 overflow-hidden transition-colors duration-1000 ${styles.background}`}>
            {/* Grid Pattern for Cyber Theme */}
            {theme === 'cyber' && (
                <div
                    className="absolute inset-0 bg-grid-pattern opacity-10"
                    style={{
                        transform: `perspective(1000px) rotateX(60deg) translateY(${mousePosition.y * 20}px) translateX(${mousePosition.x * 20}px)`,
                    }}
                />
            )}

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full transition-all duration-700 ease-out ${i % 2 === 0 ? styles.particleColor : styles.secondaryParticle} ${styles.blur} ${styles.opacity}`}
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            left: `${50 + (i % 3 - 1) * 30}%`,
                            top: `${50 + (Math.floor(i / 3) - 0.5) * 40}%`,
                            transform: `translate(
                ${mousePosition.x * (20 + i * 10)}px, 
                ${mousePosition.y * (20 + i * 10)}px
              ) scale(${1 + Math.sin(Date.now() / 1000 + i) * 0.1})`,
                        }}
                    />
                ))}
            </div>

            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-darkBg/80 pointer-events-none"></div>
        </div>
    );
};

export default InteractiveHero;
