import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { NoteModal } from "@/components/NoteModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Note } from "@/types";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (title.trim() || description.trim()) {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = { title, description };
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, { title, description }]);
      }
    }
    setModalVisible(false);
    setTitle("");
    setDescription("");
    setEditingIndex(null);
  };

  const handleEdit = (idx: number) => {
    setTitle(notes[idx].title);
    setDescription(notes[idx].description);
    setEditingIndex(idx);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTitle("");
    setDescription("");
    setEditingIndex(null);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Create Your Notes
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            setTitle("");
            setDescription("");
            setEditingIndex(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Create Note</Text>
        </TouchableOpacity>

        <ScrollView style={{ marginTop: "5%" }}>
          {notes.map((note, idx) => (
            <View key={idx} style={styles.noteCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleEdit(idx)}
                style={{ flex: 1 }}
              >
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteDescription}>{note.description}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const updatedNotes = notes.filter((_, i) => i !== idx);
                  setNotes(updatedNotes);
                }}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: 4,
                  backgroundColor: "#ffffffff",
                  borderRadius: 14,
                }}
              >
                <MaterialIcons name="delete" size={24} color="#ff4d4f" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <NoteModal
          visible={modalVisible}
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </View>
    </Wrapper>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "95%",
    height: "100%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 14,
    color: "#333",
  },
});
