export default class Todo {
    readonly id: number
    readonly title: string
    readonly isCompleted: boolean

    constructor(id: number, title: string, isCompleted: boolean) {
        this.id = id
        this.title = title
        this.isCompleted = isCompleted
    }
}