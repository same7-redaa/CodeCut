import React from 'react';
import payImageUrl from '../PAY.png?url';

const PaymentSection: React.FC = () => {
  return (
    <section className="pb-6 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src={payImageUrl} 
            alt="طرق الدفع المتاحة" 
            className="w-full h-auto object-contain rounded-xl shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
