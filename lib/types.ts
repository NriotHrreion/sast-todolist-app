export interface Todo {
  title: string
  description?: string
  tags: string[]
  expiresAt?: Date
  done: boolean
}
