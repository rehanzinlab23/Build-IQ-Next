"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  skill: string;
  buildType: string;
  market: string;
  experience: string;
}

interface ConsultationContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  roadmapChecks: Record<string, boolean>;
  setRoadmapChecks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    skill: '',
    buildType: '',
    market: '',
    experience: '',
  });
  const [roadmapChecks, setRoadmapChecks] = useState<Record<string, boolean>>({});

  return (
    <ConsultationContext.Provider value={{ formData, setFormData, roadmapChecks, setRoadmapChecks }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error('useConsultation must be used within ConsultationProvider');
  return ctx;
};
