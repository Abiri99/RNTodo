import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { todoAdded } from '../../state/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { todosSelector } from '../../state/todosSelectors';

function AddTodoScreen() {
  const navigation = useNavigation();
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const onAddPress = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {return;}

    const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;

    dispatch(
      todoAdded({
        todo: {
          id,
          title: trimmedTitle,
          isCompleted: false,
        },
      }),
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        keyboardType="default"
        placeholder="What do you need to do?"
        style={styles.titleInput}
        returnKeyType="done"
      />

      <TouchableOpacity
        onPress={onAddPress}
        style={[
          styles.addButton,
          { backgroundColor: title.trim() ? '#007bff' : '#ccc' },
        ]}
        disabled={!title.trim()}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
    alignContent: 'center',
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddTodoScreen;
