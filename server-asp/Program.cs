using SQLite;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services
.AddGraphQLServer()
.AddQueryType<Query>()
.AddMutationType<Mutation>();

var db = new SQLiteConnection("./db.sqlite");
db.CreateTable<Todo>();
builder.Services.AddSingleton((_) => db);

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

public class Query([Service] SQLiteConnection db)
{
  public Todo[] Todos() => db.Table<Todo>().ToArray();
}

public class Mutation([Service] SQLiteConnection db)
{
  public bool CreateTodo(Todo todo)
  {
    db.Insert(todo);
    return true;
  }

  public bool DeleteTodo(string id)
  {
    db.Delete<Todo>(id);
    return true;
  }

  public bool UpdateTodo(Todo todo)
  {
    db.Update(todo);
    return true;
  }

}

public record Todo
{
  [PrimaryKey]
  public string Id { get; set; }
  public string Text { get; set; }
  public bool Done { get; set; }
}
