using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class TodoContext : DbContext
{
  public DbSet<Todo> Todos { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder options)
      => options.UseSqlite($"Data Source=./db-efcore.sqlite");
}


public class Todo
{
  [Key]
  public string Id { get; set; }
  public string Text { get; set; }
  public bool Done { get; set; }
}

