'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Animação do subtítulo
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.6
        }
      );

      // Animação dos botões
      gsap.fromTo(actionsRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1
        }
      );

      // Animação da imagem
      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          x: 100,
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
          delay: 0.4
        }
      );

      // Animação de hover no botão CTA
      const ctaButton = actionsRef.current?.querySelector('.ctaButton');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={heroRef} style={{ background: 'var(--white)' }}>
      <div className="container">
        <section className={styles.hero}>
          {/* Left Content */}
          <div className={styles.heroContent}>
            <h1 ref={titleRef}>
              Protegemos Você,<br />
              Como Se Fosse <br />
              <span>Nossa Família</span>
            </h1>
            <p ref={subtitleRef}>
              Desde 1994, protegendo o que mais importa para você e<br />
              sua família
            </p>
            <div className={styles.heroActions} ref={actionsRef}>
              <div className={styles.selectWrapper}>
                <select>
                  <option value="">Selecione o tipo de seguro</option>
                  <option value="auto">Seguro Auto</option>
                  <option value="vida">Seguro de Vida</option>
                  <option value="residencia">Seguro Residencial</option>
                  <option value="empresa">Seguro Empresarial</option>
                </select>
              </div>
              <a href="/cotacao" className={styles.ctaButton}>
                Cotar agora!
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.heroImage} ref={imageRef}>
            <div className={styles.blobAnimation}>
              <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 120 120">
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
            <Image
              src="/hero.png"
              alt="Pai cuidando do filho no carro - família segura"
              width={600}
              height={800}
              priority
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}