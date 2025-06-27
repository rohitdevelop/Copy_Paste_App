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
        toast.error("Title and content cannot be empty!");
        return;
      }

      if (state.pastes.some((p) => p.title === trimmedTitle)) {
        toast.error("A paste with the same title already exists!");
        return;
      }

      const newPaste = {
        ...action.payload,
        _id: Date.now().toString(36),
        createdAt: new Date().toISOString(),
        isReminderEnabled: false, // ✅ NEW
      };

      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
      toast.success("Paste Created Successfully");
    },

    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      state.pastes = state.pastes.map((paste) =>
        paste._id === updatedPaste._id ? updatedPaste : paste
      );

      localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
      toast.success("Paste Updated Successfully");
    },

    removePaste: (state, action) => {
      state.pastes = state.pastes.filter((paste) => paste._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
      toast.success("Deleted successfully!");
    },

    toggleReminder: (state, action) => {
      const task = state.pastes.find((p) => p._id === action.payload);
      if (task) {
        task.isReminderEnabled = !task.isReminderEnabled;
        toast.success(`Reminder ${task.isReminderEnabled ? "Enabled" : "Disabled"}!`);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
  },
});

export const { addToPastes, updateToPaste, removePaste, toggleReminder } = PasteSlice.actions;
export default PasteSlice.reducer;
