import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ResultsSummaryBar = () => {
  const benefits = [
    "Menos fricción",
    "Más control",
    "Datos accionables",
    "Crecimiento medible"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full rounded-[13px] border p-6 sm:p-0 sm:h-[125px] flex items-center justify-center mt-7 relative z-10"
      style={{
        background: 'linear-gradient(145deg, rgba(11, 31, 58, 0.90), rgba(7, 23, 45, 0.95))',
        borderColor: 'rgba(74, 127, 194, 0.18)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="w-full h-full grid grid-cols-1 max-[359px]:grid-cols-1 max-md:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-start sm:justify-center gap-4 py-3 sm:py-0 ${
              index !== benefits.length - 1 ? 'lg:border-r border-blue-500/10' : ''
            }`}
          >
            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center shrink-0"
              style={{
                background: '#041126',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.25)'
              }}
            >
              <Check className="w-6 h-6 text-[#60a5fa]" />
            </div>
            <span className="text-[19px] font-medium text-white">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResultsSummaryBar;
