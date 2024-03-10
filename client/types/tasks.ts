export type Task = {
  _id: string;
  title: string;
  description?: string;
  tag: string[];
  isCompleted?: boolean | false;
};

export interface ITaskCardProps {
  props: Task;
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
}
