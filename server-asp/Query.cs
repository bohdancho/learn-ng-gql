// namespace server_asp;

public class Query()
{
  public Todo[] Todos([Service] TodoContext db) => db.Todos.ToArray();
}

