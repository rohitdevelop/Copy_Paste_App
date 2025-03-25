import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: JSON.parse(localStorage.getItem("pastes")) || [],
};

export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const { title, content } = action.payload;
      const trimmedTitle = title.trim();
      const trimmedContent = content.trim();

      if (!trimmedTitle || !trimmedContent) {
        toast.error("Title and content cannot be empty!"); // Moved outside
        return;
      }

      if (state.pastes.some((p) => p.title === trimmedTitle)) {
        toast.error("A paste with the same title already exists!"); // Moved outside
        return;
      }

      const newPaste = {
        ...action.payload,
        _id: Date.now().toString(36),
        createdAt: new Date().toISOString(),
      };

      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify([...state.pastes])); // Ensuring fresh reference
      toast.success("Paste Created Successfully"); // Moved outside
    },

    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      state.pastes = state.pastes.map((paste) =>
        paste._id === updatedPaste._id ? updatedPaste : paste
      );

      localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
      toast.success("Paste Updated Successfully"); // Moved outside
    },

    removePaste: (state, action) => {
      state.pastes = state.pastes.filter((paste) => paste._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
      toast.success("Paste Removed Successfully"); // Moved outside
    },
  },
});

export const { addToPastes, updateToPaste, removePaste } = PasteSlice.actions;
export default PasteSlice.reducer;
