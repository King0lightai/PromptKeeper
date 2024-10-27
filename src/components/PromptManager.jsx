import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { addPromptToDb, getPromptsFromDb, deletePromptFromDb, updatePromptInDb } from '@/lib/db';

const PromptManager = () => {
  // ... (previous state declarations)

  // Load prompts from Firebase on component mount
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const promptsData = await getPromptsFromDb();
        setPrompts(promptsData);
      } catch (error) {
        showAlert('Error loading prompts');
      }
    };
    loadPrompts();
  }, []);

  // Modify addPrompt to use Firebase
  const addPrompt = async () => {
    if (!newPrompt.trim()) {
      showAlert('Please enter a prompt text');
      return;
    }
    if (selectedModels.length === 0) {
      showAlert('Please select at least one model');
      return;
    }
    
    try {
      const promptData = {
        text: newPrompt,
        tags: currentTags,
        models: selectedModels,
      };
      
      const newPromptWithId = await addPromptToDb(promptData);
      setPrompts(prevPrompts => [newPromptWithId, ...prevPrompts]);
      setNewPrompt('');
      setCurrentTags([]);
      setSelectedModels([]);
      showAlert('Prompt saved successfully');
    } catch (error) {
      showAlert('Error saving prompt');
    }
  };

  // Modify deletePrompt to use Firebase
  const deletePrompt = async (id) => {
    try {
      await deletePromptFromDb(id);
      setPrompts(prompts.filter(prompt => prompt.id !== id));
      showAlert('Prompt deleted');
    } catch (error) {
      showAlert('Error deleting prompt');
    }
  };

  // Modify toggleFavorite to use Firebase
  const toggleFavorite = async (promptId) => {
    try {
      const prompt = prompts.find(p => p.id === promptId);
      const isFavorite = favorites.has(promptId);
      
      await updatePromptInDb(promptId, {
        isFavorite: !isFavorite
      });

      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(promptId)) {
          newFavorites.delete(promptId);
        } else {
          newFavorites.add(promptId);
        }
        return newFavorites;
      });
    } catch (error) {
      showAlert('Error updating favorite status');
    }
  };

  // ... (rest of the component remains the same)
};

export default PromptManager;
