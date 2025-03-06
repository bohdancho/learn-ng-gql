public class Subscription()
{
  [Subscribe]
  public Todo TodoCreated([EventMessage] Todo todo) => todo;

  [Subscribe]
  public string TodoDeleted([EventMessage] string id) => id;

  [Subscribe]
  public Todo TodoUpdated([EventMessage] Todo todo) => todo;
}
