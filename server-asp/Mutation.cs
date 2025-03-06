using HotChocolate.Subscriptions;

public class Mutation()
{
  public async Task<bool> CreateTodo(Todo todo, [Service] TodoContext db, [Service] ITopicEventSender sender)
  {
    db.Add(todo);
    db.SaveChanges();
    await sender.SendAsync(nameof(Subscription.TodoCreated), todo);
    return true;
  }

  public async Task<bool> DeleteTodo(string id, [Service] TodoContext db, [Service] ITopicEventSender sender)
  {
    db.Remove(new Todo { Id = id });
    db.SaveChanges();
    await sender.SendAsync(nameof(Subscription.TodoDeleted), id);
    return true;
  }

  public async Task<bool> UpdateTodo(Todo todo, [Service] TodoContext db, [Service] ITopicEventSender sender)
  {
    db.Update(todo);
    db.SaveChanges();
    await sender.SendAsync(nameof(Subscription.TodoUpdated), todo);
    return true;
  }
}
