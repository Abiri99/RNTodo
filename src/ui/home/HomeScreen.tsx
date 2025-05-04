import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import TodoListItem from './TodoListItem';
import FiltersComponent from './FiltersComponent';

import {todoCompleted, todoInCompleted, todoRemoved} from '../../state/todosSlice';
import {
  todosCompletedSelector,
  todosIncompletedSelector,
  todosSelector,
} from '../../state/todosSelectors';
import Todo from '../../model/Todo';
import {RootState} from '../../state/store';
import { useDebouncedValue } from '../../hooks/useDebounceValue';

enum TodosFilter {
  All = 'All',
  Completed = 'Completed',
  Incompleted = 'Incompleted',
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  const [todosCurrentFilter, setTodosCurrentFilter] = useState<TodosFilter>(
    TodosFilter.All,
  );

  const rawTodos = useSelector((state: RootState) => {
    switch (todosCurrentFilter) {
      case TodosFilter.Completed:
        return todosCompletedSelector(state);
      case TodosFilter.Incompleted:
        return todosIncompletedSelector(state);
      case TodosFilter.All:
      default:
        return todosSelector(state);
    }
  });

  const todos = useMemo(() => {
    const trimmedSearch = debouncedSearch.trim().toLowerCase();
    if (trimmedSearch === '') {return rawTodos;}

    return rawTodos.filter(todo =>
      todo.title.toLowerCase().includes(trimmedSearch),
    );
  }, [debouncedSearch, rawTodos]);

  const handleAddTodo = () => navigation.navigate('AddTodo');

  const handleTodoPress = (todo: Todo) => {
    dispatch(
      todo.isCompleted ? todoInCompleted({todo}) : todoCompleted({todo}),
    );
  };

  const handleTodoLongPress = (todo: Todo) => {
    dispatch(todoRemoved({todo}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Todos</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search todos..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterContainer}>
        <FiltersComponent
          style={styles.todoFilters}
          enumMap={TodosFilter}
          onFilterSelected={filter => {
            setTodosCurrentFilter(filter);
          }}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handleTodoPress(item)}
            onLongPress={() => handleTodoLongPress(item)}>
            <TodoListItem data={item} index={index} style={styles.todoItem} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  titleContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  title: {
    fontSize: 32,
    color: '#1f1f1f',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filterContainer: {
    margin: 16,
  },
  todoFilters: {
    width: '100%',
    height: 48,
  },
  todoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContent: {
    paddingBottom: 80,
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
    margin: 16,
    marginBottom: 32,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
