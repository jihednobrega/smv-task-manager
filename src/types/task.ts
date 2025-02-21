export type TaskType = {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isCompleted: boolean
}
