import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Todo from '../../model/Todo';

type TodoListItemProps = {
    data: Todo
    index: number
    style: ViewStyle
}

const TodoListItem = (props: TodoListItemProps) => {
    let status = props.data.isCompleted ? '✅' : '';

    return (
        <View style={props.style}>
            <View style={styles.container}>
                <Text style={styles.title}>{props.data.title}</Text>
                <Text style={styles.title}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 12,
        shadowColor: '#8a8a8a',
        shadowRadius: 16,
        shadowOpacity: 0.1,
        shadowOffset: { height: 20, width: 0 },
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    title: {
        fontSize: 16,
        color: 'white',
    },
});

export default TodoListItem;
