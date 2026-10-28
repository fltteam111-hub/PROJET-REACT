import { createSlice } from "@reduxjs/toolkit";

const panierSauvegarde = localStorage.getItem("panier");

const initialState = {
  items: panierSauvegarde ? JSON.parse(panierSauvegarde) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    ajouterAuPanier: (state, action) => {
      const livre = action.payload;

      const livreExistant = state.items.find(
        (item) => item.id === livre.id
      );

      if (livreExistant) {
        livreExistant.quantite += 1;
      } else {
        state.items.push({
          ...livre,
          quantite: 1,
        });
      }
    },

    supprimerDuPanier: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    modifierQuantite: (state, action) => {
      const { id, quantite } = action.payload;

      const livre = state.items.find((item) => item.id === id);

      if (livre && quantite >= 1) {
        livre.quantite = quantite;
      }
    },
  },
});

export const {
  ajouterAuPanier,
  supprimerDuPanier,
  modifierQuantite,
} = cartSlice.actions;

export default cartSlice.reducer;
