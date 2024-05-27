// src/api/useAutocomplete.ts
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuggestions = async (): Promise<string[]> => {
  const { data } = await axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`);
  return data;
};

export const useAutocomplete = () => {
  return useQuery(['autocomplete'], () => fetchSuggestions());
};
