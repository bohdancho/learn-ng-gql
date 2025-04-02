using Microsoft.EntityFrameworkCore;
using TodoApp.Api.TodoAggregate;
using TodoApp.Application.TodoAggregate.Interfaces;
using TodoApp.Infrastructure;
using TodoApp.Infrastructure.Repositories;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(bus =>
    {
      bus.AddConsumer<TodoConsumer>();
      bus.UsingInMemory((context, cfg) => cfg.ConfigureEndpoints(context));
    });

builder.Services.AddOpenApi();

builder.Services
.AddGraphQLServer()
.AddInMemorySubscriptions()
.AddQueryType<TodoQueries>();
//   .AddMutationType<Mutation>()
//   .AddSubscriptionType<Subscription>();

builder.Services.AddDbContext<TodoDbContext>();

builder.Services.AddScoped<ITodoRepository, TodoRepository>();

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
  var scope = app.Services.CreateScope();
  var dbContext = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
  if (dbContext.Database.GetPendingMigrations().Any()) dbContext.Database.Migrate();

  app.MapOpenApi();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseWebSockets();
app.MapGraphQL();

app.Run();

public class TodoConsumer() : IConsumer<TestData>
{
  public Task Consume(ConsumeContext<TestData> context)
  {
    Console.WriteLine("Consumed");
    Console.WriteLine(context.Message);
    return Task.CompletedTask;
  }
}
