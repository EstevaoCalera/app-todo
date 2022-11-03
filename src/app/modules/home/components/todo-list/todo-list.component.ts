import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  public taskList: Array<TaskList> = []

  constructor() { }
  ngOnInit(): void {
    this.taskList = JSON.parse(localStorage.getItem("list") || "[]")
  }

  ngDoCheck(): void {
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
    localStorage.setItem("list", JSON.stringify(this.taskList))

  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false })
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1)
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Deseja apagar todas as tarefas?")
    confirm ? this.taskList = [] : null
  }

  public validationInput(event: string, index: number) {
    !event.trim() ? this.deleteItemTaskList(index) : null
  }

}
