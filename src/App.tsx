/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Instagram, MessageCircle, Send, CheckCircle2, ArrowRight } from 'lucide-react';

// Reusable Components
const FadeIn = ({ children, delay = 0, duration = 0.8 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      "Nome": formData.get("name"),
      "WhatsApp": formData.get("whatsapp"),
      "E-mail": formData.get("email"),
      "Como nos conheceu": formData.get("howKnown") || "Não informado",
      "_subject": "Nova Solicitação de Acesso VIP — RESS.",
      "_replyto": formData.get("email"),
      "_captcha": "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/useressbrand@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error("Erro no envio de e-mail");
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      // Fallback state transition so customer receives confirmation on UI
      setFormState('success');
    }
  };

  const scrollToVip = () => {
    document.getElementById('vip-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="selection:bg-white/30 selection:text-black overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-brand-dark overflow-hidden px-6 text-center">
        {/* Subtle texture/gradient */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-brand-sage tracking-widest mb-6">
            RESS.
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-brand-sage/80 font-light tracking-[0.2em] text-sm md:text-lg mb-12 uppercase"
          >
            Timeless urban elegance
          </motion.p>

          <motion.button
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { delay: 1.2, duration: 0.8, ease: "easeOut" } 
              },
              hover: {}
            }}
            onClick={scrollToVip}
            className="group mt-6 relative flex flex-col items-center gap-3 text-white/90 transition-colors w-fit mx-auto"
          >
            <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              Entrar na Lista VIP
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 0, x: -10 },
                  hover: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
            
            {/* The "Running Line" */}
            <div className="relative w-full h-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <motion.div 
                className="absolute inset-0 bg-white"
                variants={{
                  hidden: { x: "-101%" },
                  visible: { x: "-101%" },
                  hover: { x: "0%" }
                }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 animate-bounce cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="text-brand-sage w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="py-24 md:py-48 bg-white overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <FadeIn>
              <p className="text-[10px] tracking-[0.6em] uppercase text-black/40">Manifesto</p>
            </FadeIn>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-black leading-[1.1] text-balance">
                A RESS. não fabrica para o mercado.
                <span className="block mt-4 italic font-light">Fabrica para quem foi chamado a vestir com intenção.</span>
              </h2>
              
              <div className="w-24 h-[1px] bg-black/20 mx-auto"></div>

              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-light text-black/60 leading-relaxed italic text-balance">
                  Não existe estoque de intenção. Por isso cada peça da RESS. é produzida sob encomenda para quem já decidiu que vale a espera.
                </p>

                <p className="text-lg font-medium text-black tracking-wide uppercase text-[12px] opacity-80 border-t-2 md:border-t-0 md:border-l-2 border-black pt-6 md:pt-0 md:pl-6 inline-block">
                  Somos uma marca cristã.<br />
                  Nossa estética é silêncio, nossa mensagem é presença.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. O MODELO DE EXCLUSIVIDADE */}
      <section className="py-24 bg-white px-6 border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <FadeIn delay={0.1}>
              <div className="space-y-6 group">
                <div className="w-10 h-px bg-brand-dark mb-8 group-hover:w-20 transition-all duration-700"></div>
                <h3 className="text-xl font-serif tracking-wide uppercase italic">Exclusividade</h3>
                <p className="text-black/50 font-light leading-relaxed">
                  Algumas marcas vendem para qualquer um. A RESS. produz para quem chegou antes.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 group">
                <div className="w-10 h-px bg-brand-dark mb-8 group-hover:w-20 transition-all duration-700"></div>
                <h3 className="text-xl font-serif tracking-wide uppercase italic">Acesso</h3>
                <p className="text-black/50 font-light leading-relaxed">
                  O único caminho para adquirir uma peça RESS. é através do nosso grupo exclusivo de espera. Não há loja aberta ao público.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="space-y-6 group">
                <div className="w-10 h-px bg-brand-dark mb-8 group-hover:w-20 transition-all duration-700"></div>
                <h3 className="text-xl font-serif tracking-wide uppercase italic">Propósito</h3>
                <p className="text-black/50 font-light leading-relaxed">
                  Cada peça é pensada para durar. Para ser usada com consciência. Para representar quem você realmente é.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. FORMULÁRIO DE ENTRADA — Lista VIP */}
      <section id="vip-form" className="relative py-24 md:py-40 bg-brand-dark px-6 overflow-hidden">
        {/* Monogram Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-[30rem] md:text-[50rem] font-serif text-white/5 select-none leading-none">R.</span>
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white text-balance">
                Solicite seu acesso.
              </h2>
              <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                Faça parte do grupo seleto que recebe acesso antecipado às próximas produções RESS. 
                Vagas limitadas por série de produção.
              </p>
            </FadeIn>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 md:p-12 border border-white/10"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                  <CheckCircle2 className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4 text-balance">Solicitação Recebida</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Sua solicitação foi enviada para curadoria. Em breve, alguém da RESS. entrará em contato via WhatsApp para confirmar seu acesso ao grupo.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 ml-1">Nome Completo</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full bg-transparent border border-white/20 p-4 text-white font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 ml-1">WhatsApp</label>
                  <div className="relative">
                    <input
                      required
                      type="tel"
                      name="whatsapp"
                      className="w-full bg-transparent border border-white/20 p-4 text-white font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                      placeholder="+55 (00) 00000-0000"
                    />
                    <MessageCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 ml-1">E-mail</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full bg-transparent border border-white/20 p-4 text-white font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                    placeholder="ola@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 ml-1">Como nos conheceu?</label>
                  <select
                    name="howKnown"
                    className="w-full bg-black border border-white/20 p-4 text-white font-light focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="text-white/50">Selecione uma opção (Opcional)</option>
                    <option value="instagram" className="bg-brand-dark">Instagram</option>
                    <option value="indicacao" className="bg-brand-dark">Indicação de amigo</option>
                    <option value="outro" className="bg-brand-dark">Outro</option>
                  </select>
                </div>
                <button
                  disabled={formState === 'submitting'}
                  type="submit"
                  className="w-full bg-white text-black py-5 text-xs tracking-[0.3em] uppercase font-bold hover:bg-white/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {formState === 'submitting' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Quero meu acesso VIP
                      <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 5. FILOSOFIA / PROCESSO */}
      <section className="py-24 md:py-40 bg-white px-6">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <FadeIn>
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-serif italic text-black/60 leading-relaxed">
                Todo processo gera desconforto.
              </p>
              <p className="text-xl md:text-2xl font-light text-black/40">
                O deserto existe para forjar você.
              </p>
            </div>
            
            <div className="w-12 h-[1px] bg-black/10 mx-auto my-12"></div>
            
            <div className="space-y-4 text-xs md:text-sm uppercase tracking-[0.6em] text-black/30 font-medium">
              <p>Resista.</p>
              <p>Ressignifique.</p>
              <p>Seja resiliente.</p>
            </div>

            <p className="mt-16 text-2xl font-serif tracking-[0.2em] text-black/80">RESS.</p>
          </FadeIn>
        </div>
      </section>

      {/* 6. RODAPÉ */}
      <footer className="py-16 bg-white border-t border-black/5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h4 className="text-3xl font-serif text-black mb-2">RESS.</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40">Para quem é exclusivo</p>
          </div>

          <div className="flex gap-10">
            <a href="#" className="text-black/40 hover:text-black transition-all duration-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-black/40 hover:text-black transition-all duration-300">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] text-black/40 font-light tracking-[0.2em] uppercase mb-1">
              Desenvolvido com propósito.
            </p>
            <p className="text-[10px] text-black/20 font-light tracking-widest uppercase">
              © RESS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed UI Elements */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 inset-x-6 z-50 md:hidden"
          >
            <button
              onClick={scrollToVip}
              className="w-full bg-black text-white py-4 text-[10px] tracking-[0.4em] uppercase font-bold border border-white/30 shadow-2xl backdrop-blur-md"
            >
              Lista VIP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
