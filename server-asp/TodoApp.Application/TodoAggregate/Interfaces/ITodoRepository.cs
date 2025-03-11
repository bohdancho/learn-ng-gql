using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Application.TodoAggregate.Interfaces;

public interface ITodoRepository
{
  Todo[] GetAll();
}