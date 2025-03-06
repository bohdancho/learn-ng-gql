var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services
  .AddGraphQLServer()
  .AddInMemorySubscriptions()
  .AddQueryType<Query>()
  .AddMutationType<Mutation>()
  .AddSubscriptionType<Subscription>();

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

app.UseWebSockets();
app.MapGraphQL();

app.Run();


