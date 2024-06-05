const filter = {{data}};
let tasks = {{actions.fetchTasks.data}};

const filterTasks = (tasks, filter) => {
  if (!filter) return tasks;
  
  const { start, end, status } = filter;

  return tasks.filter(task => {
    const dueDate = new Date(task.due_date);
    return (
      (!start || dueDate >= start) &&
      (!end || dueDate <= end) &&
      (!status || task.status === status)
    );
  });
};

return filterTasks(tasks, filter)