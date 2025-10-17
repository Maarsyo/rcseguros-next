'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/components/Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  author: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Katia Cilene",
    quote: "Estou renovando meu seguro com a RCSeguros a mais de 15 anos e não há outras palavras além de agradecimento que posso oferecer. Foram muito competentes e ágeis para realizar qualquer tipo de serviço. Recomendo de olhos fechados!",
    image: "testimonial-1"
  },
  {
    id: 2,
    author: "João Silva",
    quote: "Excelente atendimento! A RCSeguros sempre me ajudou com todas as questões relacionadas ao meu seguro auto. Profissionais muito competentes e sempre disponíveis para esclarecer dúvidas.",
    image: "testimonial-2"
  },
  {
    id: 3,
    author: "Maria Santos",
    quote: "Contratei o seguro residencial através da RCSeguros e fiquei muito satisfeita. O processo foi rápido, o atendimento foi excelente e o preço muito justo. Recomendo para todos!",
    image: "testimonial-3"
  },
  {
    id: 4,
    author: "Carlos Oliveira",
    quote: "Há mais de 10 anos sou cliente da RCSeguros e nunca tive problemas. Sempre que preciso de algo, são muito ágeis e eficientes. É uma empresa de confiança!",
    image: "testimonial-4"
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação da seção
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animação do título
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animação da imagem
      gsap.fromTo(imageRef.current,
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
          delay: 0.4,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animação do texto
      gsap.fromTo(textRef.current,
        {
          opacity: 0,
          x: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animação de transição do depoimento
  useEffect(() => {
    if (authorRef.current && quoteRef.current) {
      gsap.fromTo([authorRef.current, quoteRef.current],
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    }
  }, [currentTestimonial]);

  const goToTestimonial = (index: number) => {
    if (index !== currentTestimonial) {
      gsap.to([authorRef.current, quoteRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentTestimonial(index);
        }
      });
    }
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      <div className="container">
        <div className={styles.testimonialsContent}>
          <div className={styles.testimonialImage} ref={imageRef}>
            <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#f1f5f9" rx="12"/>
              <rect x="50" y="50" width="300" height="200" fill="#e2e8f0" rx="8"/>
              <circle cx="200" cy="120" r="30" fill="#1f2937"/>
              <rect x="170" y="150" width="60" height="80" fill="#3b82f6" rx="5"/>
              <rect x="100" y="200" width="200" height="20" fill="#cbd5e1" rx="10"/>
              <rect x="120" y="230" width="160" height="15" fill="#cbd5e1" rx="7"/>
            </svg>
          </div>
          <div className={styles.testimonialText} ref={textRef}>
            <h2 ref={titleRef}>Depoimentos</h2>
            <div className={styles.testimonialAuthor} ref={authorRef}>{current.author}</div>
            <div className={styles.testimonialQuote} ref={quoteRef}>
              {current.quote}
            </div>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === currentTestimonial ? styles.active : ''}`}
                  onClick={() => goToTestimonial(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
