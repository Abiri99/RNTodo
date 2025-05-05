import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {addTodo} from '../../state/todo/todosSlice';
import {useDispatch, useSelector} from 'react-redux';
import {todosSelector} from '../../state/todo/todosSelectors';
import Todo from '../../model/Todo';

function AddTodoScreen() {
  const navigation = useNavigation();
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [addTodoButtonStyle, setAddTodoButtonStyle] = useState<ViewStyle>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [todoAdding, setTodoAdding] = useState<Todo | null>(null);

  useEffect(() => {
    setAddTodoButtonStyle({
      backgroundColor: (title.trim() || isLoading) ? '#007bff' : '#ccc',
    });
  }, [title, isLoading]);

  useEffect(() => {
    if (todoAdding === null) {
      return;
    }

    if (todos.some((todo) => todo.id === todoAdding.id)) {
      setIsLoading(false);
      setTodoAdding(null);
      navigation.goBack();
    }
  }, [todos, navigation, todoAdding]);

  const onAddPress = useCallback(() => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;

    const todoToAdd = {
      id,
      title: trimmedTitle,
      isCompleted: false,
    };
    setIsLoading(true);
    setTodoAdding(todoToAdd);
    dispatch(
      addTodo({
        todo: todoToAdd,
      }),
    );
  }, [dispatch, todos, title]);

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        keyboardType="default"
        placeholder="What do you need to do?"
        style={styles.titleInput}
        returnKeyType="done"
        editable={!isLoading}
      />

      {isLoading && (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      <TouchableOpacity
        onPress={onAddPress}
        style={[styles.addButton, addTodoButtonStyle]}
        disabled={!title.trim() || isLoading}>
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
  loadingIndicatorContainer: {
    marginVertical: 20,
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
