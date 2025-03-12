using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Infrastructure;

public class TodoDbContext(DbContextOptions<TodoDbContext> options) : DbContext(options)
{
  public DbSet<Todo> Todos => Set<Todo>();
}
