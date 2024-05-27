// src/store/useFormulaStore.ts
import create from 'zustand';

interface FormulaState {
  formula: string[];
  addTag: (tag: string) => void;
  updateTag: (index: number, newTag: string) => void;
  removeTag: (index: number) => void;
}

const useFormulaStore = create<FormulaState>((set) => ({
  formula: [],
  addTag: (tag) => set((state) => ({ formula: [...state.formula, tag] })),
  updateTag: (index, newTag) => set((state) => {
    const newFormula = [...state.formula];
    newFormula[index] = newTag;
    return { formula: newFormula };
  }),
  removeTag: (index) => set((state) => ({
    formula: state.formula.filter((_, i) => i !== index)
  })),
}));

export default useFormulaStore;
