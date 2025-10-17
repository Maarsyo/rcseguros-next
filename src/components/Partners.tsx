'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/Partners.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animação dos logos
      logosRef.current.forEach((logo, index) => {
        if (logo) {
          gsap.fromTo(logo,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
              rotation: 10
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "back.out(1.7)",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: logo,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animação de hover
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              y: -5,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !logosRef.current.includes(el)) {
      logosRef.current.push(el);
    }
  };

  return (
    <section className={styles.partners} ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef}>Nossa rede de seguradoras</h2>
        <div className={styles.partnersGrid}>
          <div className={styles.partnerLogo} ref={addToRefs}>
            <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="60" fill="#0A61B8" rx="8"/>
              <text x="60" y="35" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Porto</text>
              <circle cx="20" cy="30" r="8" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
          <div className={styles.partnerLogo} ref={addToRefs}>
            <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="60" fill="#0A61B8" rx="8"/>
              <text x="60" y="35" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Allianz</text>
              <rect x="20" y="20" width="3" height="20" fill="white"/>
              <rect x="30" y="20" width="3" height="20" fill="white"/>
              <rect x="40" y="20" width="3" height="20" fill="white"/>
            </svg>
          </div>
          <div className={styles.partnerLogo} ref={addToRefs}>
            <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="60" fill="#22c55e" rx="8"/>
              <text x="60" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TOKIO MARINE</text>
              <text x="60" y="30" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">SEGURADORA</text>
              <text x="60" y="45" textAnchor="middle" fill="white" fontSize="6">NOSSA TRANSPARÊNCIA</text>
              <text x="60" y="52" textAnchor="middle" fill="white" fontSize="6">SUA CONFIANÇA</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
