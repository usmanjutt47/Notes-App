export type Note = {
  title: string;
  description: string;
};

export type NoteModalProps = {
  visible: boolean;
  title: string;
  description: string;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
};
