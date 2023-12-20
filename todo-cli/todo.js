const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => item.dueDate < new Date().toLocaleDateString("en-CA"));
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate === new Date().toLocaleDateString("en-CA"));
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate > new Date().toLocaleDateString("en-CA"));
  };

  const toDisplayableList = (list) => {
    lst = list
      .map(
        (item) =>
          `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
            item.dueDate == today ? "" : item.dueDate
          }`
      )
      .join("\n");
      return lst;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

module.exports=todoList;
