using TodoApp.Application.TodoAggregate.Interfaces;
using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Api.TodoAggregate;

public class TodoQueries()
{
  public Todo[] Todos(ITodoRepository repository) => repository.GetAll();
}

