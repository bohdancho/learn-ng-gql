using TodoApp.Application.TodoAggregate.Interfaces;
using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Infrastructure.Repositories;

public class TodoRepository(TodoDbContext dbContext) : ITodoRepository
{
  public Todo[] GetAll() => dbContext.Todos.ToArray();
}