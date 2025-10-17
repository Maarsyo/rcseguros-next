'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/Services.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      // Animação dos cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotation: 5
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
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animação de hover
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
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
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className={styles.services} ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef}>Nossos serviços</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard} ref={addToRefs}>
            <div className={styles.serviceImage}>
              <img src="/auto.png" alt="Seguro Auto" />
            </div>
            <div className={styles.serviceContent}>
              <h3>Seguro Auto</h3>
              <p>Escolha coberturas que fazem sentido para você e proteja seu veículo de diversas situações.</p>
              <button className={styles.serviceButton}>Cotar gratuitamente</button>
            </div>
          </div>

          <div className={styles.serviceCard} ref={addToRefs}>
            <div className={styles.serviceImage}>
              <img src="/viagem.png" alt="Seguro Residencial" />
            </div>
            <div className={styles.serviceContent}>
              <h3>Seguro Residencial</h3>
              <p>Proteger sua casa é mais barato do que você imagina. Fique livre de imprevistos e pequenos reparos.</p>
              <button className={styles.serviceButton}>Cotar gratuitamente</button>
            </div>
          </div>

          <div className={styles.serviceCard} ref={addToRefs}>
            <div className={styles.serviceImage}>
              <img src="/residencial.png" alt="Seguro Viagem" />
            </div>
            <div className={styles.serviceContent}>
              <h3>Seguro Viagem</h3>
              <p>Viaje com a tranquilidade de estar segurado(a) em qualquer lugar, com proteção a imprevistos e acidentes.</p>
              <button className={styles.serviceButton}>Cotar gratuitamente</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}