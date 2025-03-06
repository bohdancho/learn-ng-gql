var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services
.AddGraphQLServer()
.AddQueryType<Query>()
.AddMutationType<Mutation>();

builder.Services.AddDbContext<TodoContext>();

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

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();

public class Query()
{
  public Todo[] Todos([Service] TodoContext db) => db.Todos.ToArray();
}

public class Mutation()
{
  public bool CreateTodo([Service] TodoContext db, Todo todo)
  {
    db.Add(todo);
    db.SaveChanges();
    return true;
  }

  public bool DeleteTodo([Service] TodoContext db, string id)
  {
    db.Remove(new Todo { Id = id });
    db.SaveChanges();
    return true;
  }

  public bool UpdateTodo([Service] TodoContext db, Todo todo)
  {
    db.Update(todo);
    db.SaveChanges();
    return true;
  }
}
