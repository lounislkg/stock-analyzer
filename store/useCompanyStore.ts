import { create } from "zustand";
import { type RawDatas } from "@/utils/dataDescription";

// Définition du type des données stockées
interface CompanyState {
	data: RawDatas | null; // Les données de l'entreprise
	setData: (data: RawDatas) => void; // Fonction pour mettre à jour les données
}

// Création du store Zustand
export const useCompanyStore = create<CompanyState>((set) => ({
	data: null, // État initial
	setData: (data) => set({ data }), // Fonction pour mettre à jour l'état
}));
