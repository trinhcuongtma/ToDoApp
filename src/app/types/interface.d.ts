export interface IList {
  name: string;
  id: number;
  tasks: number;
}

export interface ITask {
  name: string;
  completed: boolean;
  id: number;
  list_id: number;
  createdAt: Date;
  completedAt: Date;
}

export interface IRequestCreateTask {
  name: string;
  completed: boolean;
}

export interface IRequestModifyTask extends IRequestCreateTask {
  listId: number;
}
