import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TodoListItem from './TodoListItem';
import {todosSelector} from '../state/todosSelectors';
import {useNavigation} from '@react-navigation/native';
import Todo from '../model/todo';
import {todoCompleted, todoInCompleted, todoRemoved} from '../state/todosSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

function HomeScreen() {
  const navigation = useNavigation();
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const onAddTodoButtonPress = () => {
    navigation.navigate('AddTodo');
  };

  const onTodoPress = (todo: Todo) => {
    if (todo.isCompleted) {
      dispatch(
        todoInCompleted({
          todo: todo,
        }),
      );
    } else {
      dispatch(
        todoCompleted({
          todo: todo,
        }),
      );
    }
  };

  const onTodoLongPress = (todo: Todo) => {
    dispatch(
      todoRemoved({
        todo: todo,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search todos..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onTodoPress(item)}
            onLongPress={() => {
              onTodoLongPress(item);
            }}>
            <TodoListItem
              data={item}
              index={index}
              style={styles.todoItem}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingBottom: 80}} // To avoid overlapping with the sticky button
      />

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddTodoButtonPress()}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  todoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffffee',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 32,
    marginHorizontal: 16,
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
