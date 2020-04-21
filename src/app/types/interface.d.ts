export interface IList {
  name: string;
  id: number;
  tasks: number;
}

export interface ITask {
  name: string;
  completed: boolean;
  id: number;
  listId: number;
  createdAt: Date;
  completedAt: Date;
}

export interface IRequestCreateTask {
  name: string;
  completed: boolean;
}

export interface IRequestModifyTask {
  name: string;
  completed: boolean;
  listId: number;
}
