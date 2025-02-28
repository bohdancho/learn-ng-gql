var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services
.AddGraphQLServer()
.AddQueryType<Query>();

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

public class Query
{
  public Todo[] Todos() =>
    [
    new Todo
    {
      Id = "0",
         Done= true,
         Text= "123"
    }
    ];
}

public record Todo
{
  public required string Id { get; set; }
  public required string Text { get; set; }
  public required bool Done { get; set; }
}
