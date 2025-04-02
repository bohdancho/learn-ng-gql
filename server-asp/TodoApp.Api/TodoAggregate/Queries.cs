using MassTransit;
using TodoApp.Application.TodoAggregate.Interfaces;
using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Api.TodoAggregate;

public class TodoQueries()
{

  public Todo[] Todos(ITodoRepository repository, IBus bus, CancellationToken cancellationToken)
  {
    Console.WriteLine("wo bus");
    Console.WriteLine(bus);
    bus.Publish(new TestData { Test = "huhu" }, cancellationToken);
    return repository.GetAll();
  }
}

public record TestData { public required string Test { get; set; } }
