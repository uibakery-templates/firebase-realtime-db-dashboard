const getEmployeeTaskStats = (tasks) => {
  const employeeStats = {};

  tasks.forEach((task) => {
    task.assigned_employees.forEach((employee) => {
      const { employee_id, employee_name } = employee;

      if (!employeeStats[employee_id]) {
        employeeStats[employee_id] = { name: employee_name, taskCount: 0 };
      }

      employeeStats[employee_id].taskCount++;
    });
  });

  const employeeStatsArray = Object.values(employeeStats);
  const totalTasks = employeeStatsArray.reduce((sum, stat) => sum + stat.taskCount, 0);
  const mostTasksAssigned = employeeStatsArray.reduce((max, stat) => (stat.taskCount > max.taskCount ? stat : max));
  const leastTasksAssigned = employeeStatsArray.reduce((max, stat) => (stat.taskCount < max.taskCount ? stat : max));

  const averageTasksAssigned = totalTasks / employeeStatsArray.length;

  return {
    averageTasksAssigned,
    mostTasksAssigned,
    leastTasksAssigned,
    totalTasks: tasks.length,
    inProgressTasks: tasks.filter((task) => task.status === 'In Progress').length,
    pausedTasks: tasks.filter((task) => task.status === 'Paused').length,
    backlogTasks: tasks.filter((task) => task.status === 'Backlog').length,
  };
};
const tasks = {{state.tasks}};
return tasks?.length > 0 && getEmployeeTaskStats(tasks);