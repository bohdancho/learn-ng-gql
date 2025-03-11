using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Model.TodoAggregate;

namespace TodoApp.Infrastructure;

public class TodoDbContext : DbContext
{
  public DbSet<Todo> Todos => Set<Todo>();

  public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }
}
