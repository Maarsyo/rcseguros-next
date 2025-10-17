'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do texto
      gsap.fromTo(textRef.current,
        {
          opacity: 0,
          x: -50,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animação da imagem
      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          x: 50,
          scale: 0.8,
          rotation: 5
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} ref={sectionRef}>
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={styles.aboutText} ref={textRef}>
            <h2>Sobre nós</h2>
            <h3>Porque você deve contar com a RCSeguros?</h3>
            <p>
              Há mais de 40 anos no mercado, a RCSeguros constrói relações duradouras com clientes e seguradoras. 
              Somos referência em atendimento consultivo e personalização de seguros, oferecendo proteção sob medida 
              com economia, confiança e agilidade.
            </p>
          </div>
          <div className={styles.aboutImage} ref={imageRef}>
            <div className={styles.blobAnimation}>
              <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 120 120"> {/* Increased viewBox size */}
                <defs>
                  <style>
                    {`
                      @keyframes rotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                      .out-top { animation: rotate 20s linear infinite; transform-origin: 20px 40px; }
                      .in-top { animation: rotate 10s linear infinite; transform-origin: 20px 40px; }
                      .out-bottom { animation: rotate 25s linear infinite; transform-origin: 100px 110px; }
                      .in-bottom { animation: rotate 15s linear infinite; transform-origin: 100px 110px; }
                    `}
                  </style>
                </defs>
                <path fill="#1e3a8a" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z" />
                <path fill="#3b82f6" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z" />
                <path fill="#60a5fa" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
                <path fill="#93c5fd" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
              </svg>
            </div>
            <img src="/about.png" alt="Sobre RCSeguros" />
          </div>
        </div>
      </div>
    </section>
  );
}