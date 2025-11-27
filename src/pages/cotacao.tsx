// app/cotacao-auto/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import styles from './CotacaoAuto.module.css'; // Import CSS Module

// Schema de validação com Yup (igual ao anterior)
const schema = yup.object({
  placa: yup.string().when('isZeroKm', {
    is: false,
    then: yup
      .string()
      .required('Placa é obrigatória')
      .test('placa-valida', 'Placa inválida', (value) => {
        if (!value) return false;
        const placa = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        return /^[A-Z]{3}[0-9]{4}$/.test(placa) || /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa);
      }),
  }),
  isZeroKm: yup.boolean(),
  marca: yup.string().required('Marca é obrigatória'),
  modelo: yup.string().required('Modelo é obrigatório'),
  anoFabricacao: yup
    .number()
    .required('Ano de fabricação é obrigatório')
    .min(1900, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano não pode ser futuro'),
  anoModelo: yup
    .number()
    .required('Ano do modelo é obrigatório')
    .min(1900, 'Ano inválido')
    .max(new Date().getFullYear() + 1, 'Ano não pode ser muito futuro')
    .when('anoFabricacao', (anoFabricacao, schema) =>
      schema.min(anoFabricacao, 'Ano modelo deve ser >= ano fabricação')
    ),
});

// Array mockado de marcas (igual ao anterior)
const marcas = [
  'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Renault', 'Nissan', 'Jeep',
  'BMW', 'Mercedes-Benz', 'Audi', 'Peugeot', 'Citroën', 'Kia', 'Mitsubishi', 'Chery', 'JAC', 'Lifan',
  'Volvo', 'Land Rover', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati', 'Jaguar', 'Mini', 'Smart', 'Suzuki'
];

export default function CotacaoAuto() {
  const [currentStep, setCurrentStep] = useState<'initial' | 'step1' | 'step2'>('initial');
  const { control, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      placa: '',
      isZeroKm: false,
      marca: '',
      modelo: '',
      anoFabricacao: '',
      anoModelo: '',
    },
  });

  const isZeroKm = watch('isZeroKm');
  const stepRef = useRef<HTMLDivElement>(null);

  // Foco automático (igual ao anterior)
  useEffect(() => {
    if (stepRef.current) {
      const firstFocusable = stepRef.current.querySelector('input, select, h1') as HTMLElement;
      if (firstFocusable) firstFocusable.focus();
    }
  }, [currentStep]);

  // Máscara para placa (igual ao anterior)
  const formatPlaca = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}${cleaned.slice(3, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 3)}${cleaned.slice(3, 4)}${cleaned.slice(4, 5)}-${cleaned.slice(5, 7)}`;
  };

  const onSubmit = (data: any) => {
    console.log('Dados do formulário:', data);
    alert('Cotação enviada! (Simulação)');
  };

  const nextStep = () => {
    if (currentStep === 'initial') setCurrentStep('step1');
    else if (currentStep === 'step1') setCurrentStep('step2');
  };

  const prevStep = () => {
    if (currentStep === 'step2') setCurrentStep('step1');
    else if (currentStep === 'step1') setCurrentStep('initial');
  };

  const canAdvanceFromStep1 = () => {
    const placa = watch('placa');
    return isZeroKm || (placa && !errors.placa);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={`${styles.container} ${styles.main}`}>
        <AnimatePresence mode="wait">
          {currentStep === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.center}
            >
              <h1 className={styles.title}>Cotação de Seguro Auto</h1>
              <div className={styles.card}>
                <button
                  onClick={nextStep}
                  className={styles.buttonPrimary}
                >
                  Possuo Veículo
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'step1' && (
            <motion.div
              key="step1"
              ref={stepRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={styles.card}
            >
              <h1 className={styles.stepTitle}>Qual é a placa do seu carro?</h1>
              <form>
                <Controller
                  name="placa"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Ex: ABC-1234 ou ABC1D23"
                      className={styles.input}
                      onChange={(e) => field.onChange(formatPlaca(e.target.value))}
                      disabled={isZeroKm}
                    />
                  )}
                />
                {errors.placa && <p className={styles.error}>{errors.placa.message}</p>}
                <Controller
                  name="isZeroKm"
                  control={control}
                  render={({ field }) => (
                    <label className={styles.checkboxLabel}>
                      <input
                        {...field}
                        type="checkbox"
                        className={styles.checkbox}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          if (e.target.checked) setValue('placa', '');
                        }}
                      />
                      Veículo 0km / Ainda não possuo placa
                    </label>
                  )}
                />
                <div className={styles.buttonContainer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.buttonSecondary}
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canAdvanceFromStep1()}
                    className={styles.buttonPrimary}
                  >
                    Avançar
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === 'step2' && (
            <motion.div
              key="step2"
              ref={stepRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={styles.card}
            >
              <h1 className={styles.stepTitle}>Qual o modelo do veículo?</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="marca"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className={styles.select}>
                      <option value="">Selecione a marca</option>
                      {marcas.map((marca) => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>
                  )}
                />
                {errors.marca && <p className={styles.error}>{errors.marca.message}</p>}
                <Controller
                  name="modelo"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Modelo do Veículo"
                      className={styles.input}
                    />
                  )}
                />
                {errors.modelo && <p className={styles.error}>{errors.modelo.message}</p>}
                <Controller
                  name="anoFabricacao"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Ano de Fabricação"
                      className={styles.input}
                    />
                  )}
                />
                {errors.anoFabricacao && <p className={styles.error}>{errors.anoFabricacao.message}</p>}
                <Controller
                  name="anoModelo"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Ano do Modelo"
                      className={styles.input}
                    />
                  )}
                />
                {errors.anoModelo && <p className={styles.error}>{errors.anoModelo.message}</p>}
                <div className={styles.buttonContainer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.buttonSecondary}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className={styles.buttonPrimary}
                  >
                    Calcular Cotação
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}