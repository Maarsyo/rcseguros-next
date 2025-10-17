'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/TrustSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logos = [
    { name: "Porto Seguro", image: "/porto-seguro.svg" },
    { name: "Allianz", image: "/allianz.png" },
    { name: "Tokio Marine", image: "/tokio-marine.svg" },
    { name: "Bradesco Seguros", image: "/bradesco-seguros.svg" },
    { name: "Azul Seguros", image: "/azul-seguros.svg" },
    { name: "Itaú Seguros", image: "/itau.svg" },
    { name: "Zurich", image: "/zurich.svg" },
  ];

  return (
    <section className={styles.trustSection} ref={sectionRef}>
      <div className="container">
        <h2 >
          Confiado por mais de <strong>50.000</strong> clientes
        </h2>
        <p className={styles.subtitle}>Nossa rede de seguradoras parceiras</p>
        <div className={styles.logosContainer}>
          <div className={styles.logosTrack}>
            {logos.map((logo, index) => (
              <div key={index} className={styles.logoItem}>
                <div className={styles.logoCard}>
                  <img src={logo.image} alt={logo.name} />
                </div>
              </div>
            ))}
            {logos.map((logo, index) => (
              <div key={`duplicate-${index}`} className={styles.logoItem}>
                <div className={styles.logoCard}>
                  <img src={logo.image} alt={logo.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}