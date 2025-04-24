class TodosRepository {
    private todos: Todo[] = [
        new Todo("First todo"),
        new Todo("Second todo"),
        new Todo("Third todo"),
        new Todo("Fourth todo"),
        new Todo("Fifth todo"),
        new Todo("Sixt todo"),
        new Todo("Seventh todo"),
        new Todo("Eight todo"),
        new Todo("Ninth todo"),
        new Todo("Tenth todo"),
    ]
    
    async fetchData(): Promise<Todo[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve(this.todos);
            }, 2000);
        });
    }

    
    fetchUpdatedTodos: () => Promise<Todo[]> = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve(this.todos.map((value, index, _) => {
                if (index == 5) {
                    return new Todo('Updated Fifth todo')
                } else {
                    return value
                }
            }));
            }, 2000);
        });
    }
}