var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services
.AddGraphQLServer()
.AddQueryType<Query>()
.AddMutationType<Mutation>();

builder.Services.AddSingleton<TodoRepository, TodoRepository>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
    {
      options.AddPolicy(name: MyAllowSpecificOrigins,
            policy =>
            {
              policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
               .AllowAnyHeader();
            });
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.MapGet("/ping", () =>
    {
      return "pong";
    });
app.MapGraphQL();

app.Run();

public class TodoRepository
{
  public readonly List<Todo> todos = [
    new Todo
    {
      Id = "0",
         Done= true,
         Text= "123"
    }
  ];
}

public class Query([Service] TodoRepository todoRepository)
{
  public Todo[] Todos() => [.. todoRepository.todos];
}

public class Mutation([Service] TodoRepository todoRepository)
{

  public bool CreateTodo(Todo todo)
  {
    todoRepository.todos.Add(todo);
    return true;
  }

  public bool DeleteTodo(string id)
  {
    var idx = todoRepository.todos.FindIndex(todo => todo.Id == id);
    todoRepository.todos.RemoveAt(idx);
    return true;
  }

  // BUG: changing "done" in frontend doesn't work (doing so though the gql web view works)
  public bool UpdateTodo(Todo todo)
  {
    var idx = todoRepository.todos.FindIndex(todo => todo.Id == todo.Id);
    todoRepository.todos[idx] = todo;
    return true;
  }

}

public record Todo
{
  public required string Id { get; set; }
  public required string Text { get; set; }
  public required bool Done { get; set; }
}
