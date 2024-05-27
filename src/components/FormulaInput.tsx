// src/components/FormulaInput.tsx
import React, { useState, KeyboardEvent } from 'react';
import useFormulaStore from '../store/useFormulaStore';
import { useAutocomplete } from '../api/useAutocomplete';
import { TextField, Chip, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const FormulaInput: React.FC = () => {
  const { formula, addTag, updateTag, removeTag } = useFormulaStore();
  const [inputValue, setInputValue] = useState<string>('');
  const [currentTag, setCurrentTag] = useState<number | null>(null);
  const { data: suggestions } = useAutocomplete();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagClick = (index: number) => {
    setCurrentTag(index);
    setInputValue(formula[index]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentTag !== null) {
        updateTag(currentTag, inputValue);
        setCurrentTag(null);
      } else {
        addTag(inputValue);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && currentTag !== null) {
      removeTag(currentTag);
      setCurrentTag(null);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', marginBottom: 2 }}>
        {formula.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onClick={() => handleTagClick(index)}
            onDelete={() => removeTag(index)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          placeholder="Enter formula..."
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
      </Box>
      {suggestions && (
        <Paper>
          <List>
            {suggestions?.map((suggestion:any, index) => (
              <ListItem button key={index} onClick={() => setInputValue(suggestion?.name)}>
                <ListItemText primary={suggestion?.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FormulaInput;
