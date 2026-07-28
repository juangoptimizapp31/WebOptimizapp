import React from 'react';
import { Helmet } from 'react-helmet';

import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import ProblemIdentification from '@/components/ProblemIdentification';
import ValueProposition from '@/components/ValueProposition';
import WhatYouGet from '@/components/WhatYouGet';
import ProofTrust from '@/components/ProofTrust';
import ServicesCatalog from '@/components/ServicesCatalog';
import WorkMethod from '@/components/WorkMethod';
import Footer from '@/components/Footer';

import { Toaster } from '@/components/ui/toaster';

export default function OptimizAppLanding() {
  return (
    <>
      <Helmet>
        <title>OptimizApp - Intelligent Cloud & AI Solutions</title>
      </Helmet>
      <Navbar />
      <main className="relative min-h-screen bg-[#030711] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
        <section id="inicio">
          <Hero />
        </section>
        <section id="problema">
          <ProblemIdentification />
        </section>
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
          <section id="propuesta">
            <ValueProposition />
          </section>
          <section id="beneficios">
            <WhatYouGet />
          </section>
          <section id="confianza">
            <ProofTrust />
          </section>
          <section id="soluciones">
            <ServicesCatalog />
          </section>
          <section id="contacto">
            <WorkMethod />
          </section>
        </div>
        <Footer />
        <Toaster />
      </main>
    </>
  );
}
